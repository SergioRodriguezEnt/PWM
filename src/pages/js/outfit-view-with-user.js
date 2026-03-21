function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor(
      "/src/templates/json/outfit-view.json",
      loadOutfitView,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupSideBar(),
    setupSearchBar(),
    setupProfilePhoto(),
    setupOutfitView(),
  ]).catch(console.error);
}
