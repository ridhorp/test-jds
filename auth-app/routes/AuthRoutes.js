const express = require("express");
const { register, login, me } = require("../controllers/Auth.js");
const Auth = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", Auth, me);

module.exports = router;
