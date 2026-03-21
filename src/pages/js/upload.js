function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/templates/json/outfit-upload-form.json",
      loadOutfitUploadForm,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar()]).catch(console.error);
}
