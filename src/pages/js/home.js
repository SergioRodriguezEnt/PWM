function loadDynamicContent() {
    Promise.all([
        loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
        loadDynamicContentFor("/src/pages/json/home.json", loadHome),
        loadDynamicContentFor("/src/templates/json/search-results.json", loadSearchResults),
        loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar)
    ]).catch(console.error);
}

async function loadHome(data) {

}