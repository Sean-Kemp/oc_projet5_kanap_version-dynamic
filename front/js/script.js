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
            const productLink = document.createElement("a");
            productLink.setAttribute("href", `./product.html?id=${product[i]._id}`);
            productCard.appendChild(productLink);
            const productArticle = document.createElement("article");
            productLink.appendChild(productArticle);
            const productImg = document.createElement("img");
            productImg.setAttribute("src", `${product[i].imageUrl}`);
            productImg.setAttribute("alt", `${product[i].altTxt}`);
            productArticle.appendChild(productImg);
            const productTitle = document.createElement("h3");
            productTitle.classList.add("productName");
            productTitle.innerText = `${product[i].name}`;
            productArticle.appendChild(productTitle);
            const productDescription = document.createElement("p");
            productDescription.classList.add("productDescription");
            productDescription.innerText = `${product[i].description}`;
            productArticle.appendChild(productDescription);
//HTML à insérer pour chaque élément du tableau (boucle) - les infos sur le produit sont insérées à l'aide de template literals.
        }
    })
}
getProducts();


