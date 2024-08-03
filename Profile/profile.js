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
