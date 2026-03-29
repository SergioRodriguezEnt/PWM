async function loadSearchBar(data) {
  Promise.all([
      loadContentFor(".searchbar-input", "placeholder", data, "searchbar-label"),
      loadContentFor(".searchbar-btn", "textContent", data, "searchbar-btn"),
  ]).catch(console.error);
}

async function setupSearchBar() {
  setBtnRef(document, ".searchbar-btn", "/PWM/src/pages/html/home.html");
}
