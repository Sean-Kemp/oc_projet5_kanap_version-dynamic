/* ------------------------------ PAGE PANIER ------------------------------ */

//Récupération des données du local storage / indentification de l'élément dans lequel la liste des produits sera intégrée
let productStorage = localStorage.getItem("cartArray");
let cartStorage = JSON.parse(productStorage);
const cartProductContainer = document.getElementById("cart__items");

//Fonction pour afficher chaque produit du local storage sur la page ainsi que ses infos
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
            const productArticle = document.createElement("article");
            productArticle.classList.add("cart__item");
            productArticle.setAttribute("data-id", `${id}`);
            productArticle.setAttribute("data-color", `${color}`);
            cartProductContainer.appendChild(productArticle);
            const productImageDiv = document.createElement("div");
            productImageDiv.classList.add("cart__item__img");
            productArticle.appendChild(productImageDiv);
            const productImg = document.createElement("img");
            productImg.setAttribute("src", `${product.imageUrl}`);
            productImg.setAttribute("alt", `${product.altTxt}`);
            productImageDiv.appendChild(productImg);
            const productInfoDiv = document.createElement("div");
            productInfoDiv.classList.add("cart__item__content");
            productArticle.appendChild(productInfoDiv);
            const productDescriptionDiv = document.createElement("div");
            productDescriptionDiv.classList.add("cart__item__content__description");
            productInfoDiv.appendChild(productDescriptionDiv);
            const productHeading = document.createElement("h2");
            productHeading.innerText = `${product.name}`;
            productDescriptionDiv.appendChild(productHeading);
            const productColor = document.createElement("p");
            productColor.innerText = `${color}`;
            productDescriptionDiv.appendChild(productColor);
            const productPrice = document.createElement("p");
            productPrice.innerText = `${product.price}`;
            productDescriptionDiv.appendChild(productPrice);
            const productSettingsDiv = document.createElement("div");
            productSettingsDiv.classList.add("cart__item__content__settings");
            productInfoDiv.appendChild(productSettingsDiv);
            const productQuantitySettingsDiv = document.createElement("div");
            productQuantitySettingsDiv.classList.add("cart__item__content__settings__quantity");
            productSettingsDiv.appendChild(productQuantitySettingsDiv);
            const productQuantityField = document.createElement("p");
            productQuantityField.innerText = "Qté : ";
            productQuantitySettingsDiv.appendChild(productQuantityField);
            const productQuantityInput = document.createElement("input");
            productQuantityInput.classList.add("itemQuantity");
            productQuantityInput.setAttribute("type", "number");
            productQuantityInput.setAttribute("name", "itemQuantity");
            productQuantityInput.setAttribute("min", "1");
            productQuantityInput.setAttribute("max", "100");
            productQuantityInput.setAttribute("value", `${quantity}`);
            productQuantitySettingsDiv.appendChild(productQuantityInput);
            const productDeleteDiv = document.createElement("div");
            productDeleteDiv.classList.add("cart__item__content__settings__delete");
            productSettingsDiv.appendChild(productDeleteDiv);
            const productDelete = document.createElement("a");
            productDelete.classList.add("deleteItem");
            productDelete.innerText = "Supprimer";
            productDeleteDiv.appendChild(productDelete);

        })
        //Intégration de la fonctionnalité "supprimer":
        .then(function() {
            const deleteItem = document.querySelectorAll(".deleteItem");
            deleteItem.forEach((deleteItem) => {
                deleteItem.addEventListener("click" , (event) => {
                    event.preventDefault();
                    let myArticle = deleteItem.closest('article');
                    //L'article est supprimé de la page:
                    myArticle.remove();
                    //L'article est supprimé dans le local storage:
                    cartStorage = cartStorage.filter
                    ( element => element.id !== myArticle.dataset.id || element.color !== myArticle.dataset.color );
                    localStorage.setItem("cartArray", JSON.stringify(cartStorage));
                    //Les totaux en bas de la liste sont mis à jour:
                    updateTotalPrice();
                    updateTotalQuantity();
                    let newCartStorage = JSON.parse(localStorage.getItem("cartArray"));
                    console.log(newCartStorage)
                        if (newCartStorage.length == 0) {
                            localStorage.clear();
                        }


                })
            })
        })
        //Intégration de la fonctionnalité "modifier la quantité":
        .then(function changeQuantity() {
                const changeQuantity = document.querySelectorAll(".itemQuantity");
                changeQuantity.forEach((changeQuantityItem) => {
                    changeQuantityItem.addEventListener("change", (event) => {
                        event.preventDefault();
                            let totalQuantityCheck = Number(document.getElementById("totalQuantity").textContent);
                            console.log(totalQuantityCheck);
                            choiceQuantity = Number(changeQuantityItem.value);
                            let myArticle = changeQuantityItem.closest('article');
                            let currentQuantity = cartStorage.find( element => element.id === myArticle.dataset.id && element.color === myArticle.dataset.color )
                            console.log(currentQuantity.quantity);
                            parseChoiceQuantity = parseInt(choiceQuantity);
                            if((choiceQuantity - Math.floor(choiceQuantity)) !== 0){
                                alert("Veuillez saisir un nombre entier (sans décimales).");
                                location.reload(true);
                            }else if(((totalQuantityCheck - currentQuantity.quantity) + parseChoiceQuantity) <= 100){
                                //La quantité est mise à jour dans le local storage:
                                let itemToChange = cartStorage.find
                                ( element => element.id === myArticle.dataset.id && element.color === myArticle.dataset.color );
                                itemToChange.quantity = parseChoiceQuantity;
                                localStorage.setItem("cartArray", JSON.stringify(cartStorage));
                                //Les totaux en bas de la liste sont mis à jour:
                                updateTotalPrice();
                                updateTotalQuantity();
                            }else if(((totalQuantityCheck - currentQuantity.quantity) + parseChoiceQuantity) > 100) {
                                alert(`Le panier a une capacité maximale de 100 articles.`);
                                location.reload();
                            }else{
                                console.log("error")
                            }

                    });
                });
        })
    }
}
getCartProducts()

//Fonction pour calculer/afficher le prix total
let updateTotalPrice = () => {
    const cartTotalPriceContainer = document.getElementById("totalPrice");
    let priceArray = [];
    //Si le local storage est vide, prix total est 0:
    if (!cartStorage || cartStorage.length == 0) {
        cartTotalPriceContainer.innerText = "0";
    //S'il y a des produits dans le local storage, le prix total est calculé:
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
                let sumPrice = priceArray.reduce((x, y) => {
                    return x + y;
                  }, 0);
                //Le prix total est affiché:
                cartTotalPriceContainer.innerText = `${sumPrice}`;
            })
        }
    }
}
updateTotalPrice()

//Fonction pour calculer/afficher la quantité totale
let updateTotalQuantity = () => {
    const cartTotalQuantityContainer = document.getElementById("totalQuantity");
    let sumQuantity = 0;
    //Si le local storage est vide, quantité totale est 0 et un message "Votre panier est vide" sera affiché:
    if (!cartStorage || cartStorage.length == 0) {
        cartTotalQuantityContainer.innerText = "0";
        let panierVideMessage = document.createElement("h2");
        panierVideMessage.innerText += "Votre panier est vide!"
        panierVideMessage.style.textAlign = "center";
        cartProductContainer.appendChild(panierVideMessage);
    //S'il y a des produits dans le local storage, la quantité totale est calculée:
    } else {
        for (let i = 0; i < cartStorage.length; i++) {
        sumQuantity += parseInt(cartStorage[i].quantity);
    }
    //La quantité totale est affichée:
    cartTotalQuantityContainer.innerText = `${sumQuantity}`;
    }
}
updateTotalQuantity();


//Déclaration des variables pour les champs du formulaire
const firstNameField = document.getElementById("firstName");
const lastNameField = document.getElementById("lastName");
const addressField = document.getElementById("address");
const cityField = document.getElementById("city");
const emailField = document.getElementById("email");

//Déclaration des RegExs la validation du formulaire
const nameRegex = new RegExp("^([\\w\\s\\-àâäéèêëïîôöùûüç]{2,35})$");
const textRegex = new RegExp("^([\\w\\s\\-\\.,’'àâäéèêëïîôöùûüç]{2,35})$");
const addressRegex = new RegExp("^([\\w\\s\\-.&(),’'àâäéèêëïîôöùûüç]{5,200})$");
const emailRegex = new RegExp("^([\\w_.!#$%&'*+\\-/=?^`{|}~]+)@([a-zA-Z_]+)?(\\.[a-zA-Z]+)(\\.[a-zA-Z]{2,3})?");

//Validation du champ prénom:
firstNameField.addEventListener("change", () => {
    let firstNameError = document.getElementById("firstNameErrorMsg");
    let validateFirstName = nameRegex.test(firstNameField.value);
    //Si l'entrée passe la validation, pas d'erreur:
    if (validateFirstName) {
        firstNameError.innerText = " ";
        errorFirstName = false;
    //Si l'entrée ne passe pas la validation, un message d'erreur est affiché:
    } else {
        firstNameError.innerText = "Veuillez saisir un prénom valide (sans caractères spéciaux).";
        errorFirstName = true;
    }
});

//Validation du champ nom:
lastNameField.addEventListener("change", () => {
    let lastNameError = document.getElementById("lastNameErrorMsg");
    let validateLastName = nameRegex.test(lastNameField.value);
    //Si l'entrée passe la validation, pas d'erreur:
    if (validateLastName) {
        lastNameError.innerText = " ";
        errorLastName = false;
    //Si l'entrée ne passe pas la validation, un message d'erreur est affiché:
    } else {
        lastNameError.innerText = "Veuillez saisir un nom valide (sans caractères spéciaux).";
        errorLastName = true;
    }
});

//Validation du champ adresse:
addressField.addEventListener("change", () => {
    let addressError = document.getElementById("addressErrorMsg");
    let validateAddress = addressRegex.test(addressField.value);
    //Si l'entrée passe la validation, pas d'erreur:
    if (validateAddress) {
        addressError.innerText = " ";
        errorAddress = false;
    //Si l'entrée ne passe pas la validation, un message d'erreur est affiché:
    } else {
        addressError.innerText = "Veuillez indiquer une adresse valide.";
        errorAddress = true;
    }
});

//Validation du champ ville:
cityField.addEventListener("change", () => {
    let cityError = document.getElementById("cityErrorMsg");
    let validateCity = textRegex.test(cityField.value);
    //Si l'entrée passe la validation, pas d'erreur:
    if (validateCity) {
        cityError.innerText = " ";
        errorCity = false;
    //Si l'entrée ne passe pas la validation, un message d'erreur est affiché:
    } else {
        cityError.innerText = "Veuillez indiquer une ville valide (sans caractères spéciaux).";
        errorCity = true;
    }
});

//Validation du champ email:
emailField.addEventListener("change", () => {
    let emailError = document.getElementById("emailErrorMsg");
    let validateEmail = emailRegex.test(emailField.value);
    //Si l'entrée passe la validation, pas d'erreur:
    if (validateEmail) {
        emailError.innerText = " ";
        errorEmail = false;
    //Si l'entrée ne passe pas la validation, un message d'erreur est affiché:
    } else {
        emailError.innerText = "Veuillez indiquer un email valide.";
        errorEmail = true;
    }
});

//Event listener pour passe la commande:
const buttonCommander = document.getElementById("order");
buttonCommander.addEventListener("click", (event) => {
    event.preventDefault();
    //Si le panier est vide, la commande n'est pas passée (Alerte : Votre panier est vide)
    if(!cartStorage || cartStorage.length == 0) {
        alert("Votre panier est vide!");
    //Si des champs n'ont pas été remplis, un bord rouge apparaît:
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
        //Empêcher l'actualisation de la page si les champs sont vides:
        event.preventDefault();
    } else if (errorFirstName === true || errorLastName === true || errorAddress === true
        ||errorCity === true || errorEmail === true) {
        //Empêcher l'actualisation de la page s'il y a des erreurs:
        event.preventDefault(); 
    } else {
    //S'il n'y a pas de problème avec le formulaire, l'id du produit et les coordonnées de l'utilisateur sont récupérés.
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
    //Ces données sont ensuite envoyées à l'api
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
    //L'api est à nouveau appelée afin de récupérer l'id (numéro de commande):
    fetch("http://localhost:3000/api/products/order", option)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        //La page redirige vers la page de confirmation (avec le numéro de commande ajouté à l'URL):
        document.location.href = `confirmation.html?orderId=${data.orderId}`;
        
    })
    //Le local storage est vidé:
    localStorage.clear();
    }
});





















