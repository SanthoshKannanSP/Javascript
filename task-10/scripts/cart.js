import {
  incrementCartBubble,
  decrementCartBubble,
} from "./cartBubble.js";
import { plusSVG, minusSVG } from "./svgIcons.js";

let cartProducts = {};

// Load cart products from localStorage
function loadCartProduct() {
  cartProducts = JSON.parse(window.localStorage.getItem("cartProducts")) || {};
}

// Save cart products to localStorage
function saveCartProduct() {
  window.localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
}

// Retrieve the quantity of each product in the cart
function getProductQuantityDetails() {
  const quantityDetails = {};
  for (let productId in cartProducts) {
    quantityDetails[productId] = cartProducts[productId].quantity;
  }
  return quantityDetails;
}

// Add a product to the cart or increase its quantity
function addProduct(productId, productName, productImage, productPrice) {
  // If product already in cart, increment its quantity
  if (productId in cartProducts) {
    cartProducts[productId].quantity += 1;
  } else {
    // Add the product to the cart
    cartProducts[productId] = {};
    cartProducts[productId].quantity = 1;
    cartProducts[productId].name = productName;
    cartProducts[productId].image = productImage;
    cartProducts[productId].price = productPrice;
  }

  // Save the updated cart to localStorage
  saveCartProduct();
}

// Decrease product quantity and remove it from cart if quantity reaches zero
function removeProduct(productId) {
  cartProducts[productId].quantity -= 1;
  if (cartProducts[productId].quantity === 0) {
    delete cartProducts[productId];
  }

  // Save the updated cart to localStorage
  saveCartProduct();
}

// Display cart items in the UI and update the cart bubble and bill amount
function displayCartList() {
  const cartList = document.getElementById("cart-list");

  for (let productId in cartProducts) {
    const productDetails = cartProducts[productId];
    const cartItem = createCartItem(
      productId,
      productDetails.name,
      productDetails.image,
      productDetails.price,
      productDetails.quantity
    );
    cartList.appendChild(cartItem);
  }

  updateBillAmount();
}

// Create the cartItem component to be displayed in UI
function createCartItem(id, name, image, price, quantity) {
  // Create the main container
  const cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");
  cartItem.setAttribute("product-id", id);

  // Create the image element
  const cartImage = document.createElement("img");
  cartImage.classList.add("cart-product-image");
  cartImage.src = image;

  // Create the product details container
  const productDetails = document.createElement("div");
  productDetails.classList.add("cart-product-details");

  // Create the product title
  const productTitle = document.createElement("h3");
  productTitle.classList.add("cart-product-title");
  productTitle.textContent = name;

  // Create the product price
  const productPrice = document.createElement("span");
  productPrice.classList.add("cart-product-price");
  productPrice.textContent = `$${price}`;

  // Append title and price to product details
  productDetails.appendChild(productTitle);
  productDetails.appendChild(productPrice);

  // Create the price details container
  const priceDetails = document.createElement("div");
  priceDetails.classList.add("cart-price-details");

  // Create the cart options container
  const cartOptions = document.createElement("div");
  cartOptions.classList.add("cart-options");

  // Create the minus button
  const minusButton = document.createElement("span");
  minusButton.classList.add("minus-button");
  minusButton.innerHTML = minusSVG;
  minusButton.onclick = decrementCartQuantity;

  // Create the product quantity
  const productQuantity = document.createElement("span");
  productQuantity.classList.add("product-quantity");
  productQuantity.textContent = quantity;

  // Create the plus button
  const plusButton = document.createElement("div");
  plusButton.classList.add("plus-button");
  plusButton.innerHTML = plusSVG;
  plusButton.onclick = incrementCartQuantity;

  // Append minus button, quantity, and plus button to cart options
  cartOptions.appendChild(minusButton);
  cartOptions.appendChild(productQuantity);
  cartOptions.appendChild(plusButton);
  cartOptions.setAttribute("product-id", id);

  // Create the cart item price
  const cartItemPrice = document.createElement("div");
  cartItemPrice.classList.add("cart-item-price");
  cartItemPrice.textContent = `$${quantity * price}`;

  // Append cart options and item price to price details
  priceDetails.appendChild(cartOptions);
  priceDetails.appendChild(cartItemPrice);

  // Append image, product details, and price details to the main container
  cartItem.appendChild(cartImage);
  cartItem.appendChild(productDetails);
  cartItem.appendChild(priceDetails);

  return cartItem;
}

// Increment product quantity when user clicks on plus button and update UI
function incrementCartQuantity() {
  const cartItem = this.closest(".cart-item");
  const productId = cartItem.getAttribute("product-id");
  const productQuantity = cartItem.querySelector(".product-quantity");
  const cartItemPrice = cartItem.querySelector(".cart-item-price");

  addProduct(productId);
  incrementCartBubble();
  productQuantity.innerText = cartProducts[productId].quantity;
  cartItemPrice.innerText =
    `$${cartProducts[productId].quantity * cartProducts[productId].price}`;
  updateBillAmount()
}

// Decrement product quantity when user clicks on minus button and update UI
function decrementCartQuantity() {
  const cartItem = this.closest(".cart-item");
  const productId = cartItem.getAttribute("product-id");
  const productQuantity = cartItem.querySelector(".product-quantity");
  const cartItemPrice = cartItem.querySelector(".cart-item-price");

  removeProduct(productId);
  decrementCartBubble();

  if (!cartProducts[productId]) {
    cartItem.remove();
  } else {
    productQuantity.innerText = cartProducts[productId].quantity;
    cartItemPrice.innerText =
      `$${cartProducts[productId].quantity * cartProducts[productId].price}`;
  }
  updateBillAmount()
}

// Calculate and update the bill amount including discount
function updateBillAmount() {
  const billTotalAmount = document.getElementById("bill-total-amount");
  const billDiscount = document.getElementById("bill-discount");
  const billNetAmount = document.getElementById("bill-net-amount");

  let totalAmount = 0;
  for (let productId in cartProducts) {
    totalAmount +=
      cartProducts[productId].price * cartProducts[productId].quantity;
  }

  billTotalAmount.innerText = `$${totalAmount.toFixed(2)}`;
  const discount = totalAmount * 0.1;
  billDiscount.innerText = `$${discount.toFixed(2)}`;

  const netAmount = totalAmount - discount;
  billNetAmount.innerText = `$${netAmount.toFixed(2)}`;
}

export {
  addProduct,
  removeProduct,
  displayCartList,
  loadCartProduct,
  getProductQuantityDetails,
};
