async function loadDynamicContent() {
  return Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/pages/json/profile.json", loadProfile),
    loadDynamicContentFor("/src/resources/outfits.json", loadSearchResults),
    loadDynamicContentFor(
      "/src/templates/json/profile-photo.json",
      loadProfilePhoto,
    ),
    loadDynamicContentFor("/src/templates/json/bottom-bar.json", loadBottomBar),
  ]).catch(console.error);
}

function setupTriggers() {
  Promise.all([
    setupSideBar(),
    setupProfile(),
    setupProfilePhoto(),
    setupSearchResults(),
  ]).catch(console.error);
}

async function loadProfile(data) {}

async function setupProfile() {
  let profile_user = getParam("username");
  let user = getLocal("user");
  if (!user) {
    window.location.href = "/PWM/src/pages/html/login.html";
    return;
  }
  if (user.username === profile_user || user.role === "admin") {
    document.getElementById("sidebar-extra-btn").classList.remove("hidden");
    setBtnRef(
      document,
      "#sidebar-extra-btn",
      "/PWM/src/pages/html/update.html",
    );
    document.getElementById("boton-perfil").classList.add("hidden");
  }
}
