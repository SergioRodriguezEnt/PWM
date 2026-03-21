function loadDynamicContent() {
    Promise.all([
        loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
        loadDynamicContentFor("/src/pages/json/home.json", loadHome),
        loadDynamicContentFor("/src/templates/json/search-results.json", loadSearchResults),
        loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar)
    ]).catch(console.error);
}

function setupTriggers() {
    Promise.all([
        setupTopBar(),
        setupHome()
    ]).catch(console.error);
}

async function loadHome(data) {

}

async function setupHome() {
    setBtnRef(document, "#search-btn", "/PWM/src/pages/html/search-no-user.html");
}