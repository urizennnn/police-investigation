document.addEventListener("DOMContentLoaded", async () => {
  const URL = [`http://localhost:3000/api`];
  const updateDashboard = async () => {
    try {
      const response = await fetch(`${URL[0]}/dashboard`);
      if (!response.ok) {
        alert("Failed to fetch dashboard details");
        throw new Error("Failed to fetch dashboard details");
      }

      const {
        openCasesCount,
        onDutyOfficersCount,
        totalEvidenceCount,
        pendingReportsCount,
        recentCases,
      } = await response.json();

      document.getElementById("openCasesCount").textContent = openCasesCount;
      document.getElementById("onDutyOfficersCount").textContent =
        onDutyOfficersCount;
      document.getElementById("totalEvidenceCount").textContent =
        totalEvidenceCount;
      document.getElementById("pendingReportsCount").textContent =
        pendingReportsCount;

      const recentCasesTable = document.getElementById("recentCasesTable");
      recentCasesTable.innerHTML = "";

      if (recentCases.length > 0) {
        recentCases.forEach((caseItem) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${caseItem.id}</td>
            <td>${caseItem.title}</td>
            <td>${caseItem.officer ? caseItem.officer.name : "Unassigned"}</td>
            <td>${caseItem.status}</td>
          `;
          recentCasesTable.appendChild(row);
        });
      } else {
        recentCasesTable.innerHTML = `<tr><td colspan="4">No recent cases found.</td></tr>`;
      }
    } catch (error) {
      console.error("Error updating dashboard:", error);
    }
  };

  updateDashboard();
});
