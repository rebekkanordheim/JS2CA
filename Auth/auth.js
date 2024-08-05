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
  /**
   * Reference to the login link element.
   * @type {HTMLElement|null}
   */
  const loginLink = document.getElementById("login-link");

  /**
   * Reference to the profile button element.
   * @type {HTMLElement|null}
   */
  const profileLink = document.getElementById("profile-btn");

  /**
   * Reference to the logout button element.
   * @type {HTMLElement|null}
   */
  const logoutLink = document.getElementById("logout-btn");

  /**
   * Reference to the register link element.
   * @type {HTMLElement|null}
   */
  const registerLink = document.getElementById("register-link");

  /**
   * Reference to the feed link element.
   * @type {HTMLElement|null}
   */
  const feedLink = document.getElementById("feed-link");

  /**
   * Reference to the create post button element.
   * @type {HTMLElement|null}
   */
  const createPostButton = document.getElementById("create-post-btn");

  /**
   * Retrieves the access token from localStorage.
   * @type {string|null}
   */
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    // User is logged in
    if (loginLink) loginLink.style.display = "none"; // Hide login link
    if (profileLink) profileLink.style.display = "block"; // Show profile button
    if (logoutLink) logoutLink.style.display = "block"; // Show logout button
    if (registerLink) registerLink.style.display = "none"; // Hide register link
    if (feedLink) feedLink.style.display = "block"; // Show feed link
    if (createPostButton) createPostButton.style.display = "block"; // Show create post button
  } else {
    // User is not logged in
    if (loginLink) loginLink.style.display = "block"; // Show login link
    if (profileLink) profileLink.style.display = "none"; // Hide profile button
    if (logoutLink) logoutLink.style.display = "none"; // Hide logout button
    if (registerLink) registerLink.style.display = "block"; // Show register link
    if (feedLink) feedLink.style.display = "none"; // Hide feed link
    if (createPostButton) createPostButton.style.display = "none"; // Hide create post button
  }
});
