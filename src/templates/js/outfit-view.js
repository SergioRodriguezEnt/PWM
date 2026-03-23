async function loadOutfitView(data) {
  let id = getParam("id");
  let outfit = data.filter((outfit) => outfit.id === id)[0];
  let root = document.querySelector(".tarjeta-gris");
  root.dataset.user = outfit.user;
  await loadContentForElem(root, ".imagen-principal", "src", outfit, "src");
  await loadContentForElem(root, ".nombre-autor", "textContent", outfit, "user");
  let user = await getUser(outfit.user);
  await loadContentForElem(root.querySelector(".boton-autor"), "img", "src", user, "profile-photo");

}

async function setupOutfitView() {
  let root = document.querySelector(".tarjeta-gris");
  setBtnRef(document, ".boton-autor", "/PWM/src/pages/html/profile.html?username="+root.dataset.user);
}

async function getUser(name) {
  return fetch("/src/resources/users.json")
      .then(res => res.json())
      .then(users => users.filter(user => user.username === name)[0])
      .catch(console.error);
}