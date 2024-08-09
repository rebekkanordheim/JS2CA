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
    const logoutBtnFooter = document.getElementById("logout-btn");
    const logoutBtn = document.getElementById("logout-btn");

    if (logoutBtnFooter) {
      logoutBtnFooter.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("apiKey");
        window.location.href = "/";
      });
    }

    if (logoutBtn) {
      logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("apiKey");
        window.location.href = "/";
      });
    }
  });
}
