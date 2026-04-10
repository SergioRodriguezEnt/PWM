async function loadEditProfileForm(data) {
  let root = document.getElementById("profile-form");
  let username = getParam("username");
  let user = await getUser(username);
  Promise.all([
    loadContentFor("h1", "textContent", data, "title"),
    loadContentForElem(root, "img", "src", user, "profile-photo"),
    loadContentForElem(root, "img", "alt", data["profile-photo"], "alt"),
    loadContentForField("username-field", data),
    loadContentForField("password-field", data),
    loadContentForField("description-field", data),
    loadContentFor("#cancel-btn", "textContent", data, "cancel-btn"),
    loadContentFor("#save-btn", "textContent", data, "save-btn"),
  ]).catch(console.error);
}

async function setupEditProfileForm() {
  setBtnRef(
    document,
    "#cancel-btn",
    "/PWM/src/pages/html/profile.html?username=" + getParam("username"),
  );
}
