document.addEventListener("DOMContentLoaded", () => {
  // Get the average rating and stars container for the book
  const averageRatingElement = document.getElementById("average-rating");
  if (averageRatingElement) {
    const averageRating = parseFloat(averageRatingElement.textContent);
    const starContainer = document.getElementById("average-star-container");
    const stars = starContainer.querySelectorAll(".star");

    // Function to render the correct number of filled, half-filled, and empty stars
    const renderStars = (rating) => {
      stars.forEach((star, index) => {
        if (index < Math.floor(rating)) {
          star.classList.add("selected");
          star.classList.remove("unselected", "half-selected");
        } else if (index === Math.floor(rating) && rating % 1 !== 0) {
          star.classList.add("half-selected");
          star.classList.remove("selected", "unselected");
        } else {
          star.classList.add("unselected");
          star.classList.remove("selected", "half-selected");
        }
      });
    };

    // Call the function to render stars based on the average rating
    renderStars(averageRating);
  }
});

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
  selectedRating = rating;
  ratingInput.value = rating;  // Save the selected rating in the hidden input field

  stars.forEach((star, index) => {
    if (index < selectedRating) {
      star.classList.add('selected');
    } else {
      star.classList.remove('selected');
    }
  });
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
      // Assume positive if not toxic (you could refine this logic)
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

    // Display sentiment result next to the book details
    const sentimentDisplay = document.getElementById("sentiment-result");
    sentimentDisplay.textContent = `Your review sentiment is: ${sentiment}`;

    // Proceed to submit the review if necessary
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
}
