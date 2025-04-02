// Increment the cart bubble count
function incrementCartBubble() {
  const cartBubble = document.getElementById("cart-bubble");
  cartBubble.innerText = Number(cartBubble.innerText) + 1;
}

//  Decrement the cart bubble count
function decrementCartBubble() {
  const cartBubble = document.getElementById("cart-bubble");
  cartBubble.innerText = Number(cartBubble.innerText) - 1;
}

// Set the cart bubble count to a specific value
function setCartBubble(value) {
  const cartBubble = document.getElementById("cart-bubble");
  cartBubble.innerText = value;
}
export { incrementCartBubble, decrementCartBubble, setCartBubble };
