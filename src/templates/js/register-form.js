async function loadRegisterForm(data) {
  Promise.all([
    loadContentForField("username-field", data),
    loadContentForField("password-field", data),
    loadContentForField("password-2-field", data),
    loadContentFor(
      ".register-form-btn",
      "textContent",
      data,
      "register-form-btn",
    ),
  ]).catch(console.error);
}

async function setupRegisterForm() {
  setBtnRef(document, ".register-form-btn", "/PWM/src/pages/html/update.html");
}
