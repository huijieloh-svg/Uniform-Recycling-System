// ===============================
// ADMIN SETUP (CHANGE NAMES HERE)
// ===============================
const admins = ["admin1", "admin2"];

// ===============================
// DATABASE (Local Storage)
// ===============================
let users = JSON.parse(localStorage.getItem("users")) || [];
let uniforms = JSON.parse(localStorage.getItem("uniforms")) || [];
let currentUser = localStorage.getItem("currentUser");

// Check admin status
function isAdmin() {
  return admins.includes(currentUser);
}

// ===============================
// LOGIN SYSTEM
// ===============================
function login() {
  const username = document.getElementById("username").value.trim();

  if (!username) {
    alert("Please enter a username");
    return;
  }

  if (!users.includes(username)) {
    users.push(username);
    localStorage.setItem("users", JSON.stringify(users));
  }

  localStorage.setItem("currentUser", username);
  currentUser = username;

  showApp();
}

function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// ===============================
// SHOW APP AFTER LOGIN
// ===============================
function showApp() {
  document.getElementById("loginSection").style.display = "none";
  document.getElementById("appSection").style.display = "block";

  document.getElementById("currentUser").textContent =
    currentUser + (isAdmin() ? " (Admin)" : "");

  displayUniforms();
}

// Auto-login
if (currentUser) {
  showApp();
}

// ===============================
// ADD UNIFORM
// ===============================
function addUniform() {
  const name = document.getElementById("uniformName").value.trim();
  const size = document.getElementById("uniformSize").value.trim();
  const price = document.getElementById("uniformPrice").value;

  if (!name || !size) {
    alert("Please fill in all fields");
    return;
  }

  uniforms.push({
    name: name,
    size: size,
    price: price == 0 ? "Donation" : "RM " + price,
    owner: currentUser
  });

  localStorage.setItem("uniforms", JSON.stringify(uniforms));
  displayUniforms();
}

// ===============================
// DISPLAY UNIFORMS
// ===============================
function displayUniforms() {
  const list = document.getElementById("uniformList");
  list.innerHTML = "";

  uniforms.forEach((u, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <strong>${u.name}</strong><br>
      Size: ${u.size}<br>
      Type: ${u.price}<br>
      Listed by: ${u.owner}<br>

      <button onclick="claimUniform(${index})">
        ${u.price === "Donation" ? "Request" : "Buy"}
      </button>

      ${isAdmin() ? `<button onclick="removeUniform(${index})">Remove</button>` : ""}
    `;

    list.appendChild(li);
  });
}

// ===============================
// CLAIM / BUY UNIFORM
// ===============================
function claimUniform(index) {
  alert("Request recorded. Please contact the owner.");

  uniforms.splice(index, 1);
  localStorage.setItem("uniforms", JSON.stringify(uniforms));
  displayUniforms();
}

// ===============================
// ADMIN REMOVE
// ===============================
function removeUniform(index) {
  if (!confirm("Admin: Remove this listing?")) return;

  uniforms.splice(index, 1);
  localStorage.setItem("uniforms", JSON.stringify(uniforms));
  displayUniforms();
}
