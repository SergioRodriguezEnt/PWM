function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/pages/json/profile-no-permission.json",
      loadProfile,
    ),
    loadDynamicContentFor(
      "/src/templates/json/search-results.json",
      loadSearchResults,
    ),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar(), setupProfilePhoto()]).catch(console.error);
}

async function loadProfile(data) {}
