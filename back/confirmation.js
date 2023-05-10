const orderId = new URLSearchParams(window.location.search).get("orderId");
console.log(orderId);

const orderIdField = document.getElementById("orderId");
orderIdField.innerText = orderId;