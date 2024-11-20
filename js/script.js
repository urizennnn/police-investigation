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

const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = modalStyles;
document.head.appendChild(styleSheet);
