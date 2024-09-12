document.addEventListener('DOMContentLoaded', () => {
    console.log('Signup JavaScript loaded.');
  
    const signupForm = document.querySelector('form');
    const usernameInput = document.getElementById('username');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPasswordInput = document.getElementById('confirm-password');
  
    // Handle form submission
    signupForm.addEventListener('submit', async (event) => {
      event.preventDefault();
  
      // Check if the password and confirm password match
      if (passwordInput.value !== confirmPasswordInput.value) {
        alert('Passwords do not match.');
        return;
      }
  
      // Prepare the data to be sent to the backend
      const userData = {
        username: usernameInput.value.trim(),
        email: emailInput.value.trim(),
        password: passwordInput.value.trim(),
      };
  
      // Send a POST request to the /signup route
      try {
        const response = await fetch('/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
  
        const result = await response.json();
  
        if (response.ok) {
          alert(result.message || 'Signup successful! Redirecting to homepage...');
          window.location.href = '/'; // Redirect to the homepage or another page
        } else {
          alert(result.message || 'Signup failed. Please try again.');
        }
      } catch (error) {
        console.error('Error:', error);
        alert('An error occurred during signup. Please try again.');
      }
    });
  });
  