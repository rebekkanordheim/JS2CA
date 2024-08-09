/**
 * Initializes the search functionality and displays posts based on search input.
 * Runs when the DOM content is fully loaded.
 *
 * @async
 * @function searchbar
 * @returns {void}
 * @throws {Error} Throws an error if fetching posts fails or an unexpected error occurs.
 * @example
 * searchbar();
 */
export async function searchbar() {
  document.addEventListener("DOMContentLoaded", async () => {
    const accessToken = localStorage.getItem("accessToken");
    const apiKey = localStorage.getItem("apiKey");
    const postsContainer = document.getElementById("posts-container");

    if (!accessToken || !apiKey) {
      console.error("No access token or API key found. Please log in.");
      return;
    }

    let postsData = [];

    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://v2.api.noroff.dev/social/posts?_author=true&_comments=true&_reactions=true&page=1&sort=created",
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
          postsData = data.data;
          displayPosts(postsData);
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

    await fetchPosts();

    document.getElementById("search-btn").addEventListener("click", searchPosts);
  });
}
