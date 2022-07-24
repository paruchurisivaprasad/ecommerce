const Sequelize = require("sequelize");

const sequelize = require("./database");

const Order = sequelize.define("order", {
  
    productid:{
        type:Sequelize.STRING,
        allowNull:false
    }
});

module.exports = Order;
