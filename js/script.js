const PRICE_PER_CIGARETTE = 1.5;
const APPROVAL_PASSWORD = "FFMR5";
const STORAGE_KEY = "cigarette-credit-records";

const form = document.getElementById("creditForm");
const customerNameInput = document.getElementById("customerName");
const quantityInput = document.getElementById("quantity");
const liveTotal = document.getElementById("liveTotal");
const statusMessage = document.getElementById("statusMessage");
const recordsBody = document.getElementById("recordsBody");
const recordCount = document.getElementById("recordCount");
const totalCredit = document.getElementById("totalCredit");

let records = loadRecords();

function formatCurrency(amount) {
  return `K${amount.toFixed(2)}`;
}

function calculateTotal(quantity) {
  return quantity * PRICE_PER_CIGARETTE;
}

function loadRecords() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveRecords() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
}

function setStatus(message, type = "") {
  statusMessage.textContent = message;
  statusMessage.className = "status";
  if (type) {
    statusMessage.classList.add(type);
  }
}

function refreshLiveTotal() {
  const quantity = Number(quantityInput.value) || 0;
  liveTotal.textContent = formatCurrency(calculateTotal(quantity));
}

function renderRecords() {
  recordsBody.innerHTML = "";

  if (!records.length) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = "<td colspan='3'>No records yet.</td>";
    recordsBody.appendChild(emptyRow);
  } else {
    for (const entry of records) {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${entry.name}</td>
        <td>${entry.quantity}</td>
        <td>${formatCurrency(entry.total)}</td>
      `;
      recordsBody.appendChild(row);
    }
  }

  const totalRecords = records.length;
  const combinedCredit = records.reduce((sum, entry) => sum + entry.total, 0);
  recordCount.textContent = String(totalRecords);
  totalCredit.textContent = formatCurrency(combinedCredit);
}

quantityInput.addEventListener("input", refreshLiveTotal);

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = customerNameInput.value.trim();
  const quantity = Number(quantityInput.value);

  if (!name) {
    setStatus("Please enter customer name.", "error");
    return;
  }

  if (!Number.isInteger(quantity) || quantity <= 0) {
    setStatus("Quantity must be a positive whole number.", "error");
    return;
  }

  const password = prompt("Approval required. Enter password to save record:");
  if (password !== APPROVAL_PASSWORD) {
    setStatus("Approval failed. Record not saved.", "error");
    return;
  }

  const total = calculateTotal(quantity);
  records.push({ name, quantity, total });
  saveRecords();
  renderRecords();

  form.reset();
  refreshLiveTotal();
  setStatus("Record approved and saved.", "success");
});

refreshLiveTotal();
renderRecords();
