const Sequelize = require("sequelize");

const db = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, "", {
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
});

module.exports = db;
