const Sequelize = require("sequelize");

const sequelize = require("./database");

const Cart = sequelize.define("cartitem", {
  
  productname: {
    type: Sequelize.STRING,
    allowNull: false,
  },

  productimage: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  productprice: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }
});

module.exports = Cart;
