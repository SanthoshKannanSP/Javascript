const thumbnails = document.querySelectorAll(".thumbnail");
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.getElementById("close-icon");

thumbnails.forEach((thumbnail) => {
  thumbnail.addEventListener("click", () => {
    modal.classList.add("show");
    modalImg.src = thumbnail.src;
  });
});

closeBtn.addEventListener("click", () => {
  modal.classList.remove("show");
});
