document.addEventListener("DOMContentLoaded", async () => {
  const accessToken = localStorage.getItem("accessToken");
  const apiKey = localStorage.getItem("apiKey");
  const postsContainer = document.getElementById("posts-container");

  if (!accessToken || !apiKey) {
    console.error("No access token or API key found. Please log in.");
    return;
  }

  let postsData = [];

  const fetchPosts = async (sortOrder = "newest") => {
    try {
      // Define the sort parameter and direction based on the sortOrder
      const sortParameter = "created";
      const direction = "desc"; // Always fetch newest posts

      // Fetch posts with appropriate sorting
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true&page=1&sort=${sortParameter}&direction=${direction}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("API Error:", errorData);
        postsContainer.innerHTML = `<p>Failed to fetch posts: ${
          errorData.errors[0].message || "Unknown error"
        }</p>`;
        return;
      }

      const data = await response.json();
      postsData = data.data;
      if (sortOrder === "oldest") {
        postsData = postsData.toReversed(); // Reverse the order for the oldest sorting
      }
      displayPosts(postsData);
    } catch (error) {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = `<p>Error fetching posts: ${
        error.message || "Unknown error"
      }</p>`;
    }
  };

  const displayPosts = (posts) => {
    postsContainer.innerHTML = "";

    posts.forEach((post) => {
      const postElement = document.createElement("div");
      postElement.className = "post";

      const createdDate = new Date(post.created).toLocaleDateString();

      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <small>Author: ${post.author ? post.author.name : "Unknown Author"}</small><br>
        <small>Created on: ${createdDate}</small>
        ${
          post.media && post.media.url
            ? `<img src="${post.media.url}" alt="${
                post.media.alt || "Post image"
              }" style="max-width: 100%; height: auto;"/>`
            : ""
        }
        <a href="viewPost.html?id=${post.id}" class="btn btn-dark">View Post</a>
      `;
      postsContainer.appendChild(postElement);
    });
  };

  const searchPosts = () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredPosts = postsData.filter((post) =>
      post.title.toLowerCase().includes(query)
    );
    displayPosts(filteredPosts);
  };

  const filterPosts = (sortOrder) => {
    fetchPosts(sortOrder);
  };

  await fetchPosts("newest");

  document.getElementById("search-btn").addEventListener("click", searchPosts);
  document
    .getElementById("filter-oldest")
    .addEventListener("click", () => filterPosts("oldest"));
  document
    .getElementById("filter-newest")
    .addEventListener("click", () => filterPosts("newest"));
});
