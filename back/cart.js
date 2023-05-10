
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
        })
        .then(function() {
            const deleteItem = document.querySelectorAll(".deleteItem");
            deleteItem.forEach((deleteItem) => {
                deleteItem.addEventListener("click" , (event) => {
                    event.preventDefault();
                    let myArticle = deleteItem.closest('article');
                    console.log(myArticle);
                    myArticle.remove();
                    cartStorage = cartStorage.filter
                    ( element => element.id !== myArticle.dataset.id || element.color !== myArticle.dataset.color );
                    localStorage.setItem("cartArray", JSON.stringify(cartStorage));
                    updateTotalPrice();
                    updateTotalQuantity();
                })
            })
        })
        .then(function changeQuantity() {
                const changeQuantity = document.querySelectorAll(".itemQuantity");
                changeQuantity.forEach((changeQuantityItem) => {
                    changeQuantityItem.addEventListener("change", (event) => {
                        event.preventDefault();
                        choiceQuantity = Number(changeQuantityItem.value);
                        let myArticle = changeQuantityItem.closest('article');
                        let itemToChange = cartStorage.find
                        ( element => element.id === myArticle.dataset.id && element.color === myArticle.dataset.color );
                        if(choiceQuantity > 0 && choiceQuantity <= 100 && Number.isInteger(choiceQuantity)){
                            parseChoiceQuantity = parseInt(choiceQuantity);
                            itemToChange.quantity = parseChoiceQuantity;
                            localStorage.setItem("cartArray", JSON.stringify(cartStorage));
                            updateTotalPrice();
                            updateTotalQuantity();
                        }else{
                            changeQuantityItem.value = itemToChange.quantity;
                        }
                    });
                });
            })
    }
}
getCartProducts()



let updateTotalPrice = () => {
    const cartTotalPriceContainer = document.getElementById("totalPrice");
    let priceArray = [];
    if (cartStorage.length == 0) {
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

updateTotalPrice()




let updateTotalQuantity = () => {
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
}

updateTotalQuantity();



const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const addressField = document.getElementById("address");
const cityField = document.getElementById("city");
const emailField = document.getElementById("email");

const textRegex = new RegExp("^([\\w\\s\\-\\.,’'àâäéèêëïîôöùûüç]{2,35})$");
const addressRegex = new RegExp("^([\\w\\s\\-.&(),’'àâäéèêëïîôöùûüç]{5,200})$");
const emailRegex = new RegExp("^([\\w_.!#$%&'*+\\-/=?^`{|}~]+)@([a-zA-Z_]+)?(\\.[a-zA-Z]+)(\\.[a-zA-Z]{2,3})?");


firstNameField.addEventListener("change", () => {
    let firstNameError = document.getElementById("firstNameErrorMsg");
    let validateFirstName = textRegex.test(firstNameField.value);
    if (validateFirstName) {
        firstNameError.innerText = " ";
        errorFirstName = false;
    } else {
        firstNameError.innerText = "Veuillez saisir un prénom valide (sans caractères spéciaux).";
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
        lastNameError.innerText = "Veuillez saisir un nom valide (sans caractères spéciaux).";
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
        addressError.innerText = "Veuillez indiquer une adresse valide.";
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
        cityError.innerText = "Veuillez indiquer une ville valide (sans caractères spéciaux).";
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
        emailError.innerText = "Veuillez indiquer un email valide.";
        errorEmail = true;
    }
})


const buttonCommander = document.getElementById("order");
buttonCommander.addEventListener("click", (event) => {
    event.preventDefault();
    if(cartStorage === null) {
        alert("Votre panier est vide!")
    } else if (!firstNameField.value || !lastNameField.value || !addressField.value || !cityField.value || !emailField.value) {
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
    } else {
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
        return response.json();

    })
    .then(function (data) {
        console.log(data);
        document.location.href = `confirmation.html?orderId=${data.orderId}`;
        
    })
    localStorage.clear();
}
}
)





















