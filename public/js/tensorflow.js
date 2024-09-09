// Cache the model after it's loaded to avoid reloading it multiple times
let model;

// Function to load the TensorFlow toxicity model
async function loadModel() {
  if (!model) {
    model = await toxicity.load(0.9); // Load the model with a confidence threshold of 0.9
  }
  return model;
}

// Function to analyze sentiment of input text and color stars based on the toxicity score
// Parameters:
//  - text: User input text (e.g., a review)
//  - starElements: DOM elements representing the stars in the UI
async function analyzeSentiment(text, starElements) {
  // Check if the input text is empty
  if (!text) {
    console.error('Text input is empty!'); // Handle the case of empty input text
    return;
  }

  // Load the toxicity model
  const model = await loadModel();

  // Use the model to classify the input text and return predictions
  const predictions = await model.classify([text]);

  // Calculate the toxic score by counting the number of toxic matches
  const toxicScore = predictions.reduce((score, prediction) =>
    prediction.results[0].match ? score + 1 : score, 0
  );

  // Color the stars based on the toxic score
  starElements.forEach(function(star) {
    if (toxicScore === 0) {
      // If there is no toxicity, make the stars green (positive sentiment)
      star.style.color = 'green';
    } else if (toxicScore <= 3) {
      // If the toxicity score is between 1 and 3, make the stars yellow (neutral/mixed sentiment)
      star.style.color = 'yellow';
    } else {
      // If the toxicity score is greater than 3, make the stars red (negative sentiment)
      star.style.color = 'red';
    }
  });
}