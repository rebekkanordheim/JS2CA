document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("form");

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
      const apiKey = "YOUR_API_KEY"; // Replace with your actual API key

      const postData = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Noroff-API-Key": apiKey,
        },
        body: JSON.stringify(loginData),
      };

      const response = await fetch(loginUrl, postData);

      if (response.ok) {
        const data = await response.json();
        alert("Login successful!");
        console.log(data);

        // Store JWT and other data in localStorage
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.data));

        // Redirect to the feed or another protected page
        window.location.href = "../Feed/feed.html";
      } else {
        const errorData = await response.json();
        throw new Error(errorData.errors[0].message || "Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert(error.message || "Login failed. Please try again.");
    }
  });
});
