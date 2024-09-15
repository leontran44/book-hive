document.addEventListener("DOMContentLoaded", () => {
  // Analyze the review text for sentiment based on star rating
  const analyzeSentimentByRating = (rating) => {
    if (rating <= 2) {
      return { sentiment: "Negative", color: "red" };
    } else if (rating === 3) {
      return { sentiment: "Neutral", color: "orange" };
    } else if (rating >= 4) {
      return { sentiment: "Positive", color: "green" };
    }
    return { sentiment: "Neutral", color: "gray" };  // Fallback if no rating
  };

  // Run sentiment analysis for each review in the review list
  const reviews = document.querySelectorAll(".review-card");

  reviews.forEach((review, index) => {
    const selectedStars = review.querySelectorAll(".review-stars .selected").length;
    const sentimentResult = document.getElementById(`sentiment-${index}`);
    const { sentiment, color } = analyzeSentimentByRating(selectedStars);

    if (sentimentResult) {
      sentimentResult.textContent = sentiment;
      sentimentResult.style.color = color;
    }
  });

  // Handling review form submission and star selection for new review
  const reviewForm = document.querySelector("#review-form");
  const reviewInput = document.querySelector("#review-input");
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingInput = document.getElementById('rating-value');
  const sentimentDisplay = document.getElementById("sentiment-result"); 
  let selectedRating = 0;

  // ** Get the bookId from the form's data attribute **
  const bookId = reviewForm.dataset.bookId;

  // Function to highlight stars on hover
  const highlightStars = (rating) => {
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
    selectedRating = rating;
    ratingInput.value = rating;

    stars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });

    const { sentiment, color } = analyzeSentimentByRating(selectedRating);
    if (sentimentDisplay) {
      sentimentDisplay.textContent = sentiment;
      sentimentDisplay.style.color = color;
    }
  };

  // Reset stars to reflect the selected rating after hover ends
  const resetStars = () => {
    stars.forEach((star, index) => {
      star.classList.remove('hovered');
      if (index < selectedRating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  };

  // Attach event listeners to each star for hover and click actions
  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => highlightStars(index + 1));
    star.addEventListener('click', () => setRating(index + 1));
    star.addEventListener('mouseout', resetStars);
  });

  // Attach event listener to the form for submission
  if (reviewForm) {
    reviewForm.addEventListener('submit', async (event) => {
      event.preventDefault();

      const reviewContent = reviewInput.value.trim();
      const rating = parseInt(ratingInput.value, 10);

      if (isNaN(rating) || rating < 1 || rating > 5 || !reviewContent) {
        console.error("Invalid review data");
        return;
      }

      const { sentiment, color } = analyzeSentimentByRating(rating);

      try {
        const response = await fetch(`/api/book/${bookId}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            rating,
            review_content: reviewContent,
            sentiment
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Review submitted:', data);

        // Refresh the page to show the new review
        window.location.reload(); // This reloads the page after a successful submission
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    });
  }
});
