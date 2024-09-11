const router = require("express").Router();
const userRoutes = require("./userRoutes");
const bookRoutes = require("./bookRoutes");
const loginRoutes = require("./loginRoutes");
const signupRoutes = require("./signupRoutes");
const logoutRoutes = require("./logoutRoutes");

router.use("/user", userRoutes);
router.use("/book", bookRoutes);
router.use("/login", loginRoutes);
router.use("/signup", signupRoutes);
router.use("/logout", logoutRoutes);

module.exports = router;
