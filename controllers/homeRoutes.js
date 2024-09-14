const router = require("express").Router();
const { User, Book, Review } = require("../models");
const withAuth = require("../utils/auth");

// home page (get all books)
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Review,
          attributes: ["review_content"],
        },
      ],
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

// after a user logs in, they are directed to their profile page
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Review,
          attributes: ["review_content"],
          include: [
            {
              model: Book,
              attributes: ["id", "title"],
            },
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });

    const booksMap = {};

    user.reviews.forEach((review) => {
      const bookId = review.book.id;
      if (!booksMap[bookId]) {
        booksMap[bookId] = {
          title: review.book.title,
          id: bookId,
          reviews: [],
        };
      }
      booksMap[bookId].reviews.push(review);
    });

    const books = Object.values(booksMap);

    res.render("userpage", {
      ...user,
      books,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// open a single book by its `book_id` and it's reviews
router.get("/book/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: ["review_content"],
          include: [
            {
              model: User,
              attributes: ["username"],
            },
          ],
        },
      ],
    });

    const book = bookData.get({ plain: true });

    res.render("bookpage", {
      ...book,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
