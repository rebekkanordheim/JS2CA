/**
 * Fetches and displays posts from the API when the DOM content is fully loaded.
 * It checks for an access token and API key, retrieves posts, and populates
 * the posts container with the fetched data.
 * @function
 * @async
 * @returns {void}
 * @throws {Error} Throws an error if fetching posts fails or an unexpected error occurs.
 * @example
 * // Automatically fetches and displays posts when the DOM content is loaded.
 * document.addEventListener("DOMContentLoaded", async () => {
 *     // Initialization code here
 * });
 */
document.addEventListener("DOMContentLoaded", async () => {
  /**
   * Retrieves the access token from localStorage.
   * @type {string|null}
   */
  const accessToken = localStorage.getItem("accessToken");

  /**
   * Retrieves the API key from localStorage.
   * @type {string|null}
   */
  const apiKey = localStorage.getItem("apiKey");

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
      console.log("Posts data:", data);

      // Populate the posts container
      /**
       * Reference to the posts container element.
       * @type {HTMLElement|null}
       */
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = ""; // Clear existing posts

      data.data.forEach((post) => {
        /**
         * Represents a single post element.
         * @type {HTMLElement}
         */
        const postElement = document.createElement("div");
        postElement.className = "post"; // Apply the post class

        // Format the created date
        /**
         * @type {string}
         */
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
                }" style="max-width: 70%; height: auto; border-radius: 5px;"/>`
              : ""
          }
          <a href="viewPost.html?id=${post.id}" class="btn btn-dark">View Post</a>
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