const router = require("express").Router();
const { Book, Review, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to get a book by id along with its reviews and calculate the average rating
router.get("/book/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Fetch the book and associated reviews
    const book = await Book.findByPk(bookId, {
      include: [
        {
          model: Review,
          include: [User],  // Include user details in the reviews
        },
      ],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    // Render the book page, passing necessary flags
    res.render('bookpage', {
      book,
      reviews: book.Reviews,
      logged_in: req.session.logged_in,
      tensorflowRequired: true,  // Flag to load TensorFlow.js
      bookpage: true,  // Flag to load book-specific JS
    });
  } catch (err) {
    console.error("Error loading book details:", err);
    res.status(500).json({ message: "Failed to load book details." });
  }
});

// Route to add a new review (User must be logged in)
router.post("/:id", withAuth, async (req, res) => {
  try {
    const { rating, review_content } = req.body;

    // Parse rating as an integer
    const parsedRating = parseInt(rating, 10);

    // Ensure both rating and review_content are provided and valid
    if (isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5 || !review_content) {
      return res.status(400).json({ message: "Rating must be a number between 1 and 5 and review content is required." });
    }

    // Determine sentiment based on the rating
    let sentiment;
    if (parsedRating <= 2) {
      sentiment = 'Negative';
    } else if (parsedRating === 3) {
      sentiment = 'Neutral';
    } else if (parsedRating >= 4) {
      sentiment = 'Positive';
    } else {
      sentiment = 'Neutral'; // Default sentiment if none of the conditions are met
    }

    console.log(`Rating: ${parsedRating}, Sentiment: ${sentiment}`); // Debugging

    // Create the new review with the calculated sentiment
    const newReview = await Review.create({
      rating: parsedRating,
      review_content,
      user_id: req.session.user_id,
      book_id: req.params.id,
      sentiment // Ensure sentiment is not null
    });

    console.log("Review created successfully: ", newReview); // Debugging

    res.status(201).json(newReview);
  } catch (err) {
    console.error("Error adding new review:", err);
    res.status(500).json({ message: "Failed to add new review." });
  }
});

module.exports = router;
