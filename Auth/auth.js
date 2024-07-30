document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const registerLink = document.getElementById("register-link");
  const feedLink = document.getElementById("feed-link");

  // Check if access token is present in localStorage
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // Hide login and register links if the user is logged in
    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";
    if (feedLink) feedLink.style.display = "block"; // Ensure feed link is visible
  } else {
    // Ensure login and register links are visible if not logged in
    if (loginLink) loginLink.style.display = "block";
    if (registerLink) registerLink.style.display = "block";
    if (feedLink) feedLink.style.display = "none"; // Hide feed link if not logged in
  }
});
