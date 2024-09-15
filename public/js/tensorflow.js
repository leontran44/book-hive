const threshold = 0.9; // Confidence level for toxicity detection

// Function to load TensorFlow toxicity model and classify review
async function analyzeReview() {
  const reviewText = document.querySelector('#review-input')?.value.trim(); // Get the user's review input and trim whitespace

  if (!reviewText) {
    console.log("No review text provided.");
    return;
  }

  try {
    const model = await toxicity.load(threshold); // Load the model
    const predictions = await model.classify([reviewText]); // Classify the review text

    // Check for toxic content
    const toxicPrediction = predictions.find(prediction => prediction.label === 'toxicity');

    // Determine sentiment based on toxicity or lack thereof
    let sentimentResult;
    
    if (toxicPrediction.results[0].match) {
      sentimentResult = 'Negative';
      console.log("Negative sentiment detected.");
    } else if (reviewText.split(" ").length < 5) {
      sentimentResult = 'Neutral'; // Very short reviews can be considered neutral
      console.log("Neutral sentiment detected.");
    } else {
      sentimentResult = 'Positive';
      console.log("Positive sentiment detected.");
    }

    // Display sentiment and update star rating
    displaySentiment(sentimentResult);
    updateStarRating(sentimentResult);
  } catch (error) {
    console.error("Error during sentiment analysis:", error);
  }
}

// Function to display sentiment result
function displaySentiment(sentiment) {
  const sentimentDisplay = document.getElementById('sentiment-result');
  
  if (sentimentDisplay) {
    sentimentDisplay.textContent = `Your review sentiment is: ${sentiment}`;
  }
}

// Function to update the star rating based on sentiment analysis
function updateStarRating(sentiment) {
  const starContainer = document.querySelector('.review-stars');

  if (!starContainer) {
    console.error("Star container not found.");
    return;
  }

  if (sentiment === 'Positive') {
    starContainer.innerHTML = `
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
    `;
  } else if (sentiment === 'Neutral') {
    starContainer.innerHTML = `
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">☆</span>
      <span class="star">☆</span>
    `;
  } else {
    // For negative sentiment
    starContainer.innerHTML = `
      <span class="star">★</span>
      <span class="star">★</span>
      <span class="star">☆</span>
      <span class="star">☆</span>
      <span class="star">☆</span>
    `;
  }
}

// Event listener to trigger analysis on form submission
document.addEventListener('DOMContentLoaded', function() {
  const reviewForm = document.querySelector('#review-form');

  if (!reviewForm) {
    console.error("Review form not found.");
    return;
  }

  reviewForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    analyzeReview(); // Call function to analyze review sentiment
  });
});
