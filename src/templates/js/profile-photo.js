async function loadProfilePhoto(data) {
  let username = getLocal("user").username;
  let user = await getUser(username);
  Promise.all([
    loadContentFor(".foto-circular", "src", user, "profile-photo"),
    loadContentFor(".foto-circular", "alt", data, "alt"),
  ]).catch(console.error);
}

async function setupProfilePhoto() {
  let user = getLocal("user");
  setBtnRef(
    document,
    ".boton-perfil",
    "/PWM/src/pages/html/profile.html?username=" + user.username,
  );
}
