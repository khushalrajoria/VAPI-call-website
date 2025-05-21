import Vapi from "@vapi-ai/web";

const vapi = new Vapi("923886ef-5652-4711-a6f7-e5bfef44d17d"); 

const assistantId = "378ed5a9-7b03-48c0-96c1-8ced880c6a60"; 

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
