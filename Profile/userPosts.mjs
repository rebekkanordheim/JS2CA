/**
 * Fetches and displays user posts when the DOM content is fully loaded.
 * Handles displaying posts, editing, and deleting posts with the respective functionalities.
 * Runs when the DOM content is fully loaded.
 * @function
 * @async
 * @returns {void}
 * @example
 * // Automatically fetches and displays user posts, and sets up edit and delete functionalities when the DOM content is loaded.
 * userPosts();
 */
export async function userPosts() {
  document.addEventListener("DOMContentLoaded", () => {
    const name = localStorage.getItem("name");
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!name || !accessToken || !apiKey) {
      console.error("User information or credentials are missing.");
      return;
    }

    const postsUrl = `https://v2.api.noroff.dev/social/profiles/${name}/posts`;
    const postsContainer = document.querySelector(".user-posts");

    if (!postsContainer) {
      console.error("Posts container not found.");
      return;
    }

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

        if (posts.length === 0) {
          postsContainer.innerHTML = "<p>No posts available.</p>";
          return;
        }

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

        document.querySelectorAll(".edit-post-btn").forEach((button) => {
          button.addEventListener("click", handleEditPost);
        });

        document.querySelectorAll(".delete-post-btn").forEach((button) => {
          button.addEventListener("click", handleDeletePost);
        });
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        postsContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
      });

    function handleEditPost(event) {
      const postElement = event.target.closest(".post");
      const postId = postElement.dataset.postId;

      if (!postId) {
        console.error("Post ID not found.");
        return;
      }

      const currentTitle = postElement.querySelector("h3").textContent;
      const currentBody = postElement.querySelector("p").textContent;

      postsContainer.innerHTML = `
      <form id="edit-post-form">
        <h3>Edit Post</h3>
        <input class="form-input" type="text" id="edit-title" value="${currentTitle}" placeholder="Title" required>
        <textarea class="form-input" id="edit-body" placeholder="Body text" required>${currentBody}</textarea>
        <button type="submit" class="btn btn-dark">Save Changes</button>
        <button type="button" class="btn btn-secondary" id="cancel-edit-btn">Cancel</button>
      </form>
    `;

      document
        .getElementById("cancel-edit-btn")
        .addEventListener("click", () => location.reload());

      document.getElementById("edit-post-form").addEventListener("submit", (e) => {
        e.preventDefault();

        const updatedTitle = document.getElementById("edit-title").value;
        const updatedBody = document.getElementById("edit-body").value;
        const updateUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;

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
            location.reload();
          })
          .catch((error) => {
            console.error("Error updating post:", error);
            alert(`Failed to update post: ${error.message}`);
          });
      });
    }

    function handleDeletePost(event) {
      const postElement = event.target.closest(".post");
      const postId = postElement.dataset.postId;

      if (!postId) {
        console.error("Post ID not found.");
        return;
      }

      const deleteUrl = `https://v2.api.noroff.dev/social/posts/${postId}`;

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
          postElement.remove();
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("Failed to delete post. Please try again later.");
        });
    }
  });
}
