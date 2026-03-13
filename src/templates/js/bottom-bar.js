document.addEventListener("DOMContentLoaded", async function () {
  loadDynamicContent(consume);
});

function consume(data) {
  data = data["bottom-bar"];
  for (let section of document.querySelectorAll(".bottombar-section")) {
    loadSectionData(section, data);
  }
}

function loadSectionData(section, data) {
  let sectionData = data[section.id];
  if (!sectionData) {
    console.error("No se encontró la section " + section.id + " en el JSON");
    return;
  }
  let titleElement = section.querySelector(".bottombar-h3");
  titleElement.textContent = sectionData.title;
  let ulElement = section.querySelector(".bottombar-ul");
  sectionData.items.forEach((item) => {
    let li = document.createElement("li");
    li.textContent = item;
    ulElement.appendChild(li);
  });
}
