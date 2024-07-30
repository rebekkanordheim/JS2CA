/* document.addEventListener("DOMContentLoaded", () => {
  // Select the form using the class name
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const email = document.getElementById("email").value.trim();
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

    const loginData = {
      email: email,
      password: password,
    };

    try {
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
        alert("Login successful!");

        // Store JWT token in localStorage
        localStorage.setItem("accessToken", loginData.data.accessToken);

        // Create API Key (if needed)
        const createApiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";
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
          localStorage.setItem("apiKey", apiKeyData.data.key);

          // Redirect to the feed or another protected page
          window.location.href = "../Feed/feed.html";
        } else {
          throw new Error("Failed to create API Key.");
        }
      } else {
        const errorData = await loginResponse.json();
        throw new Error(errorData.errors[0].message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed. Please try again.");
    }
  });
});
 */
document.addEventListener("DOMContentLoaded", () => {
  // Select the form using the class name
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Log email and password for debugging
    console.log("Email:", email);
    console.log("Password:", password);

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

    const loginData = {
      email: email,
      password: password,
    };

    try {
      const loginUrl = "https://v2.api.noroff.dev/auth/login";

      // Login the user
      const loginResponse = await fetch(loginUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      // Log the full login response for debugging
      const loginResponseData = await loginResponse.json();
      console.log("Login Response:", loginResponseData);

      if (loginResponse.ok) {
        alert("Login successful!");

        // Store JWT token in localStorage
        localStorage.setItem("accessToken", loginResponseData.data.accessToken);

        // Create API Key (if needed)
        const createApiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";
        const apiKeyResponse = await fetch(createApiKeyUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${loginResponseData.data.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: "My API Key" }), // Optional name
        });

        // Log the API key response for debugging
        const apiKeyResponseData = await apiKeyResponse.json();
        console.log("API Key Response:", apiKeyResponseData);

        if (apiKeyResponse.ok) {
          localStorage.setItem("apiKey", apiKeyResponseData.data.key);

          // Redirect to the feed or another protected page
          window.location.href = "../Feed/feed.html";
        } else {
          throw new Error("Failed to create API Key.");
        }
      } else {
        throw new Error(
          loginResponseData.errors[0].message || "Login failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed. Please try again.");
    }
  });
});