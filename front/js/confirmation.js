/* ------------------------------ PAGE CONFIRMATION ------------------------------ */

//Le numéro de commande est récupéré de l'url:
const orderId = new URLSearchParams(window.location.search).get("orderId");
//Le numéro de commande est affiché sur la page:
const orderIdField = document.getElementById("orderId");
orderIdField.innerText = orderId;