async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/templates/json/search-bar.json", loadSearchBar),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupSideBar(),
    setupSearchBar(),
    setupSearchResults(),
    setupProfilePhoto(),
  ]).catch(console.error);
}
