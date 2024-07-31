document.addEventListener("DOMContentLoaded", async () => {
  const postId = new URLSearchParams(window.location.search).get("id");
  const postContainer = document.getElementById("post");
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");

  if (!postId || !accessToken || !apiKey) {
    console.error("No post ID, access token, or API key found.");
    return;
  }

  try {
    // Fetch post details
    const postResponse = await fetch(
      `https://v2.api.noroff.dev/social/posts/${postId}?_author=true&_comments=true&_reactions=true`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "X-Noroff-API-Key": apiKey,
          "Content-Type": "application/json",
        },
      }
    );

    if (postResponse.ok) {
      const postData = await postResponse.json();
      const post = postData.data;

      // Fetch user details to check if they are the author
      const userResponse = await fetch(
        `https://v2.api.noroff.dev/auth/me`, // Assuming this endpoint returns the user's info based on the API key
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        const loggedInUserId = userData.data.id; // Adjust based on API response structure

        const createdDate = post.created
          ? new Date(post.created).toLocaleDateString()
          : "Unknown Date";

        const authorName = post.author ? post.author.name : "Unknown Author";
        const mediaUrl = post.media ? post.media.url : "";
        const mediaAlt = post.media ? post.media.alt : "Post image";

        // Update the page title with the post title
        document.title = post.title || "Post Details";

        let deleteButton = "";
        // Display the delete button only if the logged-in user is the author
        if (loggedInUserId === post.author.id) {
          // Assuming post.author.id is the ID of the author
          deleteButton = `<button id="delete-btn" class="btn btn-danger">Delete Post</button>`;
        }

        postContainer.innerHTML = `
          <h2>${post.title || "Untitled Post"}</h2>
          <p>${post.body || "No content available"}</p>
          <small>Author: ${authorName}</small><br>
          <small>Created on: ${createdDate}</small>
          ${
            mediaUrl
              ? `<img src="${mediaUrl}" alt="${mediaAlt}" style="max-width: 70%; height: auto; border-radius: 5px;"/>`
              : ""
          }
          ${deleteButton}
        `;

        // Add event listener for delete button
        const deleteBtn = document.getElementById("delete-btn");
        if (deleteBtn) {
          deleteBtn.addEventListener("click", async () => {
            try {
              const deleteResponse = await fetch(
                `https://v2.api.noroff.dev/social/posts/${postId}`,
                {
                  method: "DELETE",
                  headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "X-Noroff-API-Key": apiKey,
                    "Content-Type": "application/json",
                  },
                }
              );

              if (deleteResponse.ok) {
                alert("Post deleted successfully.");
                window.location.href = "../Feed/feed.html"; // Redirect after deletion
              } else {
                const errorData = await deleteResponse.json();
                console.error("Failed to delete post:", errorData);
                alert(
                  "Failed to delete post: " +
                    (errorData.errors[0]?.message || "Unknown error")
                );
              }
            } catch (error) {
              console.error("Error deleting post:", error);
              alert("Error deleting post: " + (error.message || "Unknown error"));
            }
          });
        }
      } else {
        const errorData = await userResponse.json();
        console.error("Failed to fetch user details:", errorData);
        postContainer.innerHTML = `<p>Failed to fetch user details: ${
          errorData.errors[0]?.message || "Unknown error"
        }</p>`;
      }
    } else {
      const errorData = await postResponse.json();
      console.error("Failed to fetch post:", errorData);
      postContainer.innerHTML = `<p>Failed to fetch post: ${
        errorData.errors[0]?.message || "Unknown error"
      }</p>`;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    postContainer.innerHTML = `<p>Error fetching post: ${
      error.message || "Unknown error"
    }</p>`;
  }
});
