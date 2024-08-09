/**
 * Initializes event listeners for logout buttons when the DOM content is fully loaded.
 * It handles clearing local storage and redirecting to the homepage upon clicking the logout buttons.
 * Runs when the DOM content is fully loaded.
 * @function
 * @returns {void}
 * @example
 * // Automatically sets up logout button event listeners when the DOM content is loaded.
 * document.addEventListener("DOMContentLoaded", () => {
 *     // Initialization code here
 * });
 */
export async function newLogout() {
  document.addEventListener("DOMContentLoaded", () => {
    /**
     * Reference to the logout button in the footer.
     * @type {HTMLElement|null}
     */
    const logoutBtnFooter = document.getElementById("logout-btn");

    /**
     * Reference to the original logout button, if needed.
     * @type {HTMLElement|null}
     */
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtnFooter) {
      /**
       * Adds a click event listener to the logout button in the footer.
       * @function
       * @param {Event} event - The click event triggered by the user.
       * @returns {void}
       */
      logoutBtnFooter.addEventListener("click", () => {
        // Clear local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("apiKey");

        // Redirect to the homepage
        window.location.href = "/";
      });
    }

    if (logoutBtn) {
      /**
       * Adds a click event listener to the original logout button.
       * @function
       * @param {Event} event - The click event triggered by the user.
       * @returns {void}
       */
      logoutBtn.addEventListener("click", () => {
        // Clear local storage
        localStorage.removeItem("accessToken");
        localStorage.removeItem("apiKey");

        // Redirect to the homepage
        window.location.href = "/";
      });
    }
  });
}