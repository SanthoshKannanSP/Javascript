const items = document.querySelectorAll(".item");
const list = document.querySelector(".list");

items.forEach((item) => {
  item.addEventListener("dragstart", () => {
    item.classList.add("dragging");
  });
  item.addEventListener("dragend", () => {
    item.classList.remove("dragging");
  });
});

list.addEventListener("dragover", (event) => {
  event.preventDefault();

  const belowItem = findBelowItem(event.clientY);
  const currentItem = document.querySelector(".dragging");

  if (belowItem) {
    list.insertBefore(currentItem, belowItem);
  } else {
    list.appendChild(currentItem);
  }
});

function findBelowItem(mouseY) {
  const potentialItems = document.querySelectorAll(".item:not(.dragging)");

  let belowTask = null;
  let closestDistance = Number.NEGATIVE_INFINITY;

  potentialItems.forEach((item) => {
    const { top } = item.getBoundingClientRect();
    distance = mouseY - top;

    if (distance < 0 && distance > closestDistance) {
      belowTask = item;
      closestDistance = distance;
    }
  });

  return belowTask;
}
