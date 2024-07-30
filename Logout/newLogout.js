document.addEventListener("DOMContentLoaded", () => {
  // Select the logout button using its ID
  const logoutBtn = document.getElementById("logout-btn");

  logoutBtn.addEventListener("click", () => {
    // Clear local storage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("apiKey");

    // Redirect to the homepage
    window.location.href = "/";
  });
});
