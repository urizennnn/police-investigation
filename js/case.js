async function getOfficersbyId(id) {
  try {
    const response = await fetch(`${URL[0]}/officer/fetch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        number: id,
      }),
    });

    if (!response.ok) {
      alert("There was an issue getting officers");
      throw new Error("Failed to fetch officers");
    }

    const officers = await response.json();
    return officers;
  } catch (error) {
    console.error("Error fetching officers:", error);
    return [];
  }
}

async function fetchOfficers() {
  try {
    const response = await fetch(`${URL[0]}/officer`);
    if (!response.ok) {
      alert("There was an issue getting officers");
      throw new Error("Failed to fetch officers");
    }
    const officers = await response.json();
    return officers;
  } catch (error) {
    console.error("Error fetching officers:", error);
    return [];
  }
}

async function showAddCaseForm() {
  const officers = await fetchOfficers();
  console.log(officers);

  const officerOptions = officers.result
    .map(
      (officer) =>
        `<option value="${officer.badgeNumber}">${officer.name} (${officer.badgeNumber})</option>`,
    )
    .join("");

  const formHtml = `
    <div class="modal">
        <div class="modal-content">
            <h3>Add New Case</h3>
            <form id="addCaseForm">
                <input type="text" placeholder="Custom Case ID" id="case-id" required>
                <input type="text" placeholder="Case Title" required>
                <input type="date" placeholder="Case Date" required>
                <select required>
                    <option value="">Select Status</option>
                    <option value="OPEN">OPEN</option>
                    <option value="CLOSED">CLOSED</option>
                </select>
                <select id="case-officer" required>
                    <option value="">Select Assigned Officer</option>
                    ${officerOptions}
                </select>
                <textarea placeholder="Case Description" required></textarea>
                <div class="form-actions">
                    <button type="submit">Add Case</button>
                    <button type="button" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>
  `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = formHtml;
  document.body.appendChild(modalDiv);

  const addCaseForm = document.getElementById("addCaseForm");
  if (addCaseForm) {
    addCaseForm.addEventListener("submit", async function (e) {
      e.preventDefault();
      const caseId = document.getElementById("case-id").value; // Get the custom case ID
      const title = document.querySelector(
        '#addCaseForm input[type="text"]',
      ).value;
      const date = document.querySelector(
        '#addCaseForm input[type="date"]',
      ).value;
      const status = document.querySelector(
        "#addCaseForm select:nth-of-type(1)",
      ).value;
      console.log(status);
      const officerId = document.getElementById("case-officer").value;
      const description = document.querySelector("#addCaseForm textarea").value;
      const officer = getOfficersbyId(officerId);
      console.log(officerId);
      try {
        const response = await fetch(`${URL[0]}/case/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            caseId, // Include the custom case ID in the request body
            title,
            date,
            status,
            officerId,
            description,
          }),
        });

        if (response.ok) {
          alert("Case Added Successfully!");
          closeModal();
          window.location.reload();
        } else {
          alert("Failed to add case. Please try again.");
        }
      } catch (error) {
        console.error("Error adding case:", error);
        alert("An error occurred while adding the case.");
      }
    });
  }
}
// Helper functions
function showViewCaseModal(caseId) {
  const caseData = getCaseData(caseId);

  const modalHtml = `
    <div class="modal">
        <div class="modal-content">
            <h3>Case Details</h3>
            <div class="case-details">
                <p><strong>Case ID:</strong> ${caseData.id}</p>
                <p><strong>Title:</strong> ${caseData.title}</p>
                <p><strong>Date:</strong> ${caseData.date}</p>
                <p><strong>Status:</strong> ${caseData.status}</p>
                <p><strong>Description:</strong> ${caseData.description}</p>
                <p><strong>Assigned Officer:</strong> ${caseData.officer}</p>
            </div>
            <div class="form-actions">
                <button type="button" onclick="closeModal()">Close</button>
            </div>
        </div>
    </div>
  `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = modalHtml;
  document.body.appendChild(modalDiv);
}

function showEditCaseForm(caseId) {
  const caseData = getCaseData(caseId);

  const modalHtml = `
    <div class="modal">
        <div class="modal-content">
            <h3>Edit Case</h3>
            <form id="editCaseForm">
                <input type="text" placeholder="Case Title" value="${caseData.title}" required>
                <input type="date" placeholder="Case Date" value="${caseData.date}" required>
                <select required>
                    <option value="">Select Status</option>
                    <option value="OPEN" ${caseData.status === "OPEN" ? "selected" : ""}>OPEN</option>
                    <option value="CLOSED" ${caseData.status === "CLOSED" ? "selected" : ""}>CLOSED</option>
                </select>
                <textarea placeholder="Case Description" required>${caseData.description}</textarea>
                <div class="form-actions">
                    <button type="submit">Save Changes</button>
                    <button type="button" onclick="closeModal()">Cancel</button>
                </div>
            </form>
        </div>
    </div>
  `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = modalHtml;
  document.body.appendChild(modalDiv);

  const editCaseForm = document.getElementById("editCaseForm");
  if (editCaseForm) {
    editCaseForm.addEventListener("submit", function (e) {
      e.preventDefault();
      updateCaseData(caseId);
      closeModal();
      refreshCasesTable();
    });
  }
}
async function fetchCases() {
  try {
    const response = await fetch(`${URL[0]}/case`);
    if (!response.ok) {
      alert("There was an issue fetching cases");
      throw new Error("Failed to fetch cases");
    }
    const cases = await response.json();
    updateCasesTable(cases);
  } catch (error) {
    console.error("Error fetching cases:", error);
  }
}

function updateCasesTable(cases) {
  const tableBody = document.querySelector("#casesTable tbody");
  if (!tableBody) {
    console.error("Table body element not found.");
    return;
  }

  // Clear the table before adding new rows
  tableBody.innerHTML = "";

  // Add rows for each case
  cases.forEach((caseItem) => {
    const row = document.createElement("tr");

    const caseIdCell = document.createElement("td");
    caseIdCell.textContent = caseItem.caseId;
    row.appendChild(caseIdCell);

    const titleCell = document.createElement("td");
    titleCell.textContent = caseItem.title;
    row.appendChild(titleCell);

    const dateCell = document.createElement("td");
    dateCell.textContent = caseItem.date;
    row.appendChild(dateCell);

    const statusCell = document.createElement("td");
    statusCell.textContent = caseItem.status;
    row.appendChild(statusCell);

    const actionsCell = document.createElement("td");
    actionsCell.innerHTML = `
      <button onclick="viewCase('${caseItem.caseId}')">View</button>
      <button onclick="editCase('${caseItem.caseId}')">Edit</button>
    `;
    row.appendChild(actionsCell);

    tableBody.appendChild(row);
  });
}

function viewCase(caseId) {
  showViewCaseModal(caseId);
}

function editCase(caseId) {
  showEditCaseForm(caseId);
}

// Call the fetchCases function when the page loads to populate the cases
window.addEventListener("DOMContentLoaded", fetchCases);
