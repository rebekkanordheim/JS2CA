document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById("form");

  registerForm.addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const avatarUrl = document.getElementById("avatarUrl").value;

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

    const formData = {
      name: name,
      email: email,
      password: password,
      avatar: {
        url: avatarUrl || "",
      },
    };

    try {
      const registerUrl = "https://api.noroff.dev/api/v1/social/auth/register";
      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };

      const response = await fetch(registerUrl, postData);

      if (response.ok) {
        const data = await response.json();
        alert("Registration successful!");
        console.log(data);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Registration failed. Please try again.");
    }
  });
});
