function loadDynamicContent() {
    Promise.all([
        loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
        loadDynamicContentFor("/src/pages/json/profile-with-permission.json", loadProfile),
        loadDynamicContentFor("/src/templates/json/search-results.json", loadSearchResults),
        loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar)
    ]).catch(console.error);
}

async function loadProfile(data) {

}