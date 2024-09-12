document.addEventListener('DOMContentLoaded', () => {
    console.log('Homepage JavaScript loaded.');
  
    // Search form functionality
    const searchForm = document.querySelector('form');
    const searchInput = document.querySelector('input[name="query"]');
  
    searchForm.addEventListener('submit', function(event) {
      if (searchInput.value.trim() === '') {
        event.preventDefault(); // Prevent form submission
        alert('Please enter a search query.');
      }
    });
  
    // Basic interaction with books
    document.querySelectorAll('.book-item').forEach((book) => {
      book.addEventListener('click', () => {
        const bookTitle = book.querySelector('h3').textContent;
        console.log(`Book clicked: ${bookTitle}`);
        // Additional logic for clicking on a book can go here
      });
    });
  });
  