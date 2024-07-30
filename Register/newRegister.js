document.addEventListener("DOMContentLoaded", () => {
  // Select the form using the class name
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
        alert("Registration successful!");

        // Store JWT token in localStorage
        localStorage.setItem("accessToken", registerData.data.accessToken);

        // Create API Key
        const createApiKeyUrl = "https://v2.api.noroff.dev/auth/create-api-key";
        const apiKeyResponse = await fetch(createApiKeyUrl, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${registerData.data.accessToken}`,
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
        const errorData = await registerResponse.json();
        throw new Error(
          errorData.errors[0].message || "Registration failed. Please try again."
        );
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Registration failed. Please try again.");
    }
  });
});
