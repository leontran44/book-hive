const router = require("express").Router();
const { User } = require("../../models");

// can only create users if not logged in, and the new user will be added in the user table in datebase
router.post("/", async (req, res) => {
  try {
    if (!req.body.username || !req.body.email || !req.body.password) {
      res.status(400).json({ message: "Please fill all blanks." });
      return;
    }

    const existingUser = await User.findOne({
      where: { email: req.body.email },
    });

    if (existingUser) {
      res.status(400).json({ message: "Email already exists." });
      return;
    }

    const newUser = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = newUser.id;
      req.session.logged_in = true;

      res.status(200).json({
        user: newUser,
        message: "You are now logged in!",
      });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
