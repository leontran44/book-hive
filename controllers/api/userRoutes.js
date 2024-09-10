const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// can only create users if not logged in, and the new user will be added in the user table in datebase
router.post("/signup", async (req, res) => {
  try {
    const userData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.status(200).json(userData);
    });

    res.render("userpage", {
      ...userData,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// login, then redirect to user's profile page
router.post("/login", async (req, res) => {
  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res.status(400).json({ message: "Incorrect email, please try again" });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "Incorrect password, please try again" });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.render("userpage", {
        ...userData,
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// can only update users if logged in, need debug
router.put("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (!userData[0]) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);

    const user = userData.get({ plain: true });

    res.render("userpage", {
      ...user,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// can only delete users if logged in, need debug
router.delete("/:id", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json(userData);

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
