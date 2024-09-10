const router = require("express").Router();
const { User, Book, Review } = require("../models");
const withAuth = require("../utils/auth");

// home page (get all books)
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll();
    const books = bookData.map((book) => book.get({ plain: true }));
    res.render("homepage", { books });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/user/:id");
    return;
  }

  res.render("login");
});

// signout page
router.get("/signout", (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  }

  res.render("signout");
});

// open a single book by its `book_id` and it's reviews
router.get("/books/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          include: {
            model: User,
            attributes: ["username"],
          },
        },
      ],
    });

    const book = bookData.get({ plain: true });

    res.render("bookpage", {
      ...book,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get all users
router.get("/users", async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ["password"] },
      order: [["name", "ASC"]],
    });
    const users = userData.map((user) => user.get({ plain: true }));

    res.render("users", { users });
  } catch (err) {
    res.status(500).json(err);
  }
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

module.exports = router;
