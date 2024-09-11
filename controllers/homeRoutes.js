const router = require("express").Router();
const { User, Book, Genre } = require("../models");
const withAuth = require("../utils/auth");

// home page (get all books)
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Genre,
          attributes: ["name"],
        },
      ],
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect(`/user/${req.session.user_id}`);
    return;
  }

  res.render("login");
});

// signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect(`/user/${req.session.user_id}`);
    return;
  }

  res.render("signup");
});

// after a user logs in, they are directed to their profile page
router.get("/user/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Book,
          attributes: ["title"],
        },
      ],
    });

    const user = userData.get({ plain: true });

    res.render("userpage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// open a single book by its `book_id` and it's reviews
router.get("/books/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Genre,
          attributes: ["name"],
        },
        {
          model: User,
          attributes: ["username"],
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
