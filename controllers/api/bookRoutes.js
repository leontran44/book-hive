const router = require("express").Router();
const { Book, Review } = require("../../models"); // Import Book and Review models
const withAuth = require("../../utils/auth");

// Route to get a book by id along with its reviews and calculate the average rating
router.get("/:id", async (req, res) => {
  try {
    const bookId = req.params.id;

    // Find the book and include its reviews
    const book = await Book.findByPk(bookId, {
      include: [{ model: Review }],
    });

    if (!book) {
      return res.status(404).json({ message: "Book not found!" });
    }

    // Calculate the average rating
    const totalReviews = book.Reviews.length;
    const totalRating = book.Reviews.reduce((acc, review) => acc + review.rating, 0);
    const averageRating = totalReviews ? totalRating / totalReviews : 0;

    // Render the book page with reviews and average rating
    res.render('bookpage', {
      book,
      reviews: book.Reviews,
      averageRating: averageRating.toFixed(1), // Send average rating as a decimal
      logged_in: req.session.logged_in,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to load book details" });
  }
});

// Add a new review (User must be logged in)
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
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a review (User must be logged in)
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
    console.error(err);
    res.status(500).json(err);
  }
});

// Delete a review (User must be logged in)
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
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
