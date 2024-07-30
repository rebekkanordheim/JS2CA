document.addEventListener("DOMContentLoaded", () => {
  // Select the logout button using its ID
  const logoutBtnFooter = document.getElementById("logout-btn-footer");

  // Select the original logout button if needed
  const logoutBtn = document.getElementById("logout-btn");

  // Check if the button exists before adding the event listener
  if (logoutBtnFooter) {
    logoutBtnFooter.addEventListener("click", () => {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("apiKey");

      // Redirect to the homepage
      window.location.href = "/";
    });
  }

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      // Clear local storage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("apiKey");

      // Redirect to the homepage
      window.location.href = "/";
    });
  }
});
