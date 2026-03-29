async function loadSideBar(data) {
  Promise.all([
    loadContentForBtnImg("logo-btn", data),
    loadContentForBtnImg("search-btn", data),
    loadContentForBtnImg("upload-btn", data),
    loadContentForBtnImg("notifications-btn", data),
    loadContentForBtnImg("sidebar-extra-btn", data),
    loadContentForBtnImg("settings-btn", data),
  ]).catch(console.error);
}

async function setupSideBar() {
  setBtnRef(document, "#logo-btn", "/PWM/src/pages/html/search-with-user.html");
  setBtnRef(
    document,
    "#search-btn",
    "/PWM/src/pages/html/search-with-user.html",
  );
  setBtnRef(document, "#upload-btn", "/PWM/src/pages/html/upload.html");
  setBtnRef(
    document,
    "#settings-btn",
    "/PWM/src/pages/html/home.html?logout=true",
  );
}
