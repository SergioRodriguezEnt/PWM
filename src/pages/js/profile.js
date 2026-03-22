function loadDynamicContent() {
  Promise.all([
    loadDynamicContentFor("/src/templates/json/side-bar.json", loadSideBar),
    loadDynamicContentFor("/src/pages/json/profile.json", loadProfile),
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
  Promise.all([setupSideBar(), setupProfile(), setupProfilePhoto()]).catch(
    console.error,
  );
}

async function loadProfile(data) {}

async function setupProfile() {
  let params = new URLSearchParams(window.location.search);
  let profile_user = params.get("username");
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
    document
      .getElementById("boton-perfil-template-profile-photo")
      .classList.add("hidden");
  }
}
