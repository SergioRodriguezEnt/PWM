async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/pages/json/home.json", loadHome),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupTopBar(),
    setupHome(),
    setupSearchResults(),
  ]).catch(console.error);
}

async function loadHome(data) {}

async function setupHome() {
  if (getParam("logout") === "true") {
    setLocal("user", null);
  }
  setBtnRef(document, "#search-btn", "/PWM/src/pages/html/search-no-user.html");
}
