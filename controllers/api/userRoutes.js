const router = require("express").Router();
const { User } = require("../../models");
const { Book } = require("../../models");
const withAuth = require("../../utils/auth");

// can only create users if not logged in, and the new user will be added in the user table in datebase
router.post("/signup", async (req, res) => {});

//
router.post("/login", async (req, res) => {});

// after a user logs in, they are directed to their profile page
router.get("/profile/:id", withAuth, async (req, res) => {});

// can only update users if logged in
router.put("/:id", withAuth, async (req, res) => {});

// can only delete users if logged in
router.delete("/:id", withAuth, async (req, res) => {});

module.exports = router;
