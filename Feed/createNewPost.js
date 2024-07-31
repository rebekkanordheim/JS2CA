document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("create-post-form");

  form.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent the form from submitting the default way

    const accessToken = localStorage.getItem("accessToken"); // Retrieve the access token from local storage
    const apiKey = localStorage.getItem("apiKey"); // Retrieve the API key from local storage

    if (!accessToken || !apiKey) {
      console.error("No access token or API key found. Please log in.");
      return;
    }

    // Retrieve the form data
    const title = document.getElementById("title").value;
    const body = document.getElementById("body").value;
    const mediaUrl = document.getElementById("mediaUrl").value;

    // Create the post object
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
