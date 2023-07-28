const express = require("express");
const { getProducts, getTopProducts } = require("../controllers/Product.js");
const Auth = require("../middleware/AuthMiddleware.js");

const router = express.Router();

router.get("/products", Auth, getProducts);
router.get("/products-top", Auth, getTopProducts);

module.exports = router;
