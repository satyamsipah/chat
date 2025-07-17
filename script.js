const apiKey = "i can not write apikey here bcz i push this code on github";
const chatBox = document.getElementById("chat-box");

async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput) return;

  // Display user message
  chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;
  document.getElementById("user-input").value = "";

  // Call OpenAI API
  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userInput }],
    }),
  });

  const data = await response.json();

  const reply = data.choices?.[0]?.message?.content || "Oops! Something went wrong.";
  chatBox.innerHTML += `<div><strong>ChatGPT:</strong> ${reply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
