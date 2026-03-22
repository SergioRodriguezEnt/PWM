async function loadLoginForm(data) {
  return Promise.all([
    loadContentFor("#login-btn", "textContent", data, "login-btn"),
    loadContentForField("user-field", data),
    loadContentForField("password-field", data),
  ]).catch((error) => console.error("Error:", error));
}

async function setupLoginForm() {
  document.getElementById("login-btn").addEventListener("click", async (e) => {
    e.preventDefault();

    let username = getFieldValue("user-field");
    let password = getFieldValue("password-field");

    console.log(username, password);

    let match = await fetch("/src/resources/users.json")
        .then(res => res.json())
        .then(data => data.find(u => u.username === username && u.password === password));

    if (match) {
      setLocal("user", JSON.stringify({ username: match.username, role: match.role}));
      window.location.href ="/PWM/src/pages/html/search-with-user.html";
    } else {
      alert("Invalid username or password")
    }
  });
}
