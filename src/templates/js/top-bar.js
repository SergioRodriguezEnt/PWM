async function loadTopBar(data) {
  let root = document.getElementById("topbar");
  let homeBtnData = data["home-btn"];
  Promise.all([
    loadContentForElem(root, "img", "src", homeBtnData, "src"),
    loadContentForElem(root, "img", "alt", homeBtnData, "alt"),
    loadContentForElem(
      root,
      "#to-login-btn",
      "textContent",
      data,
      "to-login-btn",
    ),
    loadContentForElem(
      root,
      "#register-btn",
      "textContent",
      data,
      "register-btn",
    ),
  ]).catch(console.error);
}

async function setupTopBar() {
  setBtnRef(document, "#home-btn", "/PWM/src/pages/html/home.html");
  setBtnRef(document, "#to-login-btn", "/PWM/src/pages/html/login.html");
  setBtnRef(document, "#register-btn", "/PWM/src/pages/html/register.html");
}
