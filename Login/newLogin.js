/**
 * Initializes the login form and handles form submission for user login.
 * Runs when the DOM content is fully loaded.
 * @function
 * @async
 * @returns {Promise<void>} Resolves when the login process is completed, either successfully or with an error.
 * @throws {Error} Throws an error if the login or API key creation fails or if there is an unexpected issue.
 * @example
 * // Automatically sets up the login form and handles submission when the DOM content is loaded.
 * document.addEventListener("DOMContentLoaded", () => {
 *     // Initialization code here
 * });
 */
document.addEventListener("DOMContentLoaded", () => {
  /**
   * Reference to the login form element.
   * @type {HTMLFormElement|null}
   */
  const loginForm = document.querySelector(".login-form");

  if (!loginForm) {
    console.error("Login form not found.");
    return;
  }

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

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

    /**
     * Object containing login credentials.
     * @type {Object}
     * @property {string} email - The user's email address.
     * @property {string} password - The user's password.
     */
    const loginData = {
      email: email,
      password: password,
    };

    try {
      /**
       * URL to send the login request to.
       * @type {string}
       */
      const loginUrl = "https://v2.api.noroff.dev/auth/login";

      // Login the user
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      if (loginResponse.ok) {
        const loginData = await loginResponse.json();
        console.log("Login successful:", loginData);
        alert("Login successful!");

        // Store JWT token in localStorage
        localStorage.setItem("accessToken", loginData.data.accessToken);

        /**
         * URL to create the API key.
         * @type {string}
         */
        const createApiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";

        // Create API Key
        const apiKeyResponse = await fetch(createApiKeyUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginData.data.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "My API Key" }), // Optional name
        });

        if (apiKeyResponse.ok) {
          const apiKeyData = await apiKeyResponse.json();
          console.log("API Key created successfully:", apiKeyData);
          localStorage.setItem("apiKey", apiKeyData.data.key);

          // Retrieve profile data
          const profileUrl = `https://v2.api.noroff.dev/social/profiles/${loginData.data.name}`;
          const profileResponse = await fetch(profileUrl, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${loginData.data.accessToken}`,
              "Content-Type": "application/json",
              "X-Noroff-API-Key": apiKeyData.data.key, // Correct header name
            },
          });

          if (profileResponse.ok) {
            const profileData = await profileResponse.json();
            console.log("Profile data retrieved:", profileData);

            // Store user profile information in localStorage
            localStorage.setItem("name", profileData.data.name);
            localStorage.setItem("email", profileData.data.email);
            localStorage.setItem("avatarImage", profileData.data.avatar.url);

            // Redirect to the feed or another protected page
            window.location.href = "../Feed/feed.html";
          } else {
            const profileErrorData = await profileResponse.json();
            console.error("Failed to fetch profile data:", profileErrorData);
            throw new Error(
              "Failed to fetch profile data. " +
                (profileErrorData.errors[0]?.message || "")
            );
          }
        } else {
          const apiKeyErrorData = await apiKeyResponse.json();
          console.error("Failed to create API Key:", apiKeyErrorData);
          throw new Error(
            "Failed to create API Key. " + (apiKeyErrorData.errors[0]?.message || "")
          );
        }
      } else {
        const errorData = await loginResponse.json();
        console.error("Login failed:", errorData);
        throw new Error(
          errorData.errors[0]?.message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error("Error occurred:", error);
      alert(error.message || "Login failed. Please try again.");
    }
  });
});
