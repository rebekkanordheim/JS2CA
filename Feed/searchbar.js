/**
 * Initializes the search functionality and displays posts based on search input.
 * Runs when the DOM content is fully loaded.
 * @function
 * @async
 * @returns {void}
 * @throws {Error} Throws an error if fetching posts fails or an unexpected error occurs.
 * @example
 * // Automatically fetches and displays posts, and sets up the search functionality when the DOM content is loaded.
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

  /**
   * Reference to the posts container element.
   * @type {HTMLElement|null}
   */
  const postsContainer = document.getElementById("posts-container");

  if (!accessToken || !apiKey) {
    console.error("No access token or API key found. Please log in.");
    return;
  }

  /**
   * Array to hold the fetched posts data.
   * @type {Array<Object>}
   */
  let postsData = [];

  /**
   * Fetches posts from the API and stores them in the postsData array.
   * @async
   * @function
   * @returns {void}
   * @throws {Error} Throws an error if fetching posts fails.
   * @example
   * // Fetches posts and displays them.
   * await fetchPosts();
   */
  const fetchPosts = async () => {
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
        postsData = data.data; // Save data to use in search
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

  /**
   * Displays the posts in the posts container.
   * @function
   * @param {Array<Object>} posts - Array of post objects to be displayed.
   * @returns {void}
   * @example
   * // Displays a list of posts.
   * displayPosts(postsData);
   */
  const displayPosts = (posts) => {
    postsContainer.innerHTML = ""; // Clear existing posts

    posts.forEach((post) => {
      /**
       * Represents a single post element.
       * @type {HTMLElement}
       */
      const postElement = document.createElement("div");
      postElement.className = "post";

      /**
       * Formatted created date of the post.
       * @type {string}
       */
      const createdDate = new Date(post.created).toLocaleDateString();

      postElement.innerHTML = `
                <h2>${post.title}</h2>
                <p>${post.body}</p>
                <small>Author: ${
                  post.author ? post.author.name : "Unknown Author"
                }</small><br>
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

  /**
   * Filters and displays posts based on the search input value.
   * @function
   * @returns {void}
   * @example
   * // Filters posts based on the search input value and displays the results.
   * searchPosts();
   */
  const searchPosts = () => {
    const query = document.getElementById("search-input").value.toLowerCase();
    const filteredPosts = postsData.filter(
      (post) => post.title.toLowerCase().includes(query) // Filter based on title only
    );
    displayPosts(filteredPosts);
  };

  // Initial fetch of posts
  await fetchPosts();

  // Add event listener to the search button
  document.getElementById("search-btn").addEventListener("click", searchPosts);
});
