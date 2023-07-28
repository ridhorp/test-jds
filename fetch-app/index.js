const express = require("express");
require("dotenv").config();
const ProductRoute = require("./routes/ProductRoutes.js");

const app = express();
app.use(express.json());
app.use(ProductRoute);

app.listen(process.env.APP_PORT, () => {
  console.log(`Example app listening on port ${process.env.APP_PORT}`);
});
