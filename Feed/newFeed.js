document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token from local storage
  const apiKey = localStorage.getItem("apiKey"); // Retrieve the API key from local storage

  if (!accessToken || !apiKey) {
    console.error("No access token or API key found. Please log in.");
    return;
  }

  try {
    const response = await fetch(
      "https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true&page=1&sort=created",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token for authorization
          "X-Noroff-API-Key": apiKey, // Include API key if required by the API
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Posts data:", data); // Log data to check its structure

      // Populate the posts container
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = ""; // Clear existing posts

      data.data.forEach((post) => {
        const postElement = document.createElement("div");
        postElement.className = "post"; // Apply the post class
        postElement.innerHTML = `
          <h2>${post.title}</h2>
          <p>${post.body}</p>
          <small>Author: ${post.author.name}</small>
        `;
        postsContainer.appendChild(postElement);
      });
    } else {
      const errorData = await response.json();
      console.error("Failed to fetch posts:", errorData);
      // Display an error message to the user
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = `<p>Failed to fetch posts: ${
        errorData.errors[0].message || "Unknown error"
      }</p>`;
    }
  } catch (error) {
    console.error("Error fetching posts:", error);
    // Display an error message to the user
    const postsContainer = document.getElementById("posts-container");
    postsContainer.innerHTML = `<p>Error fetching posts: ${
      error.message || "Unknown error"
    }</p>`;
  }
});
