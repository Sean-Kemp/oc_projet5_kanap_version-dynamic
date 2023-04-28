
let productStorage = localStorage.getItem("cartArray");
let cartStorage = JSON.parse(productStorage);



const cartProductContainer = document.getElementById("cart__items");

const getCartProducts = () => {
    for(i in cartStorage) {
        let id = cartStorage[i].id;
        let color = cartStorage[i].color;
        let quantity = cartStorage[i].quantity;
        const api = `http://localhost:3000/api/products/${id}`
        fetch(api)
        .then(function (res) {
            return res.json()
        })
        .then(function (product) {
            cartProductContainer.innerHTML += 
            
            `<article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${color}</p>
                <p>€${product.price}</p>
                </div>


                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <a class="deleteItem">Supprimer</a>
                </div>
                </div>
            </div>
            </article>`
            /*let productArticle = document.createElement("article");
            productArticle.classList.add("cart__item");
            productArticle.setAttribute("data-id", `${id}`);
            productArticle.setAttribute("data-color", `${color}`);

            let productImageDiv = document.createElement("div");
            productImageDiv.classList.add("cart__item__img");

            let productImage = document.createElement("img");
            productImage.setAttribute("src", `${product.imageUrl}`);
            productImage.setAttribute("alt", `${product.altTxt}`);

            productImageDiv.appendChild(productImage);
            productArticle.appendChild(productImageDiv);
            cartProductContainer.appendChild(productArticle);


            let productInfoDiv = document.createElement("div");
            productInfoDiv.classList.add("cart__item__content");


            let productDescriptionDiv = document.createElement("div");
            productDescriptionDiv.classList.add("cart__item__content__description");

            let productTitle = document.createElement("h2");
            productTitle.innerText = `${product.name}`;

            let productColor = document.createElement("p");
            productColor.innerText = `${color}`;

            let productPrice = document.createElement("p");
            productPrice.innerText = `€${product.price}`;

            productDescriptionDiv.appendChild(productTitle);
            productDescriptionDiv.appendChild(productColor);
            productDescriptionDiv.appendChild(productPrice);

            productInfoDiv.appendChild(productDescriptionDiv);
            productArticle.appendChild(productInfoDiv);

            let productSettingsDiv = document.createElement("div");
            productSettingsDiv.classList.add("cart__item__content__settings");

            let productQuantitySettingDiv = document.createElement("div");
            productQuantitySettingDiv.classList.add("cart__item__content__settings__quantity");

            let productQuatity = document.createElement("p");
            productQuatity.innerText = "Qté : ";

            let productQuantityValue = document.createElement("input");
            productQuantityValue.classList.add("itemQuantity");
            productQuantityValue.setAttribute("type", "number");
            productQuantityValue.setAttribute("name", "itemQuantity");
            productQuantityValue.setAttribute("min", "1");
            productQuantityValue.setAttribute("max", "100");
            productQuantityValue.setAttribute("value", `${quantity}`);

            productQuantitySettingDiv.appendChild(productQuatity);
            productQuantitySettingDiv.appendChild(productQuantityValue);

            productSettingsDiv.appendChild(productQuantitySettingDiv);
            productInfoDiv.appendChild(productSettingsDiv);

            let productDeleteSettingsDiv = document.createElement("div");
            productDeleteSettingsDiv.classList.add("cart__item__content__settings__delete")

            let productDeleteButton = document.createElement("button");
            productDeleteButton.classList.add("deleteItem");
            productDeleteButton.innerText = "Supprimer";

            productDeleteSettingsDiv.appendChild(productDeleteButton);
            productInfoDiv.appendChild(productDeleteSettingsDiv);*/
        })
        .then(function() {
            const deleteItem = document.querySelectorAll(".deleteItem");
            deleteItem.forEach((deleteItem) => {
                deleteItem.addEventListener("click" , (event) => {
                    event.preventDefault();
                    let myArticle = deleteItem.closest('article');
                    console.log(myArticle);
                    cartStorage = cartStorage.filter
                    ( element => element.id !== myArticle.dataset.id || element.color !== myArticle.dataset.color );
                    localStorage.setItem("cartArray", JSON.stringify(cartStorage));

                })
            })
            /*let deleteItemArray = Array.from(deleteItem);
            for (i in deleteItemArray) {
                deleteItemArray[i].addEventListener("click", () => {
                    const articleToDelete = deleteItemArray[i].closest("article");
                    const idArticleToDelete = deleteItemArray[i].closest("article").getAttribute("data-id");
                    console.log(cartStorage[i].id);
                    if (idArticleToDelete === cartStorage[i].id) {
                        delete cartStorage[i]
                    } else {
                        console.log("fail")
                    }
                    console.log(cartStorage);
                    console.log(idArticleToDelete);
                    //articleToDelete.remove();
                    console.log(deleteItemArray)
                    //sumQuantity -= parseInt(cartStorage[i].price);
                })
            }*/
        })
        const cartTotalPriceContainer = document.getElementById("totalPrice");
        let priceArray = [];
        if (cartStorage === null) {
            cartTotalPriceContainer.innerText = "0";
        } else {
            for(i in cartStorage) {
                let id = cartStorage[i].id;
                let quantity = cartStorage[i].quantity;
            
                const api = `http://localhost:3000/api/products/${id}`
                fetch(api)
                .then(function (res) {
                return res.json()
                })
                .then(function (product) {
                    let priceCartItem = product.price;
                    let quantityCartItem = quantity;
                    let totalPriceItem = priceCartItem * quantityCartItem;
                    priceArray.push(totalPriceItem);
                    //console.log(priceArray);
                    let sumPrice = priceArray.reduce((x, y) => {
                        return x + y;
                      }, 0);
                    cartTotalPriceContainer.innerText = `${sumPrice}`;
                })
            }
        }
    }
}
getCartProducts()



/*

let articleWrapper = document.createElement("div");
            articleWrapper.classList.add("test");
            articleWrapper.innerHTML += 
            
            `<article class="cart__item" data-id="${id}" data-color="${color}">
            <div class="cart__item__img">
                <img src="${product.imageUrl}" alt="${product.altTxt}">
            </div>
            <div class="cart__item__content">
                <div class="cart__item__content__description">
                <h2>${product.name}</h2>
                <p>${color}</p>
                <p>€${product.price}</p>
                </div>


                <div class="cart__item__content__settings">
                <div class="cart__item__content__settings__quantity">
                    <p>Qté : </p>
                    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${quantity}">
                </div>
                <div class="cart__item__content__settings__delete">
                    <a class="deleteItem">Supprimer</a>
                </div>
                </div>
            </div>
            </article>`

            cartProductContainer.appendChild(articleWrapper)


*/









const cartTotalQuantityContainer = document.getElementById("totalQuantity");
let sumQuantity = 0;
if (cartStorage === null) {
    cartTotalQuantityContainer.innerText = "0";
    cartProductContainer.innerHTML += "<h2>Votre panier est vide!</h2>"
} else {
    for (let i = 0; i < cartStorage.length; i++) {
    sumQuantity += parseInt(cartStorage[i].quantity);
}
cartTotalQuantityContainer.innerText = `${sumQuantity}`;
}

//allow suppression of articles





//allow modification of quantity of articles */
/*
let deleteButtons = document.querySelectorAll("deleteItem");
let testPhrase = document.createElement("h1");
testPhrase.innerText = "THIS IS A TEST"
articleWrapper.appendChild(testPhrase)
/*console.log(deleteButtons)
let testArray = Array.from(deleteButtons)
console.log(testArray)
let test = deleteButtons.closest("article")
console.log(test)*/



const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const addressField = document.getElementById("address");
const cityField = document.getElementById("city");
const emailField = document.getElementById("email");

const textRegex = new RegExp("^[^.?!:;,/\\/_-]([. '-]?[a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
const addressRegex = new RegExp("^[^.?!:;,/\\/_-]([, .:;'-]?[0-9a-zA-Zàâäéèêëïîôöùûüç])+[^.?!:;,/\\/_-]$");
const emailRegex = new RegExp("^[^. ?!:;,/\\/_-]([._-]?[a-z0-9])+[^.?!: ;,/\\/_-][@][a-z0-9]+[.][a-z][a-z]+$");


firstNameField.addEventListener("change", () => {
    let firstNameError = document.getElementById("firstNameErrorMsg");
    let validateFirstName = textRegex.test(firstNameField.value);
    if (validateFirstName) {
        firstNameError.innerText = " ";
        errorFirstName = false;
    } else {
        firstNameError.innerText = "Veuillez indiquer un prénom.";
        errorFirstName = true;
    }
})

lastNameField.addEventListener("change", () => {
    let lastNameError = document.getElementById("lastNameErrorMsg");
    let validateLastName = textRegex.test(lastNameField.value);
    if (validateLastName) {
        lastNameError.innerText = " ";
        errorLastName = false;
    } else {
        lastNameError.innerText = "Veuillez indiquer un nom.";
        errorLastName = true;
    }
})

addressField.addEventListener("change", () => {
    let addressError = document.getElementById("addressErrorMsg");
    let validateAddress = addressRegex.test(addressField.value);
    if (validateAddress) {
        addressError.innerText = " ";
        errorAddress = false;
    } else {
        addressError.innerText = "Veuillez indiquer une adresse.";
        errorAddress = true;
    }
})

cityField.addEventListener("change", () => {
    let cityError = document.getElementById("cityErrorMsg");
    let validateCity = textRegex.test(cityField.value);
    if (validateCity) {
        cityError.innerText = " ";
        errorCity = false;
    } else {
        cityError.innerText = "Veuillez indiquer une ville.";
        errorCity = true;
    }
})

emailField.addEventListener("change", () => {
    let emailError = document.getElementById("emailErrorMsg");
    let validateEmail = emailRegex.test(emailField.value);
    if (validateEmail) {
        emailError.innerText = " ";
        errorEmail = false;
    } else {
        emailError.innerText = "Veuillez indiquer un email.";
        errorEmail = true;
    }
})


const buttonCommander = document.getElementById("order");
buttonCommander.addEventListener("click", (event) => {
    event.preventDefault();
    if(cartStorage === null) {
        alert("Votre panier est vide!")
    } /*else if (!firstNameField.value || !lastNameField.value || !addressField.value || cityField.value || emailField.value) {
        if(!firstNameField.value) {
        firstNameField.style.border = "1.5px Solid #f33";
        } else {
            firstNameField.style.border = "0px";
        }
        if(!lastNameField.value) {
        lastNameField.style.border = "1.5px Solid #f33";
        } else {
            lastNameField.style.border = "0px";
        }
        if(!addressField.value) {
            addressField.style.border = "1.5px Solid #f33";
        } else {
            addressField.style.border = "0px";
        }
        if(!cityField.value) {
            cityField.style.border = "1.5px Solid #f33";
        } else {
            cityField.style.border = "0px";
        }
        if(!emailField.value) {
            emailField.style.border = "1.5px Solid #f33";
        } else {
            emailField.style.border = "0px";
        }
        event.preventDefault();
    } else if (errorFirstName === true || errorLastName === true || errorAddress === true
        ||errorCity === true || errorEmail === true) {
        event.preventDefault(); 
    }*/ else {
    let idProducts = [];
    for (let l = 0; l<cartStorage.length;l++) {
        idProducts.push(cartStorage[l].id);
    }
    const order = {
        contact : {
            firstName : firstNameField.value,
            lastName : lastNameField.value,
            address : addressField.value,
            city : cityField.value,
            email : emailField.value,
        },
        products : idProducts,
    }
    let orderSummary = JSON.stringify(order);
    console.log(orderSummary)
    const option = {
        method : "POST",
        headers : {
            "Content-Type" : "application/json; charset=UTF-8"
        },
        body : JSON.stringify(order),  
    }
    console.log(option)
    fetch("http://localhost:3000/api/products/order", option)
    .then(function (response) {
        return response.json()
    })
    .then(function (data) {
        console.log(data)
    })
}
}
)





















