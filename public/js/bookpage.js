// DOM elements
const reviewForm = document.querySelector("#review-form");
const reviewInput = document.querySelector("#review-input");
const reviewList = document.querySelector("#review-list");

// Function to create star elements for each review
const createStarElements = () => {
  const starContainer = document.createElement("div");
  starContainer.classList.add("review-stars");

  for (let i = 0; i < 5; i++) {
    const star = document.createElement("i");
    star.classList.add("star", "fas", "fa-star");
    starContainer.appendChild(star);
  }

  return starContainer;
};

// Function to add a review to the page
const addReview = (reviewText, stars) => {
  const reviewItem = document.createElement("li");
  reviewItem.classList.add("list-group-item");

  // Review content
  const reviewContent = document.createElement("p");
  reviewContent.textContent = reviewText;

  // Append the review text and stars
  reviewItem.appendChild(reviewContent);
  reviewItem.appendChild(stars);

  // Append the review item to the review list
  reviewList.appendChild(reviewItem);
};

// Handle form submission
reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const reviewText = reviewInput.value.trim();
  const bookId = document.location.pathname.split("/").pop();

  if (reviewText) {
    const response = await fetch(`/api/book/${bookId}`, {
      method: "POST",
      body: JSON.stringify({ review_content: reviewText }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.reload();
    } else {
      alert("Failed to create comment.");
    }
  }
});
