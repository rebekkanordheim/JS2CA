document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("form");

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
      const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(registerUrl, postData);

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log(data);
        // Optional: Redirect to login page or save token in localStorage
        window.location.href = "../Login/login.html";
      } else {
        const errorData = await response.json();
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
