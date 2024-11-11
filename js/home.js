// Example of simple login validation and redirect
document
  .getElementById("login-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Login successful!");
    window.location.href = "../html/dashboard.html";
  });

// Example for adding a new case
document
  .getElementById("add-case-form")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    alert("Case added successfully!");
    window.location.href = "dashboard.html";
  });
