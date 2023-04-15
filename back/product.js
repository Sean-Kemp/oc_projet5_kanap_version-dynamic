

const productURL = window.location.href;
const str = productURL;
const url = new URL(str);
const id = url.searchParams.get("id");

const api = `http://localhost:3000/api/products/${id}`

const getProduct = () => {
    fetch(api)
    .then(function (res) {
        return res.json()
    })
    //first we call the api 
    //returns in json format
    .then(function (product) {
        console.log(product)
        //prints array to console
        const productTitle = document.getElementById("title");
        productTitle.textContent = product.name;
        const productPrice = document.getElementById("price");
        productPrice.textContent = product.price;
        const productDescription = document.getElementById("description");
        productDescription.textContent = product.description;
        const productImage = document.createElement("img");
        productImage.setAttribute("src", `${product.imageUrl}`);
        productImage.setAttribute("alt", `${product.altTxt}`);
        const itemImage = document.getElementsByClassName("item__img");
        itemImage[0].appendChild(productImage);
        const productColor = document.getElementById("colors");
        for (color in product.colors) {
            productColor.innerHTML += `<option value="${product.colors[color]}">${product.colors[color]}</option>`
        }
    })
}

getProduct();

const colorOptions = document.querySelector("#colors");
const getProductQuantity = document.querySelector("#quantity");

const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
    let productObject = { 
        quantity : document.getElementById("quantity").value,
        color : document.getElementById("colors").value,
        id : id
    };
   let cartArray = []
   let arrayHasBeenModified = 0;
    if (localStorage.getItem("cartArray") !== null) {
        let existingProducts = JSON.parse(localStorage.getItem("cartArray"));
        console.log(existingProducts);
        for (let i = 0; i < existingProducts.length; i++) {
            let existingProductColor = existingProducts[i].color;
            let existingProductQuantity = existingProducts[i].quantity;
            let existingProductId = existingProducts[i].id;
            console.log(existingProductColor, productObject.color, existingProductId, productObject.id)
            if(existingProductId === productObject.id && existingProductColor === productObject.color) {
                let newQuantity = parseInt(existingProductQuantity) + parseInt(productObject.quantity);
                let newQuantityString = newQuantity.toString();
                cartArray.push({
                    quantity : newQuantityString,
                    color : existingProductColor,
                    id : existingProductId
                });
                arrayHasBeenModified = 1;
            } else {
                cartArray.push(existingProducts[i])
                
            }   
        }
        if(arrayHasBeenModified == 0) {
            cartArray.push(productObject)
        }
    localStorage.setItem('cartArray', JSON.stringify(cartArray))
    } else if(localStorage.getItem("cartArray") === null) {
        cartArray.push(productObject)
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
    }
});

// TO ADD TO CART

// 1. IDENTIFY LOCATION OF HTML TO ADD EVENT LISTENER (AS ABOVE)
// 2. ADD EVENT LISTENER ON CLICK
// 3. FUNCTION : CREATION OF OBJECT THAT WILL THEN BE ADDED TO ARRAY
// 4. CREATION OF ARRAY
// 5. IF PRODUCT IS NOT ALREADY PREASENT IN PANIER, WE ADD NEW OBJECT TO ARRAY. 
// 6. ELSE IF PRODUCT IS ALREADY PRESENT IN PANIER, WE INCREMENT THE QUANTITY OF THE PRODUCT.*/