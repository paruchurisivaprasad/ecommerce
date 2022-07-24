const express=require('express');

const app=express();

const cors=require('cors');
const bodyParser=require('body-parser');
const sequelize=require('./model/database');
const Product=require('./model/Products');
const Cart=require('./model/cart');
const Order=require('./model/order');

app.use(cors());

app.use(bodyParser.json());



app.post('/addproducts',(req,res)=>{


const { productname,productimage, productprice, productdescription, productcat } = req.body;    

    Product.create({
      productname,
      productimage,
      productprice,
      productdescription,
      productcat,
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });  
    

});

app.post('/cart',(req,res)=>{

    const {
      productname,
      productimage,
      productprice
    } = req.body;  
    
    Cart.create({
      productname,
      productimage,
      productprice
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.json(err);
      });  
    


});

// get all cart items api


app.get('/allcart',(req,res)=>{

    Cart.findAll()
    .then(items=>{
        res.json(items)
    })
    .catch(err=>{
        res.json(err)
    })
});


//  get all products api
app.get('/allproducts',(req,res)=>{

    let page=req.query.page;
    
    // let limit=req.query;
    let lim=6;
    Product.findAll({limit:6,offset:page*lim}).then(products=>{
        res.json(products)
    }).catch(err=>{
        res.json(err)
    })
});

app.get("/chooseproduct", (req, res) => {

  Product.findAll()
    .then((products) => {
      res.json(products);
    })
    .catch((err) => {
      res.json(err);
    });
});


app.delete('/deletecartitem/:id',(req, res) => {
  let cartid = req.params.id;

  console.log(cartid);

      Cart.destroy({where:{id:cartid}})
      .then(result=>{
          res.json(result);
      })
      .catch(err=>{
          res.json(err)
      })
})



app.post('/ordernow',(req,res)=>{

  let {productid}=req.body;

  console.log(productid);

  Order.create({
    productid
  })
  .then(result=>{
    res.json({result,msg:true})
  })
  .catch(err=>{
res.json(err)  })

});

app.delete('/deleteallcart',(req,res)=>{


  Cart.truncate()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => {
      res.json(err);
    });
})

app.get('/ordered',(req,res)=>{


  Order.findAll()
  .then(result=>{
res.json(result)
  })
  .catch(err=>{
res.json(err);
  })
})


sequelize.sync().then(result=>{
    // console.log(result);
     app.listen(1111,()=>{
         console.log(' listening at 1111 port ');
     });
     
 }).catch(err=>{
     console.log(err);
 })
 
 





