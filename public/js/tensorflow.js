document.addEventListener("DOMContentLoaded", async () => {
  console.log("TensorFlow.js loaded");

  const reviewForm = document.querySelector("#review-form");
  const reviewInput = document.querySelector("#review-input");
  const reviewList = document.querySelector("#review-list");

  // Load the TensorFlow toxicity model with a threshold of 0.9
  const threshold = 0.9;
  let model;
  try {
    model = await toxicity.load(threshold);
    console.log("Toxicity model loaded successfully.");
  } catch (error) {
    console.error("Error loading the toxicity model:", error);
    return; // Don't proceed without the model
  }

  // Analyze the review's sentiment when the form is submitted
  reviewForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const reviewText = reviewInput.value.trim();
    if (!reviewText) return;

    // Analyze the review using the loaded model
    let results;
    try {
      results = await model.classify([reviewText]);
      console.log("Review analysis results:", results);
    } catch (error) {
      console.error("Error analyzing the review:", error);
      return;
    }

    // Check if the review contains any toxicity and flag it
    const isToxic = results.some((prediction) => {
      return prediction.results[0].match;
    });

    if (isToxic) {
      alert("Your review contains negative sentiment or inappropriate language. Please revise.");
      return;
    }

    // If the review is not toxic, proceed with submitting it
    const reviewItem = document.createElement("li");
    reviewItem.classList.add("list-group-item");

    // Create a new review element
    const reviewContent = document.createElement("p");
    reviewContent.textContent = reviewText;

    reviewItem.appendChild(reviewContent);
    reviewList.appendChild(reviewItem);

    // Clear the review input after successful submission
    reviewInput.value = "";
  });
});
