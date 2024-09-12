document.addEventListener('DOMContentLoaded', () => {
    console.log('Main JavaScript loaded.');
  
    // Handle logout functionality
    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
      logoutLink.addEventListener('click', async (event) => {
        event.preventDefault();
        try {
          const response = await fetch('/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
          });
          
          if (response.ok) {
            alert('You have successfully logged out.');
            window.location.href = '/'; // Redirect to homepage after logout
          } else {
            alert('Logout failed. Please try again.');
          }
        } catch (error) {
          console.error('Logout error:', error);
          alert('An error occurred. Please try again.');
        }
      });
    }
  
    // Handle navigation clicks
    const homeButton = document.querySelector('.navbar-brand');
    if (homeButton) {
      homeButton.addEventListener('click', () => {
        window.location.href = '/';
      });
    }
  
    // Handle tooltips or other global Bootstrap features
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.forEach((tooltipTriggerEl) => {
      new bootstrap.Tooltip(tooltipTriggerEl);
    });
  });
  