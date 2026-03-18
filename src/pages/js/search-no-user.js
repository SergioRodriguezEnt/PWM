function loadDynamicContent() {
    Promise.all([
        loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
        loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
        loadDynamicContentFor("/src/templates/json/search-results.json", loadSearchResults),
        loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar)
    ]).catch(console.error);
}