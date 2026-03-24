async function loadEditProfileForm(data) {
  let root = document.getElementById('profile-form');
  Promise.all([
    loadContentFor("h1", "textContent", data, "title"),
    loadContentForElem(root, "img", "src", data["profile-photo"], "src"),
    loadContentForElem(root, "img", "alt", data["profile-photo"], "alt"),
    loadContentForField("username-field", data),
    loadContentForField("password-field", data),
    loadContentForField("description-field", data),
    loadContentFor("#cancel-btn", "textContent", data, "cancel-btn"),
    loadContentFor("#save-btn", "textContent", data, "save-btn"),
  ]).catch(console.error);
}

async function setupEditProfileForm() {}
