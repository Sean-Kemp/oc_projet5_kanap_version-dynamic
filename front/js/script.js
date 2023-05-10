//PAGE d'ACCUEIL

const api = "http://localhost:3000/api/products"
// create a constant for the api to be referenced with url
const productCard = document.getElementById("items")
//creates constant to reference area to be edited (global scope)

const getProducts = () => {
    fetch(api)
    .then(function (res) {
        return res.json()
    })
    //first we call the api 
    //returns in json format
    .then(function (product) {
        console.log(product)
        //prints array to console
        for(i in product) {
            productCard.innerHTML += `<a href="./product.html?id=${product[i]._id}">
            <article>
              <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
              <h3 class="productName">${product[i].name}</h3>
              <p class="productDescription">${product[i].description}</p>
            </article>
          </a>`
          //loops through array, adding HTML to container and inserting values using template literals.
        }
    })
}

getProducts();









/*
//PRODUCT
ADD PRODUCT TO PANIER
    WHERE IS THIS STOCKED/SENT?


//CART
DISPLAY PRODUCT DETAILS
DISPLAY TOTAL ARTICLES/ TOTAL PRICE
FORM : 
    DISPLAY ERROR MESSAGES
    SAVE INPUTS
    SUBMIT INPUTS


//CONFIRMATION
DISPLAY NUMÉRO DE COMMANDE



*/
