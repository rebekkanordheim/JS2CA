document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const logoutLink = document.getElementById("logout-btn-footer");
  const registerLink = document.getElementById("register-link");
  const feedLink = document.getElementById("feed-link");
  const createPostButton = document.getElementById("create-post-btn");

  // Check if access token is present in localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // User is logged in
    if (loginLink) loginLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "block";
    if (registerLink) registerLink.style.display = "none";
    if (feedLink) feedLink.style.display = "block";
    if (createPostButton) createPostButton.style.display = "block"; // Show create post button
  } else {
    // User is not logged in
    if (loginLink) loginLink.style.display = "block";
        if (logoutLink) logoutLink.style.display = "none";
    if (registerLink) registerLink.style.display = "block";
    if (feedLink) feedLink.style.display = "none";
    if (createPostButton) createPostButton.style.display = "none"; // Hide create post button
  }
});
