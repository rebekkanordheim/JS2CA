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
    const response = await fetch(
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

    if (response.ok) {
      const responseData = await response.json();
      const post = responseData.data; 

      console.log("Post data:", post);

      // Format the created date
      const createdDate = post.created
        ? new Date(post.created).toLocaleDateString()
        : "Unknown Date";

      // Use optional chaining and fallback values to handle missing data
      const authorName = post.author ? post.author.name : "Unknown Author";
      const mediaUrl = post.media ? post.media.url : "";
      const mediaAlt = post.media ? post.media.alt : "Post image";

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
      `;
    } else {
      const errorData = await response.json();
      console.error("Failed to fetch post:", errorData);
      postContainer.innerHTML = `<p>Failed to fetch post: ${
        errorData.errors[0].message || "Unknown error"
      }</p>`;
    }
  } catch (error) {
    console.error("Error fetching post:", error);
    postContainer.innerHTML = `<p>Error fetching post: ${
      error.message || "Unknown error"
    }</p>`;
  }
});
