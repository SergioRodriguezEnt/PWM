function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/top-bar.json", loadTopBar),
    loadDynamicContentFor("/src/templates/json/login-form.json", loadLoginForm),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  let user = getLocal("user");
  if (user) {
    window.location.href = "/PWM/src/pages/html/search-with-user.html";
    return;
  }
  Promise.all([setupTopBar(), setupLoginForm()]).catch(console.error);
}
