const router = require("express").Router();
const { Book } = require("../../models");
const withAuth = require("../../utils/auth");

// can only add new review/comment(inside book table) if logged in
router.post("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Book.comments.create({
      ...req.body,
      user_id: req.session.user_id,
      book_id: req.params.book_id,
    });

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// can only update review (or "comments" from book table) to this book if logged in
router.put("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Book.comments.update(req.body, {
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        book_id: req.params.book_id,
      },
    });

    if (!reviewData[0]) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// can only delete review (or "comments" from book table) to this book if logged in
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Book.comments.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
        book_id: req.params.book_id,
      },
    });

    if (!reviewData) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(reviewData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
