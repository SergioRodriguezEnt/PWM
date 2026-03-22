async function loadProfilePhoto(data) {}

async function setupProfilePhoto() {
  let user = getLocal("user");
  console.log(user.username);
  setBtnRef(
    document,
    ".boton-perfil",
    "/PWM/src/pages/html/profile.html?username="+user.username,
  );
}
