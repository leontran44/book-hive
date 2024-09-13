document.addEventListener("DOMContentLoaded", () => {
  console.log("Signup JavaScript loaded.");

  const signupForm = document.querySelector("#signup-form");
  const usernameInput = document.querySelector("#signup-username");
  const emailInput = document.querySelector("#signup-email");
  const passwordInput = document.querySelector("#signup-password");
  const confirmPasswordInput = document.querySelector("#confirm-password");

  // Handle form submission
  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = usernameInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    // Check if the password and confirm password match
    if (password !== confirmPassword) {
      alert("Passwords do not match. Please try again.");
      return;
    }

    // Send a POST request to the /signup route
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      if (response.ok) {
        await response.json();
        document.location.replace("/profile"); // Redirect to the profile
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during signup. Please try again.");
    }
  });
});
