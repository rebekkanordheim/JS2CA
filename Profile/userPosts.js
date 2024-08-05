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

  // Fetch the posts
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
        throw new Error("Failed to fetch posts.");
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

      // Create HTML for each post with a delete button
      postsContainer.innerHTML = posts
        .map(
          (post) => `
        <div class="post" data-post-id="${post.id}">
          <h3>${post.title || "Untitled Post"}</h3>
          <img src="${post.media.url}" alt="${post.media.alt}" 
          style="width: 50%; height: auto; border-radius: 5px;"/>
          <button class="delete-post-btn btn btn-danger">Delete Post</button>
        </div>
      `
        )
        .join("");

      // Attach event listeners to delete buttons
      document.querySelectorAll(".delete-post-btn").forEach((button) => {
        button.addEventListener("click", handleDeletePost);
      });
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    });

  // Function to handle deleting a post
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
          throw new Error("Failed to delete post.");
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
