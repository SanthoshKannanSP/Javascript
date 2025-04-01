const mainSection = document.getElementById("main-section");

window.onhashchange = updatePage;

function updatePage() {
  const currentHash = location.hash.replace("#", "");
  const currentRoute = "templates/" + (routes[currentHash] || "home.html");

  fetch(currentRoute)
    .then((response) => response.text())
    .then((data) => {
      mainSection.innerHTML = data;
    });
}

const routes = {
  home: "home.html",
  menu: "menu.html",
  about: "about.html",
  contact: "contact.html",
};

updatePage();
