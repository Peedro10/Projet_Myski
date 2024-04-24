const express = require("express");
const { getUser } = require("../controllers/user.cjs");
const router = express.Router();

router.get("/find/:userId", getUser);

module.exports = router;
