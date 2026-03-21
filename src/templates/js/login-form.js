async function loadLoginForm(data) {
  return Promise.all([
    loadContentFor("#login-btn", "textContent", data, "login-btn"),
    loadContentForField("user-field", data),
    loadContentForField("password-field", data),
  ]).catch((error) => console.error("Error:", error));
}

async function setupLoginForm() {
  setBtnRef(document, "#login-btn", "/PWM/src/pages/html/search-with-user.html");
}