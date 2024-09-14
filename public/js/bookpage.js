// DOM elements
const reviewForm = document.querySelector("#review-form");
const reviewInput = document.querySelector("#review-input");
const reviewList = document.querySelector("#review-list");
const stars = document.querySelectorAll('.star-rating .star');
const ratingInput = document.getElementById('rating-value');
let selectedRating = 0;

// Function to highlight stars on hover
const highlightStars = (rating) => {
  console.log(`Hovering over ${rating} star(s)`);
  stars.forEach((star, index) => {
    if (index < rating) {
      star.classList.add('hovered');
    } else {
      star.classList.remove('hovered');
    }
  });
};

// Function to set the selected rating when a star is clicked
const setRating = (rating) => {
  console.log(`Clicked on ${rating} star(s)`);
  selectedRating = rating;
  ratingInput.value = rating;  // Save the selected rating in the hidden input field

  stars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add('selected');
      console.log(`Star ${index + 1} selected`);
    } else {
      star.classList.remove('selected');
    }
  });

  console.log(`Selected rating: ${selectedRating}`);
};

// Reset stars to reflect the selected rating after hover ends
const resetStars = () => {
  stars.forEach((star, index) => {
    star.classList.remove('hovered');  // Clear hover state
    if (index < selectedRating) {
      star.classList.add('selected');  // Keep the selected stars highlighted
    } else {
      star.classList.remove('selected');  // Ensure stars after the selected one remain unselected
    }
  });

  console.log(`Reset stars, current rating: ${selectedRating}`);
};

// Attach event listeners to each star for hover and click actions
stars.forEach((star, index) => {
  star.addEventListener('mouseover', () => highlightStars(index + 1));  // Hover effect
  star.addEventListener('click', () => setRating(index + 1));  // Click effect
  star.addEventListener('mouseout', resetStars);  // Reset on mouse out

  console.log(`Event listener attached to star ${index + 1}`);
});

// Handle form submission
reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const reviewText = reviewInput.value.trim();
  const ratingValue = ratingInput.value;
  const bookId = document.location.pathname.split("/").pop();

  if (!reviewText || ratingValue === "0") {
    alert("Please provide both a rating and a review.");
    return;
  }

  const response = await fetch(`/api/book/${bookId}`, {
    method: "POST",
    body: JSON.stringify({ review_content: reviewText, rating: ratingValue }),
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    document.location.reload();
  } else {
    alert("Failed to create review.");
  }
});

