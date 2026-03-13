document.addEventListener("DOMContentLoaded", async function () {
  await loadStructure();
  loadDynamicContent(consume);
});

function consume(data) {
  data = data["edit-profile-form"];
  Promise.all([
    loadContentFor("h1", "textContent", data, "title"),
    loadContentFor("img", ["src"], data, "profile-photo"),
    loadContentForField("username-field", data),
    loadContentForField("xx-field", data),
    loadContentForField("description-field", data),
    loadContentFor("#x-btn", "textContent", data, "x-btn"),
    loadContentFor("#xx-btn", "textContent", data, "xx-btn"),
    loadContentFor("#xxx-btn", "textContent", data, "xxx-btn"),
  ]).catch((error) => console.error("Error:", error));
}

async function loadContentForField(fieldId, data) {
  data = data[fieldId];
  let fieldElem = document.querySelector(
    "#".concat(fieldId, "-template-form-text-field"),
  );
  Promise.all([
    loadContentForElem(fieldElem, ".display", "textContent", data, "display"),
    loadContentForElem(
      fieldElem,
      ".text-field",
      "placeholder",
      data,
      "placeholder",
    ),
  ]).catch((error) => console.error("Error:", error));
}
