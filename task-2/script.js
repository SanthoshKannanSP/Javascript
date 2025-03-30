let ansDisplay = document.getElementById("ans-display");
let realtimeDisplay = document.getElementById("realtime-display");
let lastAns = 0;

function appendToDisplay(value) {
  // If ANS button was pressed, set the value as the last calculation answer
  if (value == "ANS") {
    value = String(lastAns);
  }

  // If the display only has zero, replace it. Else append to the display.
  if (ansDisplay.innerText === "0") {
    ansDisplay.innerText = value;
  } else {
    ansDisplay.innerText += value;
  }

  // Calculate the output of the displayed equation and display it
  try {
    realtimeDisplay.innerText = eval(ansDisplay.innerHTML);
  } catch {
    realtimeDisplay.innerHTML = "Error";
  }
}

function clearDisplay() {
  ansDisplay.innerText = "0";
  realtimeDisplay.innerText = "0";
}

function deleteLast() {
  // Remove the last character from display. If display becomes empty string, default to zero
  ansDisplay.innerText = ansDisplay.innerText.slice(0, -1) || "0";

  // Calculate the output of the displayed equation and display it
  try {
    realtimeDisplay.innerText = eval(ansDisplay.innerHTML);
  } catch {
    realtimeDisplay.innerHTML = "Error";
  }
}

function calculateResult() {
  // Evaluate the displayed equation. Set the last answer as the evaluated output
  try {
    lastAns = eval(ansDisplay.innerText);
    ansDisplay.innerText = lastAns;
  } catch {
    ansDisplay.innerText = "Error";
  }
}
