
  let inc = document.querySelector(".inc");

  let cartcount = document.querySelector("#cartcount");

  let homepagenav = document.querySelector("#navlink2");

  let checkthecart = document.querySelector(".checkthecart");
  let weolcomemsg = document.querySelector(".welcomemsg");
  let cartlists = document.querySelector(".cartlists");

  let container = document.getElementById("alertpopup");

  let listofproducts = document.querySelector(".listofproducts");

  let showcartitems = document.querySelector(".cartshow2");
let totalcartcost = document.querySelector(".totalcartcost");
let cartshow=document.querySelector('.cartshow');
let cartIMAGE=document.querySelector('.cartimag');
let fashoppingcart = document.querySelector(".fa-shopping-cart");

let addToCart=document.querySelector('.addtocart');

let btn1=document.getElementById('?page=0');

let paginations=document.querySelector('.paginations');
let choosebtn=document.querySelector('.sbtn');


let bala=false;
paginations.addEventListener('click',getAllProducts);


bala=true;

function getAllProducts(e) {

  


  if (
    e.target.id == "?page=0" ||
    e.target.id == "?page=1" ||
    e.target.id == "?page=2" ||
    e.target.id == "?page=3" ||
    e.target.id == "?page=4" 
  ) {
    axios
      .get(`http://localhost:1111/allproducts${e.target.id}`)
      .then((result) => {
        console.log(result);

        let res = "";
        for (let i = 0; i < result.data.length; i++) {
          res += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;" class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
        }

        listofproducts.innerHTML = res;
        
      })
      .catch((err) => {
        console.log(err);
      });
  }


  
};

function getallcartitems(){
  axios.get("http://localhost:1111/allcart")
  .then(items=>{
    let totalcart = "";
    let tprice = 0;
    cartcount.innerHTML = items.data.length;

    for (let i = 0; i < items.data.length; i++) {
      tprice += items.data[i].productprice;
      totalcart += `

 <div class="singler mt-2" id=${items.data[i].id}>

 <span style="font-size: 15px; width:10vw;   text-transform: uppercase;  margin-left: 5px; width:10vw; ">${
   items.data[i].productname
 }</span>

 <span style="font-size: 20px; margin-left: 60px; ">${
   items.data[i].productprice
 }</span>

 <input style="width:40px; margin-left:80px;" value=${1} disabled>

 <button class="removeTheItem" style="float:right; border:none;   margin-right:10px; background:red; padding:8px; color:white; border-radius:11px; ">REMOVE ITEM</button>

</div>

<hr style="    border-bottom: 2px dotted #999;">`;
    }
      totalcartcost.innerHTML=tprice;

    showcartitems.innerHTML = totalcart;
  })
  .catch(err=>{
    console.log(err);
  })
}


document.addEventListener('DOMContentLoaded',(e)=>{
axios
  .get(`http://localhost:1111/allproducts${'?page=0'}`)
  .then((result) => {
    console.log(result);

    let res = "";
    for (let i = 0; i < result.data.length; i++) {
      res += `
<div class="col-4 singleproduct  mt-4" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;"  class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
    }

    listofproducts.innerHTML = res;
  })
  .catch((err) => {
    console.log(err);
  });

  getallcartitems()


})




listofproducts.addEventListener('click',(e)=>{

if(e.target.classList.contains('addtocart')){

    let targetparent = e.target.parentElement;

    let cartPrice=targetparent.querySelector('.cartprice').innerText;
        let cartImage=targetparent.querySelector(".cartimag").src

            let cartName=targetparent.querySelector(".cartname").innerText;

          let obj1=  {
           productname: cartName,
                     productimage: cartImage,

          productprice: cartPrice
          }

          axios
            .post("http://localhost:1111/cart", obj1)
            .then((result) => {
              console.log(result);
              getallcartitems();
               AlertItem(e);
            })
            .catch((err) => {
              console.log(err);
            });
}
});




// function getAllLocal(){
//     let totalPrice = 0;


//     let totalCart='';
//   let localKeys = Object.keys(localStorage);
//   cartcount.innerHTML=localKeys.length

//   for (let i of localKeys) {
//     let localvalues = JSON.parse(localStorage[i]);
//     let localquantity=Number(localvalues.count)
// let parsetoint=Number(localvalues.cartPrice*localquantity);

// totalPrice+=parsetoint;

// totalCart += `

// <div class="singler mt-2" id=${localvalues.cartId}>

// <span style="font-size: 15px; width:10vw;  margin-left: 5px; width:10vw; ">${localvalues.cartName}</span>

// <span style="font-size: 20px; margin-left: 60px; ">${localvalues.cartPrice}</span>

// <input style="width:40px; margin-left:80px;" value=${localvalues.count} disabled>

// <button class="removeTheItem" style="float:right; border:none;   margin-right:10px; background:red; padding:8px; color:white; border-radius:11px; ">REMOVE ITEM</button>

// </div>

// <hr style="    border-bottom: 2px dotted #999;">

// `;
//   }

//   totalcartcost.innerHTML=totalPrice;

//   showcartitems.innerHTML=totalCart;


// }

// getAllLocal();


// listofproducts.addEventListener('click',(e)=>{

// if(e.target.classList.contains('addtocart')){

//     let targetparent = e.target.parentElement;

//     let cartPrice=targetparent.querySelector('.cartprice').innerText;
//         let cartImage=targetparent.querySelector(".cartimag").src

//             let cartName=targetparent.querySelector(".cartname").innerText;
                    
//                 let cartId=          targetparent.id;
                        


//                        if(localStorage[cartId]){

//                  let parsetotal = Number(JSON.parse(localStorage[cartId]).count);
//                     let parseitemtotal = Number(JSON.parse(localStorage[cartId]).cartPrice);

//                   let countcount=++parsetotal;

//                             console.log( Number(e.target.parentElement.querySelector('.cartprice').innerText));

//                   console.log(countcount);

//                          let obj = {
//                            cartId: cartId,
//                            cartName: cartName,
//                            cartImage: cartImage,
//                            cartPrice: cartPrice,
//                            count: countcount
//                          };

//                          localStorage.setItem(cartId, JSON.stringify(obj));



//                        }

//                        else{

//                          let obj = {
//                            cartId: cartId,
//                            cartName: cartName,
//                            cartImage: cartImage,
//                            cartPrice: cartPrice,
//                            count: 1
//                          };

//                          localStorage.setItem(cartId, JSON.stringify(obj));
// let ads=new Audio('productaddedtothecart.mp3');

// ads.play()
//                        }
//  getAllLocal()



//     AlertItem(e);
// }
    
// showcartitems.innerHTML = singleItemtoCart;
// console.log(singleItemtoCart);

// });


//   END OF POST PRODUCT

function AlertItem(e)
{
let name = e.target.parentElement.querySelector(".cartname").innerText;
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.innerHTML = `<h6>${name} is added to the cart</h6>`;
  container.appendChild(notification);
  setTimeout(() => {
    notification.remove();
  }, 2800);


}



showcartitems.addEventListener('click',(e)=>{
  let idf=e.target.parentElement.id;

        if(e.target.classList.contains('removeTheItem')){


          axios.delete(`http://localhost:1111/deletecartitem/${idf}`)
          .then(result=>{
            console.log(result);
            getallcartitems();
          })
          .catch(err=>{
            console.log(err);
          })
        }



})


cartshow.addEventListener('click',(e)=>{

if (e.target.classList.contains("closingTheCart")) {
  cartshow.style.display = "none";
  let clo = new Audio("cartclosed.mp3");

  clo.play();
}

if(e.target.classList.contains('purchaseItem')){
    let pur=new Audio('purchasesuc.mp3');
    pur.play();
    alert("purchase is successful ! thank you")
}
})


fashoppingcart.addEventListener('click',()=>{
    cartshow.style.display='block';
    let dbs=new Audio('cartopened.mp3');
    dbs.play();
});

//  remove cart item









//   choose btn




choosebtn.addEventListener('click',(e)=>{


  // phone products
  
if (
  e.target.id == "phoneid"
) {

  axios
    .get(`http://localhost:1111/chooseproduct`)
    .then((result) => {
      console.log(result);


      let ram = "";
      for (let i = 0; i < result.data.length; i++) {

   if(result.data[i].productcat=='phones'){
        ram += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;" class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
      }
   }

      listofproducts.innerHTML = ram;
   
    })
    .catch((err) => {
      console.log(err);
    });
}

// gloasry items

if (e.target.id == "glosaryid") {
  axios
    .get(`http://localhost:1111/chooseproduct`)
    .then((result) => {
      console.log(result);

      let ram = "";
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].productcat == "glosary") {
          ram += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;" class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
        }
      }

      listofproducts.innerHTML = ram;
    })
    .catch((err) => {
      console.log(err);
    });
}

// tvs


if (e.target.id == "tvid") {
  axios
    .get(`http://localhost:1111/chooseproduct`)
    .then((result) => {
      console.log(result);

      let ram = "";
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].productcat == "tvs") {
          ram += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style=" text-transform: uppercase;"  class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
        }
      }

      listofproducts.innerHTML = ram;
    })
    .catch((err) => {
      console.log(err);
    });
}

//laptops 


if (e.target.id == "laptopid") {
  axios
    .get(`http://localhost:1111/chooseproduct`)
    .then((result) => {
      console.log(result);

      let ram = "";
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].productcat == "laptops") {
          ram += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;" class="text-center  cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
        }
      }

      listofproducts.innerHTML = ram;
    })
    .catch((err) => {
      console.log(err);
    });
}

// book id

if (e.target.id == "bookid") {
  axios
    .get(`http://localhost:1111/chooseproduct`)
    .then((result) => {
      console.log(result);

      let ram = "";
      for (let i = 0; i < result.data.length; i++) {
        if (result.data[i].productcat == "books") {
          ram += `
<div class="col-4 singleproduct mx-5 mt-3" id=${result.data[i].id}>
  <h6 style="  text-transform: uppercase;" class="text-center cartname">${result.data[i].productname}</h6>

  <img class="cartimag" src=${result.data[i].productimage} alt="" srcset="" />
  <h4 class="cartprice">${result.data[i].productprice}</h4>

  <button class="text-white addtocart" id=${result.data[i].id}>ADD TO CART</button>
</div>
      `;
        }
      }

      listofproducts.innerHTML = ram;
    })
    .catch((err) => {
      console.log(err);
    });
}



})




