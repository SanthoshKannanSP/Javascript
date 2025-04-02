import { updatePage } from "./router.js";
import { loadCartProduct } from "./cart.js";

window.onhashchange = updatePage;

// Initial page update when user loads the page
updatePage()
// Initial cart update when user loads the page
loadCartProduct()