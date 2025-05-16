import Vapi from "@vapi-ai/web";

const vapi = new Vapi("765dc027-5278-4520-a631-987b5d47af0d"); // Replace with your actual public API key

const assistantId = "6c2a2334-2e0d-4752-9a21-7b5e8b1939f9"; // Your assistant ID

const messagesDiv = document.getElementById("messages");
const userInput = document.getElementById("user-input");
const sendButton = document.getElementById("send-button");

// Function to append messages to the chat
function appendMessage(role, content) {
  const messageElement = document.createElement("div");
  messageElement.textContent = `${role}: ${content}`;
  messagesDiv.appendChild(messageElement);
}

// Start the assistant
vapi.start(assistantId).then(() => {
  console.log("Assistant started");
});

// Handle assistant responses
vapi.on("message", (msg) => {
  if (msg.message?.role === "assistant") {
    appendMessage("Assistant", msg.message.content);
  }
});

// Send user message
sendButton.addEventListener("click", () => {
  const text = userInput.value;
  if (text.trim() === "") return;

  appendMessage("You", text);

  vapi.send({
    type: "add-message",
    message: {
      role: "user",
      content: text,
    },
  });

  userInput.value = "";
});
