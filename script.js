/** 
 * Products: 
 * =========
 * categories? brand
 * price
 * name
 * description
 * availability
 * details (materials, how to clean, size, etc.)
 * image
 * product_id
 * 
 * AddToCart:
 * ==========
 * product_id
 * amount / quantity
 */

 const cart = [];
 const products = [
     {
         p_id: 1,
         p_name: "Retro",
         p_desc: "White bottle in retro style",
         p_price: 99.95,
         p_in_stock: true,
         p_brand: "24 bottles",
         p_img: "img/bottle-white.jpg", 
         p_details: {
             volume: 0.5,
             material: "stainless steel"
         }
     },
     {
         p_id: 2,
         p_name: "Camouflage",
         p_desc: "Stylish bottle in camouflage green",
         p_price: 89.75,
         p_in_stock: true,
         p_brand: "Cornucopia",
         p_img: "img/bottle-green.jpg", 
         p_details: {
             volume: 0.5,
             material: "stainless steel"
         }
     },
     {
         p_id: 3,
         p_name: "Hooks",
         p_desc: "Grey bottle with practical hook",
         p_price: 9.95,
         p_in_stock: false,
         p_brand: "Sigg",
         p_img: "img/bottle-grey.jpg", 
         p_details: {
             volume: 0.5,
             material: "stainless steel"
         }
     },
     {
         p_id: 4,
         p_name: "Stylish",
         p_desc: "Very stylish but affordable bottle",
         p_price: 49.95,
         p_in_stock: true,
         p_brand: "Ok.-",
         p_img: "img/bottle-white-2.jpg", 
         p_details: {
             volume: 0.6,
             material: "stainless steel"
         }
     },
     {
         p_id: 5,
         p_name: "Natural",
         p_desc: "Bottle in beautiful wooden look",
         p_price: 120.00,
         p_in_stock: true,
         p_brand: "Luxury bottle",
         p_img: "img/bottle-wood.jpg", 
         p_details: {
             volume: 0.6,
             material: "stainless steel"
         }
     }
 ];
 
 //dynamically add products to DOM, only in_stock products
 //create unordered list and add a list item per product
 //add relevant object information to list item: p_id, p_name, p_desc, p_img, p_price
 //add button to add product to cart
 
 const article = document.querySelector("article");
 //do we have products?
 let p_counter = 0;
 
 products.forEach(function(product){
     if(product.p_in_stock){
         p_counter++;
     }
 });
 
 //in case all products are out of stock, add message "Currently all products are out of stock. Please come back in a few days."
 if(p_counter === 0){
     const msg = document.createElement("p");
     article.appendChild(msg);
 
     msg.textContent = "Currently all products are out of stock. Please come back in a few days.";
 } else {
     const list = document.createElement("ul");
     article.appendChild(list);
 
     products.forEach(function(product){
         if(product.p_in_stock){
             let item = document.createElement("li");
             if(product.p_price < 50){
                 item.setAttribute("data-filter","cheap");
             } else if(product.p_price < 100){
                 item.setAttribute("data-filter","average");
             } else if(product.p_price < 150){
                 item.setAttribute("data-filter","expensive");
             } else {
                 item.setAttribute("data-filter","luxury");
             }
             list.appendChild(item);
 
             let link = document.createElement("a");
             link.setAttribute("href","en/shop.html?detail="+product.p_name.toLowerCase());
             item.appendChild(link);
             
             let img = document.createElement("img");
             img.setAttribute("src", product.p_img);
             img.setAttribute("alt", product.p_desc);
             link.appendChild(img);
 
             let title = document.createElement("h4");
             title.setAttribute("class","arw");
             title.textContent = product.p_name;
             link.appendChild(title);
 
             let price = document.createElement("p");
             price.textContent = "CHF " + product.p_price.toFixed(2).replace(".00",".-");
             link.appendChild(price);
 
             let btn = document.createElement("button");
             btn.textContent = "Add to cart";
             item.appendChild(btn);
 
             btn.addEventListener("click",function(){
                 updateCart(product.p_id, 1);
             });
         }
     });
 }
 
 let filterButtons = document.querySelectorAll("article > button");
 
 filterButtons.forEach(function(button){
     button.addEventListener("click",function(){
         let items = document.querySelectorAll("article ul li");
         
         items.forEach(function(item){
             item.classList.remove("visuallyhidden");
 
             switch(button.getAttribute("id")){
                 case "cheap":
                     if(item.getAttribute("data-filter") !== "cheap"){
                         item.classList.add("visuallyhidden");
                     }
                     break;
                 case "average":
                     if(item.getAttribute("data-filter") !== "cheap" &&item.getAttribute("data-filter") !== "average"){
                         item.classList.add("visuallyhidden");
                     }
                     break;
                 case "expensive":
                     if(item.getAttribute("data-filter") === "luxury"){
                         item.classList.add("visuallyhidden");
                     }
                     break;
             }
         });
     });
 });
 /*
 let filterCheapBottles = document.querySelector("#cheap");
 let filterAverageBottles = document.querySelector("#average");
 let filterExpensiveBottles = document.querySelector("#expensive");
 
 filterCheapBottles.addEventListener("click", function(){
     let items = document.querySelectorAll("article ul li");
     items.forEach(function(item){
         item.classList.remove("visuallyhidden");
         if(item.getAttribute("data-filter") !== "cheap"){
             item.classList.add("visuallyhidden");
         }
     });
 });
 filterAverageBottles.addEventListener("click", function(){
     let items = document.querySelectorAll("article ul li");
     items.forEach(function(item){
         item.classList.remove("visuallyhidden");
         if(item.getAttribute("data-filter") !== "cheap" && item.getAttribute("data-filter") !== "average"){
             item.classList.add("visuallyhidden");
         }
     });
 });
 filterExpensiveBottles.addEventListener("click", function(){
     let items = document.querySelectorAll("article ul li");
     items.forEach(function(item){
         item.classList.remove("visuallyhidden");
         if(item.getAttribute("data-filter") === "luxury"){
             item.classList.add("visuallyhidden");
         }
     });
 });
 */ 
 
 function updateCart(product_id,product_quantity = 1){
     //if cart already contains id > update quantity
     //loop through our cart
     // for each item in cart check if id already exists
     // if it exits, then increment quantity of that item 
     let updated = false;
 
     cart.forEach(function(cartItem){
         if(cartItem.id === product_id){
             cartItem.quantity++;
             updated = true;
         } 
     });
 
     if(!updated){
         cart.push({
             id: product_id,
             quantity: product_quantity
         });
     }
 
     console.table(cart);
 }