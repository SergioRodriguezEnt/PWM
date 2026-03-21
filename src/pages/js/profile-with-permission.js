function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/pages/json/profile-with-permission.json",
      loadProfile,
    ),
    loadDynamicContentFor(
      "/src/templates/json/search-results.json",
      loadSearchResults,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar(), setupProfile()]).catch(console.error);
}

async function loadProfile(data) {}

async function setupProfile() {
  setBtnRef(document, "#sidebar-extra-btn", "/PWM/src/pages/html/update.html");
}
