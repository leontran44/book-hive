const router = require("express").Router();
const { User, Book, Review } = require("../../models");
const withAuth = require("../../utils/auth");

// can only add new reviews if logged in, need debug
router.post("/:id", withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
      book_id: req.params.book_id,
    });

    res.status(200).json(newReview);

    res.render("bookpage", {
      ...newReview,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// can only update reviews if logged in, need debug
router.put("/review/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.update(req.body, {
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

    const review = reviewData.get({ plain: true });
    res.render("bookpage", {
      ...review,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// can only delete reviews if logged in, need debug
router.delete("/review/:id", withAuth, async (req, res) => {
  try {
    const reviewData = await Review.destroy({
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

    const review = reviewData.get({ plain: true });
    res.render("bookpage", {
      ...review,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
