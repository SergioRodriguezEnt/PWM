function loadDynamicContent() {
    Promise.all([
        loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
        loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
        loadDynamicContentFor("/src/templates/json/outfit-view.json", loadOutfitView),
        loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar)
    ]).catch(console.error);
}

function setupTriggers() {
    Promise.all([
        setupTopBar(),
        setupSearchBar(),
        setupOutfitView()
    ]).catch(console.error);
}