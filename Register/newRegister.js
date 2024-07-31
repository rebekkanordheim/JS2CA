/* document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.querySelector(".register-form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const avatarUrl = document.getElementById("avatarUrl").value.trim();

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email. Please use @noroff.no or @stud.noroff.no email.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      alert("Invalid password. Password must be at least 8 characters long.");
      return;
    }

    // Prepare form data
    const formData = {
      name: name,
      email: email,
      password: password,
      avatar: avatarUrl ? { url: avatarUrl } : null,
    };

    // Remove optional fields if not set
    if (!formData.avatar) delete formData.avatar;

    try {
      const registerUrl = "https://v2.api.noroff.dev/auth/register";

      // Register the user
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

        // Redirect to the login page (API key creation happens here)
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
 */

/**
 * Initializes event listeners for the registration form when the DOM content is fully loaded.
 * Handles form validation and submission, including sending the registration data to the API.
 * Runs when the DOM content is fully loaded.
 * @function
 * @returns {void}
 * @example
 * // Automatically sets up the registration form event listener when the DOM content is loaded.
 * document.addEventListener("DOMContentLoaded", () => {
 *     // Initialization code here
 * });
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Reference to the registration form element.
   * @type {HTMLFormElement|null}
   */
  const registerForm = document.querySelector(".register-form");

  /**
   * Adds a submit event listener to the registration form.
   * @function
   * @param {Event} event - The submit event triggered by the user.
   * @returns {void}
   */
  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    /**
     * User's name input from the form.
     * @type {string}
     */
    const name = document.getElementById("name").value.trim();

    /**
     * User's email input from the form.
     * @type {string}
     */
    const email = document.getElementById("email").value.trim();

    /**
     * User's password input from the form.
     * @type {string}
     */
    const password = document.getElementById("password").value.trim();

    /**
     * URL of the user's avatar input from the form.
     * @type {string}
     */
    const avatarUrl = document.getElementById("avatarUrl").value.trim();

    // Validate email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
    if (!emailRegex.test(email)) {
      alert("Invalid email. Please use @noroff.no or @stud.noroff.no email.");
      return;
    }

    // Validate password
    if (password.length < 8) {
      alert("Invalid password. Password must be at least 8 characters long.");
      return;
    }

    // Prepare form data
    /**
     * Object representing the registration data.
     * @typedef {Object} RegistrationData
     * @property {string} name - The name of the user.
     * @property {string} email - The email address of the user.
     * @property {string} password - The user's password.
     * @property {Object|null} avatar - The user's avatar object or null.
     * @property {string} [avatar.url] - The URL of the user's avatar.
     */
    const formData = {
      name: name,
      email: email,
      password: password,
      avatar: avatarUrl ? { url: avatarUrl } : null,
    };

    // Remove optional fields if not set
    if (!formData.avatar) delete formData.avatar;

    try {
      const registerUrl = "https://v2.api.noroff.dev/auth/register";

      // Register the user
      /**
       * Response from the registration API.
       * @typedef {Object} RegistrationResponse
       * @property {boolean} ok - Indicates if the request was successful.
       * @property {Object} data - The response data.
       * @property {Object[]} [errors] - Array of error objects if the request failed.
       */
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

        // Redirect to the login page (API key creation happens here)
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