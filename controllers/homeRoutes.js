const router = require("express").Router();
const { User, Book, Review } = require("../models");
const withAuth = require("../utils/auth");

// Home page (get all books)
router.get("/", async (req, res) => {
  try {
    const bookData = await Book.findAll({
      include: [
        {
          model: Review,
          attributes: ["review_content", "rating"], // Include rating if needed
        },
      ],
      order: [["createdAt", "DESC"]], // Order books by creation date (optional)
    });

    const books = bookData.map((book) => book.get({ plain: true }));

    res.render("homepage", {
      books,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errorpage", {
      message: "Failed to load books",
      error: err,
    }); // User-friendly error handling
  }
});

// Login page
router.get("/login", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("login");
});

// Signup page
router.get("/signup", (req, res) => {
  if (req.session.logged_in) {
    res.redirect("/profile");
    return;
  }

  res.render("signup");
});

// After a user logs in, they are directed to their profile page
router.get("/profile", withAuth, async (req, res) => {
  try {
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: Review,
          attributes: ["review_content", "rating"], // Include rating here too
          include: [
            {
              model: Book,
              attributes: ["id", "title", "cover_image"],
            },
          ],
        },
      ],
    });

    const user = userData.get({ plain: true });

    // Optional: If you want to map books manually
    const booksMap = {};

    user.reviews.forEach((review) => {
      const bookId = review.book.id;
      if (!booksMap[bookId]) {
        booksMap[bookId] = {
          title: review.book.title,
          id: bookId,
          cover_image: review.book.cover_image,
          reviews: [],
        };
      }
      booksMap[bookId].reviews.push(review);
    });

    const books = Object.values(booksMap);

    res.render("userpage", {
      ...user,
      books, // Pass books to the template
      logged_in: true,
    });
  } catch (err) {
    console.error(err);
    res.status(500).render("errorpage", {
      message: "Failed to load profile",
      error: err,
    });
  }
});

// Open a single book by its `book_id` and its reviews
router.get("/book/:id", async (req, res) => {
  try {
    const bookData = await Book.findByPk(req.params.id, {
      include: [
        {
          model: Review,
          attributes: ["review_content", "rating"], // Include rating here as well
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
    console.error(err);
    res.status(500).render("errorpage", {
      message: "Failed to load book details",
      error: err,
    });
  }
});

module.exports = router;

