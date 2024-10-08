const router = require("express").Router();
const { User } = require("../../models");
const withAuth = require("../../utils/auth");

// can only update user (user's name, email) if logged in
router.put("/", withAuth, async (req, res) => {
  try {
    const userData = await User.update(
      {
        username: req.body.username,
        email: req.body.email,
      },
      {
        individualHooks: true,
        where: {
          id: req.session.user_id,
        },
      }
    );

    if (!userData[0]) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    res.status(200).json({ message: "User updated successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// can only delete user account if logged in
router.delete("/", withAuth, async (req, res) => {
  try {
    const userData = await User.destroy({
      where: {
        id: req.session.user_id,
      },
    });

    if (!userData) {
      res.status(404).json({ message: "No user found with this id!" });
      return;
    }

    req.session.destroy((err) => {
      if (err) {
        res
          .status(500)
          .json({
            message: "Failed to destroy session after deleting account.",
          });
        return;
      }

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
