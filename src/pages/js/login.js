document.addEventListener("DOMContentLoaded", async function () {
  await loadStructure();
  await Promise.all([
    loadDynamicContent("/src/resources/content.json", loadTopBar),
    loadDynamicContent("/src/resources/content.json", loadLoginForm),
    loadDynamicContent("/src/resources/content.json", loadBottomBar),
  ]);
});
