document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector(".login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value.trim();

    if (email && password) {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        window.location.replace("/"); // I change this to redirect to the homepage
      } else {
        // Display error if login fails
        alert("Failed to login. Please check your credentials.");
      }
    } else {
      alert("Please fill in both the email and password fields.");
    }
  });
});
