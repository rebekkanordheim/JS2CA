/**
 * Initializes event listeners for the create post form.
 * Runs when the DOM content is fully loaded.
 * @function
 * @async
 * @returns {void}
 * @example
 * // Automatically sets up the form submission handling when the DOM content is loaded.
 * document.addEventListener("DOMContentLoaded", () => {
 *     // Initialization code here
 * });
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Reference to the create post form element.
   * @type {HTMLFormElement|null}
   */
  const form = document.getElementById("create-post-form");

  if (!form) {
    console.error("Create post form not found.");
    return;
  }

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

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

    // Retrieve the form data
    /**
     * @type {string}
     */
    const title = document.getElementById("title").value;

    /**
     * @type {string}
     */
    const body = document.getElementById("body").value;

    /**
     * @type {string}
     */
    const mediaUrl = document.getElementById("mediaUrl").value;

    // Create the post object
    /**
     * Represents the new post to be created.
     * @type {Object}
     * @property {string} title - The title of the post.
     * @property {string} body - The body content of the post.
     * @property {Object} media - The media associated with the post.
     * @property {string|null} media.url - The URL of the media or null if not provided.
     * @property {string} media.alt - Alternative text for the media.
     */
    const newPost = {
      title,
      body,
      media: {
        url: mediaUrl || null, // Set to null if mediaUrl is empty
        alt: "",
      },
    };

    try {
      const response = await fetch("https://v2.api.noroff.dev/social/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`, // Include access token for authorization
          "X-Noroff-API-Key": apiKey, // Include API key if required by the API
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost), // Send the new post data as JSON
      });

      if (response.ok) {
        console.log("Post created successfully");
        window.location.href = "../Feed/feed.html"; // Redirect to the feed page
      } else {
        const errorData = await response.json();
        console.error("Failed to create post:", errorData);
        alert(`Failed to create post: ${errorData.errors[0].message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert(`Error creating post: ${error.message || "Unknown error"}`);
    }
  });
});
