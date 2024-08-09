/**
 * Initializes the visibility of various navigation elements based on the presence of an access token in localStorage.
 * Runs when the DOM content is fully loaded.
 * @function
 * @async
 * @returns {void}
 * @example
 * // Automatically runs when the DOM content is loaded, adjusting navigation visibility based on authentication status.
 * document.addEventListener("DOMContentLoaded", () => {
 *     // Initialization code here
 * });
 */
document.addEventListener("DOMContentLoaded", () => {
  const loginLink = document.getElementById("login-link");
  const profileLink = document.getElementById("profile-btn");
  const logoutLink = document.getElementById("logout-btn");
  const registerLink = document.getElementById("register-link");
  const feedLink = document.getElementById("feed-link");
  const createPostButton = document.getElementById("create-post-btn");

  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    if (loginLink) loginLink.style.display = "none";
    if (profileLink) profileLink.style.display = "block";
    if (logoutLink) logoutLink.style.display = "block";
    if (registerLink) registerLink.style.display = "none";
    if (feedLink) feedLink.style.display = "block";
    if (createPostButton) createPostButton.style.display = "block";
  } else {
    if (loginLink) loginLink.style.display = "block";
    if (profileLink) profileLink.style.display = "none";
    if (logoutLink) logoutLink.style.display = "none";
    if (registerLink) registerLink.style.display = "block";
    if (feedLink) feedLink.style.display = "none";
    if (createPostButton) createPostButton.style.display = "none";
  }
});
