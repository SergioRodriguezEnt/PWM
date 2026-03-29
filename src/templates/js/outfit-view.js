async function loadTags(titleSection, outfit) {
  titleSection.querySelector("p").textContent = outfit["tags"].join(" ");
}

async function loadOutfitView(data) {
  let id = getParam("id");
  let outfit = data.filter((outfit) => outfit.id === id)[0];
  let root = document.querySelector(".tarjeta-gris");
  root.dataset.user = outfit.user;
  let user = await getUser(outfit.user);
  let titleSection = root.querySelector("#title-tags");
  let descriptionSection = root.querySelector("#description");
  Promise.all([
    loadContentForElem(titleSection, "h2", "textContent", outfit, "title"),
    loadTags(titleSection, outfit),
    descriptionSection.querySelector("h2").textContent = "Descripción",
    loadContentForElem(descriptionSection, "p", "textContent", outfit, "description"),
    loadContentForElem(root, ".imagen-principal", "src", outfit, "src"),
    loadContentForElem(
      root,
      ".nombre-autor",
      "textContent",
      outfit,
      "user",
    ),
    loadContentForElem(
      root.querySelector(".boton-autor"),
      "img",
      "src",
      user,
      "profile-photo",
    ),
  ]).catch(console.error);
}

async function setupOutfitView() {
  let root = document.querySelector(".tarjeta-gris");
  setBtnRef(
    document,
    ".boton-autor",
    "/PWM/src/pages/html/profile.html?username=" + root.dataset.user,
  );
}
