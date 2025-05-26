function randomBetween(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function simulateVitalsForDate(date) {
  return {
    date,
    heartRate: `${randomBetween(60, 100)} bpm`,
    spo2: `${randomBetween(95, 100)}%`,
    stress: `${randomBetween(10, 80)}%`,
    steps: `${randomBetween(1000, 10000)}`,
    calories: `${randomBetween(100, 600)} kcal`,
    temperature: `${randomBetween(36, 38)} °C`,
    ecg: "Normal"
  };
}

let fullData = [];
let currentPage = 1;
const pageSize = 20;

function generateReport() {
  const from = new Date(document.getElementById("fromDate").value);
  const to = new Date(document.getElementById("toDate").value);
  if (isNaN(from) || isNaN(to) || from > to) {
    alert("Please select a valid date range.");
    return;
  }

  fullData = [];
  let date = new Date(from);
  while (date <= to) {
    fullData.push(simulateVitalsForDate(date.toISOString().slice(0, 10)));
    date.setDate(date.getDate() + 1);
  }

  currentPage = 1;
  renderTable();
}

function renderTable() {
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageData = fullData.slice(start, end);

  let html = `<table class="report-table">
    <thead>
      <tr>
        <th>Date</th>
        <th>Heart Rate</th>
        <th>SPO2</th>
        <th>Stress</th>
        <th>Steps</th>
        <th>Calories</th>
        <th>Temp</th>
        <th>ECG</th>
        <th>Download</th>
      </tr>
    </thead>
    <tbody>`;

  pageData.forEach(row => {
    html += `<tr>
      <td>${row.date}</td>
      <td>${row.heartRate}</td>
      <td>${row.spo2}</td>
      <td>${row.stress}</td>
      <td>${row.steps}</td>
      <td>${row.calories}</td>
      <td>${row.temperature}</td>
      <td>${row.ecg}</td>
      <td><i class="fas fa-download download-icon" onclick="downloadRow('${row.date}', ${JSON.stringify(row).replace(/"/g, '&quot;')})"></i></td>
    </tr>`;
  });

  html += `</tbody></table>`;

  html += `<div class="pagination">
    <button onclick="prevPage()" ${currentPage === 1 ? "disabled" : ""}>&lt; Prev</button>
    <span>Page ${currentPage} of ${Math.ceil(fullData.length / pageSize)}</span>
    <button onclick="nextPage()" ${end >= fullData.length ? "disabled" : ""}>Next &gt;</button>
  </div>`;

  document.getElementById("reportTableContainer").innerHTML = html;
}

function prevPage() {
  if (currentPage > 1) {
    currentPage--;
    renderTable();
  }
}

function nextPage() {
  if ((currentPage * pageSize) < fullData.length) {
    currentPage++;
    renderTable();
  }
}

function downloadRow(date, data) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();
  pdf.text(`Vitals Report for ${date}`, 10, 10);
  let y = 30;
  for (const key in data) {
    if (key !== "date") {
      pdf.text(`${key.charAt(0).toUpperCase() + key.slice(1)}: ${data[key]}`, 10, y);
      y += 10;
    }
  }
  pdf.save(`Report_${date}.pdf`);
}
