document.addEventListener('DOMContentLoaded', () => {
  console.log('Homepage JavaScript loaded.');

  // Search form functionality
  const searchForm = document.querySelector('form');
  const searchInput = document.querySelector('input[name="query"]');

  if (searchForm && searchInput) {  // Check if form and input exist
    searchForm.addEventListener('submit', function(event) {
      if (searchInput.value.trim() === '') {
        event.preventDefault(); // Prevent form submission
        alert('Please enter a search query.');
      }
    });
  } else {
    console.log('Search form or input not found.');
  }

  // Basic interaction with books
  const bookItems = document.querySelectorAll('.book-item');
  if (bookItems.length > 0) {  // Check if any books exist
    bookItems.forEach((book) => {
      book.addEventListener('click', () => {
        const bookTitle = book.querySelector('h3').textContent;
        console.log(`Book clicked: ${bookTitle}`);
        // Additional logic for clicking on a book can go here
      });
    });
  } else {
    console.log('No books found on the page.');
  }
});
