const { Sequelize } = require("sequelize");

const db = new Sequelize("practice", "root", "Pavan@1729", {
    dialect: "mysql",
    host: "localhost"
});

module.exports = db;