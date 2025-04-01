const gallery = document.getElementById("gallery");

async function fetchRandomSVG() {
  const randomNumber = Math.floor(Math.random() * 1000);
  const api = `https://api.dicebear.com/9.x/pixel-art/svg?seed=${randomNumber}`;

  const response = await fetch(api);
  const svg = await response.text();
  return svg;
}

async function AddSVG() {
  let svgElement = document.createElement("div");
  svgElement.classList.add("avatar");
  svgElement.innerHTML = await fetchRandomSVG();
  gallery.appendChild(svgElement);
}

async function loadSVGs() {
  for (let i = 0; i < 12; i++) {
    AddSVG();
  }
}

window.addEventListener("scroll", () => {
  if (
    window.scrollY + window.innerHeight >=
    document.documentElement.scrollHeight - 5 // Subtracted 5 to trigger the load slighly before reaching the bottom
  ) {
    loadSVGs();
  }
});

loadSVGs();
