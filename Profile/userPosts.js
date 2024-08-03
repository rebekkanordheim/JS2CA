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

      if (posts.length === 0) {
        postsContainer.innerHTML = "<p>No posts available.</p>";
        return;
      }

      // Create HTML for each post
      postsContainer.innerHTML = posts
        .map(
          (post) => `
        <div class="post">
          <h3>${post.title || "Untitled Post"}</h3>
          <img src="${post.media.url}" alt="${post.media.alt}" 
          style="max-width: 70%; height: auto; border-radius: 5px;"/>
        </div>
      `
        )
        .join("");
    })
    .catch((error) => {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = "<p>Failed to load posts. Please try again later.</p>";
    });
});
