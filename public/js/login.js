document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.querySelector("#login-form");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.querySelector("#login-email").value.trim();
    const password = document.querySelector("#login-password").value.trim();

    if (email && password) {
      try {
        // Attempt to log in using the provided email and password
        const response = await fetch("/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        // If the login is successful, redirect to the homepage
        if (response.ok) {
          window.location.replace("/profile"); // Redirect to profile
        } else {
          // If login fails, display the error message from the server
          const data = await response.json();
          alert(
            data.message || "Failed to login. Please check your credentials."
          );
        }
      } catch (error) {
        // If there's a network or other error, display a friendly message
        console.error("Error during fetch:", error);
        alert(
          "An error occurred while trying to log in. Please try again later."
        );
      }
    } else {
      // If email or password is missing, prompt the user to fill in both fields
      alert("Please fill in both the email and password fields.");
    }
  });
});
