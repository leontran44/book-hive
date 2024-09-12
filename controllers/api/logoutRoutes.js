const router = require("express").Router();
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  console.log("Logout route hit!");
  try {
    if (req.session.logged_in) {
      req.session.destroy(() => {
        console.log("Session destroyed!");  // Confirm session destroyed
        res.status(204).end();
      });
    } else {
      res.status(404).end();  // If no session exists
    }
  } catch (err) {
    console.error("Logout error:", err);  // Log any errors
    res.status(500).json({ message: "Failed to log out." });
  }
});

module.exports = router;
