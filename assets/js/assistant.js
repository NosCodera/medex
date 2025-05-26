const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();

const userInput = document.getElementById("userInput");
const askButton = document.getElementById("askButton");
const speakButton = document.getElementById("speakButton");
const assistantOutput = document.getElementById("assistantOutput");
const voiceAnimation = document.getElementById("voiceAnimation");

recognition.onstart = () => {
  assistantOutput.textContent = "Listening...";
  voiceAnimation.style.display = "block";
};

recognition.onend = () => {
  voiceAnimation.style.display = "none";
};

recognition.onresult = (event) => {
  const transcript = event.results[0][0].transcript;
  assistantOutput.innerHTML = `<strong>You said:</strong> ${transcript}<br><br>Searching for relevant details...<br><em>(Simulated)</em>`;
};

askButton.addEventListener("click", () => {
  const text = userInput.value.trim();
  if (text) {
    assistantOutput.innerHTML = `<strong>You asked:</strong> ${text}<br><br>Searching for relevant details...<br><em>(Simulated)</em>`;
  } else {
    assistantOutput.textContent = "Please enter a question.";
  }
});

speakButton.addEventListener("click", () => {
  recognition.start();
});
