// Reset cookies (optional, based on your flow)
document.cookie = "orderId=0,counter=0";

// Define the new order to add
const newOrder = {
  amount: 200,
  product: ["userOrder"]
};

// POST the new order to the API
let httpRequest = new XMLHttpRequest();
const jsonRequestURL = "https://5d76bf96515d1a0014085cf9.mockapi.io/order";

httpRequest.open("POST", jsonRequestURL, true);
httpRequest.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

httpRequest.onreadystatechange = function() {
  if (httpRequest.readyState === 4) {
    if (httpRequest.status === 201 || httpRequest.status === 200) {
      // Successfully created new order
      console.log("Order placed successfully:", JSON.parse(httpRequest.responseText));
    } else {
      console.error("Failed to place order:", httpRequest.status, httpRequest.statusText);
    }
  }
};

// Send the new order data as JSON string
httpRequest.send(JSON.stringify(newOrder));
