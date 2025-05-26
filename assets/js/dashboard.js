function simulateVitals() {
  const hr = Math.floor(Math.random() * (120 - 60 + 1)) + 60;
  const spo2 = Math.floor(Math.random() * (100 - 90 + 1)) + 90;
  const temp = (36 + Math.random()).toFixed(1);
  
  document.getElementById("heartRate").textContent = `Heart Rate: ${hr} bpm`;
  document.getElementById("spo2").textContent = `SpO₂: ${spo2}%`;
  document.getElementById("temp").textContent = `Temperature: ${temp}°C`;
  document.getElementById("status").textContent = getStatus(hr, spo2, temp);
}

function getStatus(hr, spo2, temp) {
  if (hr > 110 || spo2 < 93 || temp > 38) return "Status: CRITICAL";
  if (hr > 100 || spo2 < 95) return "Status: WARNING";
  return "Status: STABLE";
}
