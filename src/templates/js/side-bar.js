async function loadSideBar(data) {}

async function setupSideBar() {
  setBtnRef(document, "#logo-btn", "/PWM/src/pages/html/search-with-user.html");
  setBtnRef(
    document,
    "#search-btn",
    "/PWM/src/pages/html/search-with-user.html",
  );
  setBtnRef(document, "#upload-btn", "/PWM/src/pages/html/upload.html");
  setBtnRef(document, "#settings-btn", "/PWM/src/pages/html/home.html?logout=true");
}
