/**
 * Fetches and displays social media posts when the DOM content is fully loaded.
 * This function retrieves posts from the server using stored access tokens and API keys, 
 * and then dynamically renders the posts on the webpage.
 *
 * @function
 * @async
 * @returns {Promise<void>} Resolves when the posts have been successfully fetched and displayed, or when an error occurs.
 * @throws {Error} Throws an error if the posts cannot be fetched or if there is an unexpected issue.
 * @example
 * // Automatically sets up and displays posts when the DOM content is loaded.
 * newFeed();
 */
export async function newFeed() {
  document.addEventListener("DOMContentLoaded", async () => {
    const accessToken = localStorage.getItem("accessToken");
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
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Posts data:", data);

        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = "";

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
        const postsContainer = document.getElementById("posts-container");
        postsContainer.innerHTML = `<p>Failed to fetch posts: ${
          errorData.errors[0].message || "Unknown error"
        }</p>`;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      const postsContainer = document.getElementById("posts-container");
      postsContainer.innerHTML = `<p>Error fetching posts: ${
        error.message || "Unknown error"
      }</p>`;
    }
  });
}