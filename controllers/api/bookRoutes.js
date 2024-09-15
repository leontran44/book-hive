const router = require("express").Router();
const { Book, Review, User } = require("../../models");
const withAuth = require("../../utils/auth");

// Route to get a book by id along with its reviews and calculate the average rating
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find the book and include its reviews along with the user who wrote them
    const book = await Book.findByPk(bookId, {
      include: [{ model: Review, include: [User] }], // Make sure User is included if you're displaying user details
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    // Calculate the average rating
    const totalReviews = book.Reviews.length;
    const totalRating = book.Reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalReviews ? (totalRating / totalReviews).toFixed(1) : 0;

    // Pass data to the template
    res.render("bookpage", {
      book: book.get({ plain: true }), // Ensure the book data is passed as a plain object
      reviews: book.Reviews.map(review => review.get({ plain: true })), // Pass reviews as plain objects
      averageRating,
      totalReviews,
      logged_in: req.session.logged_in,
      bookpage: true, // Ensure the bookpage.js loads
      tensorflowRequired: true // Load TensorFlow.js for sentiment analysis
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load book details" });
  }
});

// Route to add a new review (User must be logged in)
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      rating: req.body.rating,
      review_content: req.body.review_content,
      user_id: req.session.user_id,
      book_id: req.params.id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    console.error("Error adding new review:", err);
    res.status(400).json(err);
  }
});

// Route to update a review (User must be logged in)
router.put("/review/:id", withAuth, async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the user who wrote the review can update it
      },
    });

    if (!updatedReview[0]) {
      return res.status(404).json({ message: "No review found with this id or you're not authorized!" });
    }

    res.status(200).json({ message: "Review updated successfully" });
  } catch (err) {
    console.error("Error updating review:", err);
    res.status(500).json(err);
  }
});

// Route to delete a review (User must be logged in)
router.delete("/review/:id", withAuth, async (req, res) => {
  try {
    const deletedReview = await Review.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id, // Ensure only the user who wrote the review can delete it
      },
    });

    if (!deletedReview) {
      return res.status(404).json({ message: "No review found with this id or you're not authorized!" });
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (err) {
    console.error("Error deleting review:", err);
    res.status(500).json(err);
  }
});

module.exports = router;



