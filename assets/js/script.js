function simulateVitals() {
  document.getElementById("heartRate").innerText = `❤️ Heart Rate: ${randomBetween(60, 100)} bpm`;
  document.getElementById("spo2").innerText = `🩸 SPO2: ${randomBetween(95, 100)} %`;
  document.getElementById("stress").innerText = `😓 Stress Level: ${randomBetween(10, 80)} %`;
  document.getElementById("steps").innerText = `👣 Steps Count: ${randomBetween(1000, 10000)}`;
  document.getElementById("calories").innerText = `🔥 Calories Burnt: ${randomBetween(100, 600)} kcal`;
  document.getElementById("temp").innerText = `🌡️ Temperature: ${randomBetween(36, 38)} °C`;
  document.getElementById("ecg").innerText = `📈 Live ECG: Normal`;
}

function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
