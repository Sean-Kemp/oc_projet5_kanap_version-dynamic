/* ------------------------------ PAGE D'ACCUEIL ------------------------------ */

//Déclaration des variables de l'API et de l'élément dans lequel les données de l'API seront affichées.
const api = "http://localhost:3000/api/products"
const productCard = document.getElementById("items")

//Fonction permettant d'appeler l'API et d'insérer des éléments HTML, de manière dynamique, pour chaque produit dans la base de données.
const getProducts = () => {
    fetch(api)
    .then(function (res) {
        return res.json()
    })
//Appel de l'api (données sont retournées au format json)
    .then(function (product) {
        for(i in product) {
            productCard.innerHTML += `<a href="./product.html?id=${product[i]._id}">
            <article>
              <img src="${product[i].imageUrl}" alt="${product[i].altTxt}">
              <h3 class="productName">${product[i].name}</h3>
              <p class="productDescription">${product[i].description}</p>
            </article>
          </a>`
//HTML à insérer pour chaque élément du tableau (boucle) - les infos sur le produit sont insérées à l'aide de template literals.
        }
    })
}
getProducts();