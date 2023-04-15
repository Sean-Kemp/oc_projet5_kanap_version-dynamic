// Loop - this task is going to have to be repeated for each product in local storage 

// Access API - for general data about product not stored in local storage 
//. Create loop
// Each time :
        // recuperate the colour, quantity and id of each product.
        // add inner html - replacing values either with local storage or api data



let productStorage = localStorage.getItem("cartArray");
let cartStorage = JSON.parse(productStorage);
let id = cartStorage[0].id;
const api = `http://localhost:3000/api/products/${id}`
const cartProductConatiner = document.getElementById("cart__items")

const getCartProducts = () => {
    fetch(api)
    .then(function (res) {
        return res.json()
    })
    .then(function (product) {
        for(i in cartStorage) {
            cartProductConatiner.innerHTML += `<article class="cart__item" data-id="${cartStorage[i].id}" data-color="${cartStorage[i].color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${cartStorage[i].color}</p>
                <p>€${product.price}</p>
                </div>
                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cartStorage[i].quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
            </article>`
            }
    })

}

getCartProducts()

//find solution for linking correct product in array to api retrieval 
/*function getCart() {
    let productObject = JSON.parse(localStorage.getItem("kanapLs"));
    if (productObject === null) {
        return [];
    } else {
        return productObject
    }
}
function addCart(product) {
    let productObject = getCart();
    let foundProducts = productObject.find(
        (item) =>
                item.id === product.id &&
                item.color === product.color
    );
    if (
        foundProducts == undefined &&
        colorOptions.value != "" &&			//si les consitions sont OK
        getProductQuantity.value > 0 &&
        getProductQuantity.value <= 100
    ) {
        product.quantity = getProductQuantity.value;
        productObject.push(product);
    } else {
        let newQuantity =
                    parseInt(foundProducts.quantity) +
                    parseInt(getProductQuantity.value); 
                    foundProducts.quantity = newQuantity;
    }
    saveCart(productObject);
}
function saveCart(productObject) {
    localStorage.setItem("kanapLs", JSON.stringify(productObject))
} 
});*/