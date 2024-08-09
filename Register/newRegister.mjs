/**
 * Initializes event listeners for the registration form when the DOM content is fully loaded.
 * Handles form validation and submission, including sending the registration data to the API.
 * Runs when the DOM content is fully loaded.
 * @function
 * @returns {void}
 * @example
 * // Automatically sets up the registration form event listener when the DOM content is loaded.
 * newRegister();
 */
export function newRegister() {
  document.addEventListener("DOMContentLoaded", () => {
    const registerForm = document.querySelector(".register-form");

    registerForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();
      const avatarUrl = document.getElementById("avatarUrl").value.trim();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email. Please use @noroff.no or @stud.noroff.no email.");
        return;
      }

      if (password.length < 8) {
        alert("Invalid password. Password must be at least 8 characters long.");
        return;
      }

      const formData = {
        name: name,
        email: email,
        password: password,
        avatar: avatarUrl ? { url: avatarUrl } : null,
      };

      if (!formData.avatar) delete formData.avatar;

      try {
        const registerUrl = "https://v2.api.noroff.dev/auth/register";

        const registerResponse = await fetch(registerUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (registerResponse.ok) {
          const registerData = await registerResponse.json();
          console.log("Registration successful:", registerData);
          alert("Registration successful!");
          window.location.href = "../Login/login.html";
        } else {
          const errorData = await registerResponse.json();
          console.error("Registration failed:", errorData);
          throw new Error(
            errorData.errors[0]?.message || "Registration failed. Please try again."
          );
        }
      } catch (error) {
        console.error("Error occurred:", error);
        alert(error.message || "Registration failed. Please try again.");
      }
    });
  });
}
