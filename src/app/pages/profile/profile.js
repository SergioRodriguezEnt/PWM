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

async function loadProfile(data) {
  let user_name = getParam("username");
  let user = await getUser(user_name);
  Promise.all([
    loadContentFor("#mini-avatar", "src", user, "profile-photo"),
    loadContentFor("#mini-avatar", "alt", data["mini-avatar"], "alt"),
    loadContentFor("#page-title", "textContent", user, "username"),
    loadSubtabs(data["subtabs"]),
  ]).catch(console.error);
}

async function loadSubtabs(data) {
  let subtabs = document.querySelectorAll(".subtab");
  let subtabData = 0;
  for (let elem of subtabs) {
    elem.textContent = data[subtabData++];
  }
}

async function setupProfile() {
  let profile_user = getParam("username");
  let user = getLocal("user");
  if (!user) {
    window.location.href = "../login/login.html";
    return;
  }
  if (user.username === profile_user || user.role === "admin") {
    document.getElementById("sidebar-extra-btn").classList.remove("hidden");
    setBtnRef(
      document,
      "#sidebar-extra-btn",
      "/PWM/src/pages/html/update.html?username=" + profile_user,
    );
    document.getElementById("boton-perfil").classList.add("hidden");
  }
}
