document.addEventListener("DOMContentLoaded", () => {
  // Handle profile update (e.g., updating the user's name or email)
  const updateProfileForm = document.querySelector("#update-profile-form");

  if (updateProfileForm) {
    updateProfileForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const username = document.querySelector("#name-input").value.trim();
      const email = document.querySelector("#email-input").value.trim();

      if (username && email) {
        try {
          const response = await fetch("/api/user", {
            method: "PUT",
            body: JSON.stringify({ username, email }),
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (response.ok) {
            document.location.reload();
          } else {
            alert("Failed to update profile");
          }
        } catch (error) {
          console.error("Error updating profile:", error);
        }
      } else {
        alert("Please fill in both fields");
      }
    });
  }

  // Handle account deletion
  const deleteAccountBtn = document.querySelector("#delete-account-btn");

  if (deleteAccountBtn) {
    deleteAccountBtn.addEventListener("click", async () => {
      const confirmDelete = confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      );

      if (confirmDelete) {
        try {
          const response = await fetch("/api/user", {
            method: "DELETE",
          });

          if (response.ok) {
            alert("Account deleted successfully");
            document.location.replace("/"); // Redirect to home after deletion
          } else {
            alert("Failed to delete account");
          }
        } catch (error) {
          console.error("Error deleting account:", error);
        }
      }
    });
  }
});
