/* ------------------------------ PAGE PRODUIT ------------------------------ */

//Récupération de l'id du produit à afficher
const productURL = window.location.href;
const str = productURL;
const url = new URL(str);
const id = url.searchParams.get("id");

//Récupération des données du produit depuis l'api
const api = `http://localhost:3000/api/products/${id}`

//Fonction pour créer les éléments HTML contenants les infos sur le produit
const getProduct = () => {
    fetch(api)
    .then(function (res) {
        return res.json()
    })
    .then(function (product) {
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

//Déclaration des variables pour champs couleur/quantité
const colorField = document.getElementById("colors");
const quantityField = document.getElementById("quantity");

//Fonction pour permettre l'ajout des produits dans le panier (stocker les données dans le local storage)
const addToCart = document.getElementById("addToCart");
addToCart.addEventListener("click", () => {
    //Objet pour stocker valuers couleur, quantité et id
    let productObject = { 
        quantity : document.getElementById("quantity").value,
        color : document.getElementById("colors").value,
        id : id
    };
    //Déclaration du tableau pour stocker les infos dans local storage
   let cartArray = []
   let arrayHasBeenModified = 0;
   //Si aucune valeur de quantité ou de couleur n'a été sélectionnée, un message d'erreur s'affiche:
   if (productObject.color == false && (productObject.quantity == 0 || productObject.quantity > 100)) {
        colorField.style.border = "1.5px Solid #f33";
        quantityField.style.border = "1.5px Solid #f33";
        let alertGeneral = document.createElement('p');
        let quantityContainer = document.getElementById("quantityContainer");
        alertGeneral.textContent = "* Veuillez sélectionner une couleur et une quantité entre 0 et 100."
        alertGeneral.style.color = "#fbbcbc";
        alertGeneral.style.fontSize = "15px";
        alertGeneral.classList.add("alert")
        quantityContainer.appendChild(alertGeneral);
        quantityContainer.classList.add("alertParent");
        clearErrors(alertGeneral);
    //Si aucune valeur de couleur n'a été sélectionnée, un message d'erreur s'affiche:
   } else if (productObject.color == false) {
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
    //Si aucune valeur de couleur n'a été sélectionnée, un message d'erreur s'affiche:
   } else if (productObject.quantity == 0 || productObject.quantity > 100) {
        quantityField.style.border = "1.5px Solid #f33";
        let alertQuantity = document.createElement('p');
        let quantityContainer = document.getElementById("quantityContainer");
        alertQuantity.textContent = "* Veuillez sélectionner une quantité entre 0 et 100."
        alertQuantity.style.color = "#fbbcbc";
        alertQuantity.style.fontSize = "15px";
        alertQuantity.classList.add("alert")
        quantityContainer.appendChild(alertQuantity);
        quantityContainer.classList.add("alertParent");
        clearErrors(alertQuantity);
    //Si aucune valeur de couleur n'a été sélectionnée, un message d'erreur s'affiche:
    } else {
    //Vérifier s'il y a des produits déjà stockés dans le local storage
    if (localStorage.getItem("cartArray") !== null) {
        quantityField.style.border = "0px";
        colorField.style.border = "0px";
        let existingProducts = JSON.parse(localStorage.getItem("cartArray"));
        for (let i = 0; i < existingProducts.length; i++) {
            let existingProductColor = existingProducts[i].color;
            let existingProductQuantity = existingProducts[i].quantity;
            let existingProductId = existingProducts[i].id;
            //Si l'article existe déjà dans le local storage, seule la quantité est mise à jour:
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
    //Si le local storage est vide, le tableau est poussé vers le local storage.
    } else if (localStorage.getItem("cartArray") === null) {
        cartArray.push(productObject)
        localStorage.setItem("cartArray", JSON.stringify(cartArray))
    }
    //Affichage d'un message de confirmation de l'enregistrement de la commande  
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

//Fonction pour enlever les messages d'erreur après modification par l'utilisateur
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


