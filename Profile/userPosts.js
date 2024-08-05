/**
 * Handles the DOMContentLoaded event to initialize the user posts page.
 * Retrieves user credentials, fetches posts, and sets up event listeners.
 */
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve user information from local storage
  const name = localStorage.getItem("name");
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!name || !accessToken || !apiKey) {
    console.error("User information or credentials are missing.");
    return;
  }

  // URL to fetch the posts made by the user
  const postsUrl = `https://v2.api.noroff.dev/social/profiles/${name}/posts`;

  // Reference to the posts container
  const postsContainer = document.querySelector(".user-posts");

  if (!postsContainer) {
    console.error("Posts container not found.");
    return;
  }

  /**
   * Fetches posts from the server and displays them on the page.
   */
  fetch(postsUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Noroff-API-Key": apiKey,
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => {
          throw new Error(err.message || "Failed to fetch posts.");
        });
      }
      return response.json();
    })
    .then((data) => {
      const posts = data.data;

      // Log the posts to the console
      console.log("User posts:", posts);

      if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts available.</p>";
        return;
      }

      // Create HTML for each post with edit and delete buttons
      postsContainer.innerHTML = posts
        .map(
          (post) => `
        <div class="post" data-post-id="${post.id}">
          <h3>${post.title || "Untitled Post"}</h3>
          <p>${post.body || "No content available"}</p>
          <img src="${post.media.url}" alt="${post.media.alt}" 
          style="width: 50%; height: auto; border-radius: 5px;"/>
          <button class="edit-post-btn btn btn-dark">Edit Post</button>
          <button class="delete-post-btn btn btn-danger">Delete Post</button>
        </div>
      `
        )
        .join("");

      // Attach event listeners to edit buttons
      document.querySelectorAll(".edit-post-btn").forEach((button) => {
        button.addEventListener("click", handleEditPost);
      });

      // Attach event listeners to delete buttons
      document.querySelectorAll(".delete-post-btn").forEach((button) => {
        button.addEventListener("click", handleDeletePost);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    });

  /**
   * Handles editing a post by displaying a form to update the title and body.
   * @param {Event} event - The click event on the edit button.
   */
  function handleEditPost(event) {
    const postElement = event.target.closest(".post");
    const postId = postElement.dataset.postId;

    if (!postId) {
      console.error("Post ID not found.");
      return;
    }

    // Extract current post data
    const currentTitle = postElement.querySelector("h3").textContent;
    const currentBody = postElement.querySelector("p").textContent;

    // Show the edit form with the current data
    postsContainer.innerHTML = `
      <form id="edit-post-form">
        <h3>Edit Post</h3>
        <input class="form-input" type="text" id="edit-title" value="${currentTitle}" placeholder="Title" required>
        <textarea class="form-input" id="edit-body" placeholder="Body text" required>${currentBody}</textarea>
        <button type="submit" class="btn btn-dark">Save Changes</button>
        <button type="button" class="btn btn-secondary" id="cancel-edit-btn">Cancel</button>
      </form>
    `;

    // Attach event listener to cancel button
    document
      .getElementById("cancel-edit-btn")
      .addEventListener("click", () => location.reload());

    // Attach event listener to form submit
    document.getElementById("edit-post-form").addEventListener("submit", (e) => {
      e.preventDefault();

      // Get updated post data
      const updatedTitle = document.getElementById("edit-title").value;
      const updatedBody = document.getElementById("edit-body").value;

      // URL to update the post
      const updateUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;

      // Make the PUT request to update the post
      fetch(updateUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: updatedTitle,
          body: updatedBody,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              throw new Error(err.message || "Failed to update post.");
            });
          }
          return response.json();
        })
        .then((data) => {
          console.log("Post updated:", data);
          alert("Post updated successfully!");
          location.reload(); // Refresh the page to see the updated post
        })
        .catch((error) => {
          console.error("Error updating post:", error);
          alert(`Failed to update post: ${error.message}`);
        });
    });
  }

  /**
   * Handles deleting a post by making a DELETE request to the server.
   * @param {Event} event - The click event on the delete button.
   */
  function handleDeletePost(event) {
    const postElement = event.target.closest(".post");
    const postId = postElement.dataset.postId;

    if (!postId) {
      console.error("Post ID not found.");
      return;
    }

    // URL to delete the post
    const deleteUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;

    // Make the delete request
    fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": apiKey,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          return response.json().then((err) => {
            throw new Error(err.message || "Failed to delete post.");
          });
        }
        // Remove the post element from the DOM
        postElement.remove();
      })
      .catch((error) => {
        console.error("Error deleting post:", error);
        alert("Failed to delete post. Please try again later.");
      });
  }
});
