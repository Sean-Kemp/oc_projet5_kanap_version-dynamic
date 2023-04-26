

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
        //console.log(product)
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
   if (productObject.color == false && (productObject.quantity == 0 || productObject.quantity > 100)) {
        alert("* Veuillez sélectionner une couleur et une quantité entre 0 et 100.");
        /*const colorField = document.getElementById("colors");
        colorField.style.border = "1.5px Solid #f33";
        const quantityField = document.getElementById("quantity");
        quantityField.style.border = "1.5px Solid #f33";
        let alertGeneral = document.createElement('p');
        let quantityContainer = document.getElementById('quantityField');
        alertGeneral.textContent = "* Veuillez sélectionner une couleur et une quantité."
        alertGeneral.style.color = "#f33";
        alertGeneral.style.fontSize = "15px";
        alertGeneral.classList.add("alert")
        quantityContainer.appendChild(alertGeneral);
        quantityContainer.classList.add("alertParent")*/
   } else if (productObject.color == false) {
        alert("* Veuillez sélectionner une couleur.");
        /*const colorField = document.getElementById("colors");
        colorField.style.border = "1.5px Solid #f33";
        let alertColor = document.createElement('p');
        let colorContainer = document.getElementById('colorField');
        alertColor.textContent = "* Veuillez sélectionner une couleur."
        alertColor.style.color = "#f33";
        alertColor.style.fontSize = "15px";
        alertColor.classList.add("alert")
        colorContainer.appendChild(alertColor);
        colorContainer.classList.add("alertParent")*/
   } else if (productObject.quantity == 0 || productObject.quantity > 100) {
        alert("* Veuillez sélectionner une quantité entre 0 et 100.");
        /*const quantityField = document.getElementById("quantity");
        quantityField.style.border = "1.5px Solid #f33";
        let alertQuantity = document.createElement('p');
        let quantityContainer = document.getElementById('quantityField');
        alertQuantity.textContent = "* Veuillez sélectionner une quantité."
        alertQuantity.style.color = "#f33";
        alertQuantity.style.fontSize = "15px";
        alertQuantity.classList.add("alert")
        quantityContainer.appendChild(alertQuantity);
        quantityContainer.classList.add("alertParent")*/
    } else {
    if (localStorage.getItem("cartArray") !== null) {
        const quantityField = document.getElementById("quantity");
        const colorField = document.getElementById("colors");
        quantityField.style.border = "0px";
        colorField.style.border = "0px";
        let existingProducts = JSON.parse(localStorage.getItem("cartArray"));
        for (let i = 0; i < existingProducts.length; i++) {
            let existingProductColor = existingProducts[i].color;
            let existingProductQuantity = existingProducts[i].quantity;
            let existingProductId = existingProducts[i].id;
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
}
});

// TO ADD TO CART

// 1. IDENTIFY LOCATION OF HTML TO ADD EVENT LISTENER (AS ABOVE)
// 2. ADD EVENT LISTENER ON CLICK
// 3. FUNCTION : CREATION OF OBJECT THAT WILL THEN BE ADDED TO ARRAY
// 4. CREATION OF ARRAY
// 5. IF PRODUCT IS NOT ALREADY PREASENT IN PANIER, WE ADD NEW OBJECT TO ARRAY. 
// 6. ELSE IF PRODUCT IS ALREADY PRESENT IN PANIER, WE INCREMENT THE QUANTITY OF THE PRODUCT.*/