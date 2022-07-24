const {Sequelize}=require('sequelize');


const sequelize= new Sequelize('productsdb','root','paruchurisivaprasad',{
    dialect:'mysql',host:'localhost'
})

module.exports=sequelize;