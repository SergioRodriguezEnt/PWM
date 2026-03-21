function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor(
      "/src/templates/json/edit-profile-form.json",
      loadEditProfileForm,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([setupSideBar(), setupEditProfileForm()]).catch(console.error);
}
