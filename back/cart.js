
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
            cartProductContainer.innerHTML += `<article class="cart__item" data-id="${id}" data-color="${color}">
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
                    <p class="deleteItem">Supprimer</p>
                </div>
                </div>
            </div>
            </article>`
        })
    }
}
getCartProducts()

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


/*

//allow suppression of articles
const deleteButton = document.getElementById("totalPrice");
deleteButton.addEventListener("click", () => {
    let deleteId = deleteButton[0].id;
    console.log(deleteId);
})

//allow modification of quantity of articles */






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



