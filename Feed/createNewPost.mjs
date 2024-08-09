/**
 * Initializes event listeners for the create post form.
 * Runs when the DOM content is fully loaded.
 *
 * @async
 * @function createNewPost
 * @returns {void}
 * @example
 * createNewPost();
 */
export function createNewPost() {
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("create-post-form");

    if (!form) {
      console.error("Create post form not found.");
      return;
    }

    form.addEventListener("submit", async (event) => {
      event.preventDefault();

      const accessToken = localStorage.getItem("accessToken");
      const apiKey = localStorage.getItem("apiKey");

      if (!accessToken || !apiKey) {
        console.error("No access token or API key found. Please log in.");
        return;
      }

      const title = document.getElementById("title").value;
      const body = document.getElementById("body").value;
      const mediaUrl = document.getElementById("mediaUrl").value;

      const newPost = {
        title,
        body,
        media: {
          url: mediaUrl || null,
          alt: "",
        },
      };

      try {
        const response = await fetch("https://v2.api.noroff.dev/social/posts", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "X-Noroff-API-Key": apiKey,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        });

        if (response.ok) {
          console.log("Post created successfully");
          window.location.href = "../Feed/feed.html";
        } else {
          const errorData = await response.json();
          console.error("Failed to create post:", errorData);
          alert(
            `Failed to create post: ${errorData.errors[0].message || "Unknown error"}`
          );
        }
      } catch (error) {
        console.error("Error creating post:", error);
        alert(`Error creating post: ${error.message || "Unknown error"}`);
      }
    });
  });
}
