let yourorders = document.querySelector(".yourorders");

document.addEventListener('DOMContentLoaded',()=>{

    axios.get("http://localhost:1111/ordered")
    .then(result=>{
        
        yourorders.innerHTML=result.data[0].productid;
    })
    .catch(err=>{
        console.log(err);
    })
})