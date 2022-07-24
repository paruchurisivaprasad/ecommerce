
const Sequelize=require('sequelize');

const sequelize=require('./database');

const Product = sequelize.define("product", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  productname: {
    type: Sequelize.STRING,
    allowNull: false
  },

  productimage: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productprice: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productdescription: {
    type: Sequelize.STRING,
    allowNull: false
  },
  productcat: {
    type: Sequelize.STRING,
    allowNull: false
  },
});

module.exports=Product;

