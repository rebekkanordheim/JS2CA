/* document.addEventListener("DOMContentLoaded", () => {
  const filterButton = document.getElementById("filterDropdown");
  const filterMenu = document.getElementById("filterOptions");
  const postsContainer = document.getElementById("posts-container");

  // Initialize with default filter
  let filterType = "created"; // Default filter

  // Toggle dropdown menu visibility
  filterButton.addEventListener("click", () => {
    filterMenu.style.display = filterMenu.style.display === "block" ? "none" : "block";
  });

  // Handle filter selection
  filterMenu.addEventListener("click", (event) => {
    if (event.target.tagName === "A") {
      filterType = event.target.getAttribute("data-filter");
      filterPosts(filterType);
      filterMenu.style.display = "none"; // Hide menu after selection
    }
  });

  async function filterPosts(sortOrder) {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");

    if (!accessToken || !apiKey) {
      console.error("No access token or API key found. Please log in.");
      return;
    }

    try {
      const sortParam = getSortParam(sortOrder);
      const response = await fetch(
        `https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true&page=1&sort=${sortParam}`,
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
        const data = await response.json();
        console.log("Posts data:", data);

        postsContainer.innerHTML = ""; // Clear existing posts

        data.data.forEach((post) => {
          const postElement = document.createElement("div");
          postElement.className = "post";

          const createdDate = new Date(post.created).toLocaleDateString();

          postElement.innerHTML = `
            <h2>${post.title}</h2>
            <p>${post.body}</p>
            <small>Author: ${post.author.name}</small><br>
            <small>Created on: ${createdDate}</small>
            ${
              post.media && post.media.url
                ? `<img src="${post.media.url}" alt="${
                    post.media.alt || "Post image"
                  }" style="max-width: 100%; height: auto;"/>`
                : ""
            }
          `;
          postsContainer.appendChild(postElement);
        });
      } else {
        const errorData = await response.json();
        console.error("Failed to fetch posts:", errorData);
        postsContainer.innerHTML = `<p>Failed to fetch posts: ${
          errorData.errors[0].message || "Unknown error"
        }</p>`;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      postsContainer.innerHTML = `<p>Error fetching posts: ${
        error.message || "Unknown error"
      }</p>`;
    }
  }

  function getSortParam(filterType) {
    switch (filterType) {
      case "newest-to-oldest":
        return "created"; // Assumes ascending order of creation date
      case "oldest-to-newest":
        return "-created"; // Assumes descending order of creation date
      case "a-to-z":
        return "title"; // Assumes ascending order of title
      case "z-to-a":
        return "-title"; // Assumes descending order of title
      default:
        return "created"; // Default to newest-to-oldest
    }
  }

  // Initialize with default sorting
  filterPosts(filterType);
});
 */