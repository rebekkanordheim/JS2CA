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
 *     newLogin();
 * });
 */
export function newLogin() {
  document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.querySelector(".login-form");

    if (!loginForm) {
      console.error("Login form not found.");
      return;
    }

    loginForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const email = document.getElementById("email").value.trim();
      const password = document.getElementById("password").value.trim();

      const emailRegex = /^[a-zA-Z0-9._%+-]+@(noroff\.no|stud\.noroff\.no)$/;
      if (!emailRegex.test(email)) {
        alert("Invalid email. Please use @noroff.no or @stud.noroff.no email.");
        return;
      }

      if (password.length < 8) {
        alert("Invalid password. Password must be at least 8 characters long.");
        return;
      }

      const loginData = {
        email,
        password,
      };

      try {
        const loginUrl = "https://v2.api.noroff.dev/auth/login";

        const loginResponse = await fetch(loginUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(loginData),
        });

        if (loginResponse.ok) {
          const {
            data: { accessToken, name },
          } = await loginResponse.json();
          console.log("Login successful:", { accessToken, name });
          alert("Login successful!");

          localStorage.setItem("accessToken", accessToken);

          const createApiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";

          const apiKeyResponse = await fetch(createApiKeyUrl, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ name: "My API Key" }),
          });

          if (apiKeyResponse.ok) {
            const {
              data: { key },
            } = await apiKeyResponse.json();
            console.log("API Key created successfully:", { key });
            localStorage.setItem("apiKey", key);

            const profileUrl = `https://v2.api.noroff.dev/social/profiles/${name}`;
            const profileResponse = await fetch(profileUrl, {
              method: "GET",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
                "X-Noroff-API-Key": key,
              },
            });

            if (profileResponse.ok) {
              const {
                data: {
                  name,
                  email,
                  avatar: { url: avatarImage },
                },
              } = await profileResponse.json();
              console.log("Profile data retrieved:", { name, email, avatarImage });

              localStorage.setItem("name", name);
              localStorage.setItem("email", email);
              localStorage.setItem("avatarImage", avatarImage);

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
}
