//WEB LOADING POINT
document.addEventListener("DOMContentLoaded", async function () {
  await loadStructure();
  await loadDynamicContent();
  setupTriggers();
});

// ############################
// # TEMPLATE LOADING SECTION #
// ############################
async function loadStructure() {
  return loadStructureForElem(document);
}

async function loadStructureForElem(htmlElement) {
  let promises = [];
  htmlElement.querySelectorAll("div").forEach((el) => {
    if (el === htmlElement) {
      return;
    }
    let template = neededTemplate(el);
    if (!(template === undefined)) {
      promises.push(loadHTMLandRecurse(el, template));
    }
  });
  return Promise.all(promises);
}

function neededTemplate(el) {
  return [...el.classList].find((c) => c.includes("template-"));
}

async function loadHTMLandRecurse(el, template) {
  await loadHTMLTo(templatePathOf(template), el.id);
  return loadStructureForElem(el);
}

function templatePathOf(template) {
  return "/src/templates/html/".concat(template.substring(9).concat(".html"));
}

async function loadHTMLTo(template, divId) {
  let div = document.getElementById(divId);
  let node = await loadHTML(template);
  div.appendChild(node);
}

async function loadHTML(url) {
  let response = await fetch(url);
  let text = await response.text();

  let template = document.createElement("template");
  template.innerHTML = text;
  return document.importNode(template.content, true);
}

// ###########################
// # CONTENT LOADING SECTION #
// ###########################
function loadDynamicContentFor(url, loadWith) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => loadWith(data))
    .catch(console.error);
}

async function loadContentForField(fieldId, data) {
  data = data[fieldId];
  let fieldElem = document.querySelector("#".concat(fieldId));
  Promise.all([
    loadContentForElem(fieldElem, ".display", "textContent", data, "display"),
    loadContentForElem(
      fieldElem,
      ".text-field",
      "placeholder",
      data,
      "placeholder",
    ),
  ]).catch(console.error);
}

async function loadContentFor(selector, attribute, data, data_name) {
  return loadContentForElem(document, selector, attribute, data, data_name);
}

async function loadContentForElem(
  htmlElement,
  selector,
  attribute,
  data,
  data_name,
) {
  let element = htmlElement.querySelector(selector);
  element[attribute] = data[data_name];
}

// ################################
// # TRIGGERS AND STORAGE SECTION #
// ################################

function setBtnRef(htmlElement, selector, href) {
  let btn = htmlElement.querySelector(selector);
  btn.addEventListener("click", () => {
    window.location.href = href;
  });
}

function getFieldValue(name) {
  return document.getElementById(name).querySelector("input").value;
}

function setLocal(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function getLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}

function getParam(name) {
  return new URLSearchParams(window.location.search).get(name);
}
