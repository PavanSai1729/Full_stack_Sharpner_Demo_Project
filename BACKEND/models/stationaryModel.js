const Sequelize = require("sequelize");
const db = require("../util/database");

const Item = db.define("stationary", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true 
    },

    itemName: Sequelize.STRING, 

    description: Sequelize.STRING, 

    price: Sequelize.INTEGER,

    quantity: Sequelize.INTEGER,

    
});

module.exports = Item;