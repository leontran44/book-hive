const router = require("express").Router();
const { User } = require("../../models");

router.post("/", async (req, res) => {
  console.log("Request body:", req.body);  // Log the request body to inspect it

  try {
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      return res.status(400).json({ message: "Incorrect email, please try again" });
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password, please try again" });
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      return res.json({ user: userData, message: "You are now logged in!" });
    });
  } catch (err) {
    console.error("Error during login:", err);  // Log server errors
    res.status(400).json(err);
  }
});

module.exports = router;




