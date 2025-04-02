import { updateProductListings } from "./products.js";
import { displayCartList } from "./cart.js";

const mainSection = document.getElementById("main-section");

// Get the necessary page update function based on current route hash and run it
async function updatePage() {
  const currentHash = location.hash.replace("#", "");
  const currentRoute = routes[currentHash] || loadProductsPage; // For any unknown route, default to products page

  currentRoute();
}

// Define the page update function for each page
const routes = {
  products: loadProductsPage,
  cart: loadCartPage,
};

// Page update function for the products page
function loadProductsPage() {
  fetch("templates/products.html")
    .then((response) => response.text())
    .then((data) => {
      mainSection.innerHTML = data;
    })
    .finally(() => {
      updateProductListings();
    });
}

// Page update function for the cart page
function loadCartPage() {
  fetch("templates/cart.html")
    .then((response) => response.text())
    .then((data) => {
      mainSection.innerHTML = data;
    })
    .finally(() => {
      displayCartList();
    });
}

export { updatePage };
