import {
  addProduct,
  removeProduct,
  getProductQuantityDetails,
} from "./cart.js";
import {
  incrementCartBubble,
  decrementCartBubble,
  setCartBubble,
} from "./cartBubble.js";
import { plusSVG, minusSVG } from "./svgIcons.js";

let productData = [];

// Fetch product data from an API
async function fetchData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const data = await response.json();
  return data;
}

// Update product listings in the UI based on fetched data
async function updateProductListings() {
  let productGrid = document.getElementById("product-grid");

  const searchButton = document.getElementById("search-button")
  searchButton.onclick = filterItems

  const productQuantityDetails = getProductQuantityDetails();
  let cartBubbleValue = 0;
  for (const productId in productQuantityDetails) {
    const quantity = productQuantityDetails[productId];
    cartBubbleValue += Number(quantity);
  }
  setCartBubble(cartBubbleValue);

  productData = await fetchData();
  productData.forEach((product) => {
    let productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.setAttribute("product-id", product.id);
    productCard.setAttribute("product-name", product.title)

    let productImage = document.createElement("img");
    productImage.src = product.image;
    productImage.classList.add("product-image");
    productCard.appendChild(productImage);

    let productName = document.createElement("h3");
    productName.classList.add("product-name");
    productName.innerText = product.title;
    productCard.appendChild(productName);

    let productBottom = document.createElement("div");
    productBottom.classList.add("product-bottom");

    let productPrice = document.createElement("span");
    productPrice.classList.add("product-price");
    productPrice.innerText = `$${product.price}`;
    productBottom.appendChild(productPrice);

    let cartOptions = document.createElement("div");
    cartOptions.classList.add("cart-options");

    let minusButton = document.createElement("span");
    minusButton.classList.add("minus-button");
    minusButton.innerHTML = minusSVG;
    minusButton.onclick = decrementQuantity;
    cartOptions.appendChild(minusButton);

    let productQuantity = document.createElement("span");
    productQuantity.classList.add("product-quantity");
    productQuantity.innerHTML = productQuantityDetails[product.id] || "0";
    cartOptions.appendChild(productQuantity);

    let plusButton = document.createElement("span");
    plusButton.classList.add("plus-button");
    plusButton.innerHTML = plusSVG;
    plusButton.onclick = incrementQuantity;
    cartOptions.appendChild(plusButton);

    productBottom.appendChild(cartOptions);
    productCard.appendChild(productBottom);

    productGrid.appendChild(productCard);
  });
}

// Filter and display products that match the search keyword
function filterItems(){
  const productCards = document.querySelectorAll(".product-card")
  const searchKeyword = document.getElementById("search-input").value
    productCards.forEach((card)=> {
      if (!card.getAttribute("product-name").toLowerCase().includes(searchKeyword.toLowerCase())){
        card.style.display = "none";
      }
      else {
        card.style.display = "flex"
      }
    }
    )
}

// Increase product quantity in cart and update UI
function incrementQuantity() {
  const productCard = this.closest(".product-card");
  const productQuantity = productCard.querySelector(".product-quantity");
  const productId = productCard.getAttribute("product-id");
  const productDetails = productData.filter((product) => {
    return product.id == productId;
  })[0];

  productQuantity.innerText = Number(productQuantity.innerText) + 1;
  incrementCartBubble();
  // Add product to cart
  addProduct(
    productId,
    productDetails.title,
    productDetails.image,
    productDetails.price
  );
}

// Decrease product quantity in the cart and update UI
function decrementQuantity() {
  const productCard = this.closest(".product-card");
  const productQuantity = productCard.querySelector(".product-quantity");
  const productId = productCard.getAttribute("product-id");
  if (productQuantity.innerText === "0") return; // If quantity is already zero, do nothing
  productQuantity.innerText = Number(productQuantity.innerText) - 1;
  decrementCartBubble();
  // remove product from cart
  removeProduct(productId);
}

export { updateProductListings, productData };
