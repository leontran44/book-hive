const router = require("express").Router();
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// can only add new review if logged in
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
      book_id: req.params.id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

// can only update review to this book if logged in
router.put("/review", withAuth, async (req, res) => {
  try {
    const updatedReview = await Review.update(req.body, {
      where: {
        id: book_id,
      },
    });

    if (!updatedReview) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(updatedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

// can only delete review to this book if logged in
router.delete("/review", withAuth, async (req, res) => {
  try {
    const deletedReview = await Review.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedReview) {
      res.status(404).json({ message: "No review found with this id!" });
      return;
    }

    res.status(200).json(deletedReview);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
