

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
        //alert("* Veuillez sélectionner une couleur et une quantité entre 0 et 100.");
        const colorField = document.getElementById("colors");
        colorField.style.border = "1.5px Solid #f33";
        const quantityField = document.getElementById("quantity");
        quantityField.style.border = "1.5px Solid #f33";
        let alertGeneral = document.createElement('p');
        let quantityContainer = document.getElementById('quantityField');
        alertGeneral.textContent = "* Veuillez sélectionner une couleur et une quantité entre 0 et 100."
        alertGeneral.style.color = "#fbbcbc";
        alertGeneral.style.fontSize = "15px";
        alertGeneral.classList.add("alert")
        quantityContainer.appendChild(alertGeneral);
        quantityContainer.classList.add("alertParent");
        clearErrors(alertGeneral);

   } else if (productObject.color == false) {
        //alert("* Veuillez sélectionner une couleur.");
        const colorField = document.getElementById("colors");
        colorField.style.border = "1.5px Solid #f33";
        let alertColor = document.createElement('p');
        let colorContainer = document.getElementById('colorField');
        alertColor.textContent = "* Veuillez sélectionner une couleur."
        alertColor.style.color = "#fbbcbc";
        alertColor.style.fontSize = "15px";
        alertColor.classList.add("alert")
        colorContainer.appendChild(alertColor);
        colorContainer.classList.add("alertParent");
        clearErrors(alertColor);
   } else if (productObject.quantity == 0 || productObject.quantity > 100) {
        //alert("* Veuillez sélectionner une quantité entre 0 et 100.");
        const quantityField = document.getElementById("quantity");
        quantityField.style.border = "1.5px Solid #f33";
        let alertQuantity = document.createElement('p');
        let quantityContainer = document.getElementById('quantityField');
        alertQuantity.textContent = "* Veuillez sélectionner une quantité entre 0 et 100."
        alertQuantity.style.color = "#fbbcbc";
        alertQuantity.style.fontSize = "15px";
        alertQuantity.classList.add("alert")
        quantityContainer.appendChild(alertQuantity);
        quantityContainer.classList.add("alertParent");
        clearErrors(alertQuantity);
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
    //alert("Le produit a été ajouté au panier.");
    const productInfoContainer = document.getElementById("productInfoContainer");
    let successMessage = document.createElement('p');
    successMessage.textContent = "Le produit a été ajouté au panier."
    successMessage.style.color = "#00ff45";
    successMessage.style.fontSize = "15px";
    successMessage.style.textAlign = "center";
    productInfoContainer.appendChild(successMessage);
    clearErrors(successMessage);
}


});




const clearErrors = (data) => {
    const colorField = document.getElementById("colors");
    const quantityField = document.getElementById("quantity");
    const alertMessage = document.getElementsByClassName("alert")
    colorField.addEventListener("change", () => {
        colorField.style.border = "0px";
        data.remove();
    });
    quantityField.addEventListener("change", () => {
        quantityField.style.border = "0px";
        data.remove();
    })
};

