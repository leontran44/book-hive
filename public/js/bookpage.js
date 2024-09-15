document.addEventListener("DOMContentLoaded", () => {
  // Handling review form submission and star selection
  const reviewForm = document.querySelector("#review-form");
  const reviewInput = document.querySelector("#review-input");
  const stars = document.querySelectorAll('.star-rating .star');
  const ratingInput = document.getElementById('rating-value');
  let selectedRating = 0;

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
    selectedRating = parseInt(rating, 10); // Ensure the rating is an integer
    ratingInput.value = selectedRating;  // Save the selected rating in the hidden input field
  
    stars.forEach((star, index) => {
      if (index < selectedRating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  
    // Update sentiment display
    const { sentiment, color } = analyzeSentimentByRating(selectedRating);
    if (sentimentDisplay) {
      sentimentDisplay.textContent = sentiment;
      sentimentDisplay.style.color = color;
    }
  };
  

  // Reset stars to reflect the selected rating after hover ends
  const resetStars = () => {
    stars.forEach((star, index) => {
      star.classList.remove('hovered');  // Clear hover state
      if (index < selectedRating) {
        star.classList.add('selected');
      } else {
        star.classList.remove('selected');
      }
    });
  };

  // Attach event listeners to each star for hover and click actions
  stars.forEach((star, index) => {
    star.addEventListener('mouseover', () => highlightStars(index + 1));  // Hover effect
    star.addEventListener('click', () => setRating(index + 1));  // Click effect
    star.addEventListener('mouseout', resetStars);  // Reset on mouse out
  });

  // Load TensorFlow.js toxicity model for sentiment analysis
  const loadToxicityModel = async () => {
    const threshold = 0.9;  // Confidence threshold for the model
    return await toxicity.load(threshold);
  };

  // Analyze the review text for sentiment and display result
  const analyzeSentiment = async (text) => {
    try {
      const model = await loadToxicityModel();
      const predictions = await model.classify([text]);

      // Checking for toxicity
      const toxicPrediction = predictions.find(prediction => prediction.label === 'toxicity');
      const isToxic = toxicPrediction.results[0].match;

      // Determine sentiment based on toxicity
      let sentimentResult;
      if (isToxic) {
        sentimentResult = 'Negative';
      } else {
        sentimentResult = 'Positive';
      }
      return sentimentResult;

    } catch (error) {
      console.error("Error analyzing sentiment:", error);
      return 'Neutral';  // Default to neutral if there's an error
    }
  };

  // Handle form submission
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (event) => {
      event.preventDefault();

      const reviewText = reviewInput.value.trim();
      const ratingValue = ratingInput.value;
      const bookId = document.location.pathname.split("/").pop();

      if (!reviewText || ratingValue === "0") {
        alert("Please provide both a rating and a review.");
        return;
      }

      // Run sentiment analysis on the review text
      const sentiment = await analyzeSentiment(reviewText);

      // Proceed to submit the review
      const response = await fetch(`/api/book/${bookId}`, {
        method: "POST",
        body: JSON.stringify({ review_content: reviewText, rating: ratingValue, sentiment }), // Add sentiment
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        document.location.reload(); // Reload to show the new review with sentiment
      } else {
        alert("Failed to create review.");
      }
    });
  }

  // Run sentiment analysis for each review in the review list
  const reviews = document.querySelectorAll(".review-card");

  reviews.forEach(async (review, index) => {
    const reviewText = review.querySelector("p").textContent;
    const sentimentResult = document.getElementById(`sentiment-${index}`);

    // Perform sentiment analysis on the review content
    const sentiment = await analyzeSentiment(reviewText);

    // Display sentiment next to the review
    if (sentimentResult) {
      sentimentResult.textContent = sentiment;
      sentimentResult.style.color = sentiment === "Negative" ? "red" : "green";
    }
  });
});
