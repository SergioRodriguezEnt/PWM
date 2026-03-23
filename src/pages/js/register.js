function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/templates/json/register-form.json", loadRegisterForm),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupTopBar(),
    setupRegisterForm(),
  ]).catch(console.error);
}
