

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
        console.log(product)
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


        //add colour options
    })
}

getProduct();

//add product to panier


//local storage 