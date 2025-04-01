const userInput = document.getElementById("user-input");
const chatWindow = document.getElementById("chat-window");

function sendMessage() {
  const messageText = userInput.value.trim();
  if (messageText === "") return;

  // Create a new user message and append it to chat window
  const userMessage = document.createElement("div");
  userMessage.className = "message user-message";
  userMessage.innerHTML = `<p>${messageText}</p><span class="timestamp">${getTimestamp()}</span>`;
  chatWindow.appendChild(userMessage);

  // Reset the user input field
  userInput.value = "";

  // Scroll down to the user message
  chatWindow.scrollTop = chatWindow.scrollHeight;

  setTimeout(() => {
    // Create a new respondent message and append it to chat window
    const respondentMessage = document.createElement("div");
    respondentMessage.className = "message respondent-message";
    respondentMessage.innerHTML = `<p>This is a response to: "${messageText}"</p><span class="timestamp">${getTimestamp()}</span>`;
    chatWindow.appendChild(respondentMessage);

    // Scroll down to the respondent message
    chatWindow.scrollTop = chatWindow.scrollHeight;
  }, 2000);
}

function getTimestamp() {
  const now = new Date();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  const period = hours >= 12 ? "pm" : "am";
  hours = hours % 12;
  hours = hours === 0 ? 12 : hours; // hour 0 should be hour 12
  hours = String(hours).padStart(2, "0"); // left pad with zeroes to make the hour two digit
  minutes = String(minutes).padStart(2, "0"); // left pad with zeroes to make the minute two digit
  return `${hours}:${minutes} ${period}`;
}
