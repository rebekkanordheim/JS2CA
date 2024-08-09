/**
 * Displays the user's profile information by retrieving data from local storage.
 * This function dynamically populates the profile page with the user's name, email, and avatar image.
 * If the required data is not found in local storage, an error message is displayed instead.
 *
 * @function
 * @returns {void} This function does not return a value. It either populates the profile information or displays an error message.
 * @throws {Error} Throws an error if the profile information container is not found in the DOM or if the user information is not available in local storage.
 * @example
 * // Automatically sets up and displays the profile information when the DOM content is loaded.
 * profile();
 */
export async function profile() {
  document.addEventListener("DOMContentLoaded", () => {
    // Retrieve user information from local storage
    const name = localStorage.getItem("name");
    const email = localStorage.getItem("email");
    const avatarImage = localStorage.getItem("avatarImage");
    const avatarAlt = localStorage.getItem("avatarAlt");

    // Reference to the profile information container
    const profileInfoContainer = document.querySelector(".profile-information");

    if (!profileInfoContainer) {
      console.error("Profile information container not found.");
      return;
    }

    // Check if user information exists in local storage
    if (!name || !email || !avatarImage) {
      console.error("User information not found in local storage.");
      profileInfoContainer.innerHTML = "<p>Error: User information not available.</p>";
      return;
    }

    // Create and insert HTML to display user profile information
    const profileHtml = `
      <div class="profile-header">
        <img src="${avatarImage}" alt="${avatarAlt}" class="profile-avatar" />
        <h3>${name}</h3>
        <p>${email}</p>
      </div>
      <div class="profile-details">
        <p><strong>Bio:</strong> ${localStorage.getItem("bio") || "No bio available."}</p>
      </div>
    `;

    // Dynamically set the page title to the user's name
    document.title = `Profile - ${name}`;

    profileInfoContainer.innerHTML = profileHtml;
  });
}
