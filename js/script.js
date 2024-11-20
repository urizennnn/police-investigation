console.log("Hi");
function login(event) {
  event.preventDefault();
  const badgeNumber = document.querySelector('input[type="text"]').value;
  const password = document.querySelector('input[type="password"]').value;

  if (badgeNumber && password) {
    window.location.href = "dashboard.html";
  } else {
    alert("Please enter both Badge Number and Password");
  }
  return false;
}

function showAddCaseForm() {
  const formHtml = `
        <div class="modal">
            <div class="modal-content">
                <h3>Add New Case</h3>
                <form id="addCaseForm">
                    <input type="text" placeholder="Case Title" required>
                    <input type="date" placeholder="Case Date" required>
                    <select required>
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="pending">Pending</option>
                        <option value="closed">Closed</option>
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

  document
    .getElementById("addCaseForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Case Added Successfully!");
      closeModal();
    });
}

function showAddEvidenceForm() {
  const formHtml = `
        <div class="modal">
            <div class="modal-content">
                <h3>Add New Evidence</h3>
                <form id="addEvidenceForm">
                    <input type="text" placeholder="Case ID" required>
                    <input type="text" placeholder="Evidence Type" required>
                    <input type="text" placeholder="Location" required>
                    <select required>
                        <option value="">Select Status</option>
                        <option value="secured">Secured</option>
                        <option value="processing">Processing</option>
                        <option value="released">Released</option>
                    </select>
                    <textarea placeholder="Evidence Description"></textarea>
                    <div class="form-actions">
                        <button type="submit">Add Evidence</button>
                        <button type="button" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = formHtml;
  document.body.appendChild(modalDiv);

  document
    .getElementById("addEvidenceForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Evidence Added Successfully!");
      closeModal();
    });
}

function showAddOfficerForm() {
  const formHtml = `
        <div class="modal">
            <div class="modal-content">
                <h3>Add New Officer</h3>
                <form id="addOfficerForm">
                    <input type="text" placeholder="Badge Number" required>
                    <input type="text" placeholder="Full Name" required>
                    <select required>
                        <option value="">Select Rank</option>
                        <option value="officer">Officer</option>
                        <option value="detective">Detective</option>
                        <option value="sergeant">Sergeant</option>
                        <option value="lieutenant">Lieutenant</option>
                    </select>
                    <select required>
                        <option value="">Select Status</option>
                        <option value="active">On Duty</option>
                        <option value="inactive">Off Duty</option>
                        <option value="leave">On Leave</option>
                    </select>
                    <input type="email" placeholder="Email" required>
                    <div class="form-actions">
                        <button type="submit">Add Officer</button>
                        <button type="button" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = formHtml;
  document.body.appendChild(modalDiv);

  document
    .getElementById("addOfficerForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Officer Added Successfully!");
      closeModal();
    });
}

function showAddReportForm() {
  const formHtml = `
        <div class="modal">
            <div class="modal-content">
                <h3>Create New Report</h3>
                <form id="addReportForm">
                    <input type="text" placeholder="Case ID" required>
                    <select required>
                        <option value="">Select Report Type</option>
                        <option value="investigation">Investigation Report</option>
                        <option value="progress">Progress Report</option>
                        <option value="final">Final Report</option>
                    </select>
                    <textarea placeholder="Report Summary" required></textarea>
                    <input type="date" placeholder="Report Date" required>
                    <select required>
                        <option value="">Select Status</option>
                        <option value="draft">Draft</option>
                        <option value="submitted">Submitted</option>
                        <option value="approved">Approved</option>
                    </select>
                    <div class="form-actions">
                        <button type="submit">Create Report</button>
                        <button type="button" onclick="closeModal()">Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    `;

  const modalDiv = document.createElement("div");
  modalDiv.innerHTML = formHtml;
  document.body.appendChild(modalDiv);

  document
    .getElementById("addReportForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Report Created Successfully!");
      closeModal();
    });
}

function closeModal() {
  const modal = document.querySelector(".modal");
  if (modal) {
    modal.remove();
  }
}

const modalStyles = `
    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }

    .modal-content {
        background: white;
        padding: 30px;
        border-radius: 10px;
        width: 100%;
        max-width: 500px;
        max-height: 90vh;
        overflow-y: auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .modal-content h3 {
        margin-bottom: 20px;
        color: var(--primary-color);
        text-align: center;
    }

    .form-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 20px;
    }

    .form-actions button {
        width: 48%;
    }
`;

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
                        <option value="active" ${caseData.status === "active" ? "selected" : ""}>Active</option>
                        <option value="pending" ${caseData.status === "pending" ? "selected" : ""}>Pending</option>
                        <option value="closed" ${caseData.status === "closed" ? "selected" : ""}>Closed</option>
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

  document
    .getElementById("editCaseForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();
      updateCaseData(caseId);
      closeModal();
      refreshCasesTable();
    });
}

// Helper functions
function getCaseData(caseId) {
  // Fetch case data from your data source
  // For now, we'll use a simple object
  return {
    id: caseId,
    title: "Robbery Investigation",
    date: "2024-03-15",
    status: "active",
    description: "Investigating a robbery that occurred at the downtown bank.",
    officer: "Officer Johnson",
  };
}

function updateCaseData(caseId) {
  // Update case data in your data source
  // For now, we'll just log the updated data to the console
  const updatedTitle = document.querySelector(
    '#editCaseForm input[type="text"]',
  ).value;
  const updatedDate = document.querySelector(
    '#editCaseForm input[type="date"]',
  ).value;
  const updatedStatus = document.querySelector("#editCaseForm select").value;
  const updatedDescription = document.querySelector(
    "#editCaseForm textarea",
  ).value;

  console.log("Updated Case Data:", {
    id: caseId,
    title: updatedTitle,
    date: updatedDate,
    status: updatedStatus,
    description: updatedDescription,
  });
}

function refreshCasesTable() {
  // Refresh the cases table with updated data
  // You'll need to implement this function to update the UI
  console.log("Refreshing cases table...");
}
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = modalStyles;
document.head.appendChild(styleSheet);
