async function loadEditProfileForm(data) {
  Promise.all([
    loadContentFor("h1", "textContent", data, "title"),
    loadContentFor("img", ["src"], data, "profile-photo"),
    loadContentForField("username-field", data),
    loadContentForField("xx-field", data),
    loadContentForField("description-field", data),
    loadContentFor("#xx-btn", "textContent", data, "xx-btn"),
    loadContentFor("#xxx-btn", "textContent", data, "xxx-btn"),
  ]).catch((error) => console.error("Error:", error));
}

async function setupEditProfileForm() {}
