const express = require("express");
require("dotenv").config();
const port = process.env.APP_PORT;
const AuthRoute = require("./routes/AuthRoutes.js");

const app = express();

app.use(express.json());
app.use(AuthRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
