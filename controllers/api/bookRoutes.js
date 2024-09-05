const router = require("express").Router();
const { User } = require("../../models");
const { Book } = require("../../models");
const { Review } = require("../../models");
const withAuth = require("../../utils/auth");

// can only add new comments if logged in
router.post("/:book_id", withAuth, async (req, res) => {});

// can only delete comments if logged in
router.delete("/:book_id/:review_id", withAuth, async (req, res) => {});

module.exports = router;
