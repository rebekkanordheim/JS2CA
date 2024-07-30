document.addEventListener("DOMContentLoaded", () => {
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
