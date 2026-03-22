document.addEventListener("DOMContentLoaded", async function () {
  await loadStructure();
  loadDynamicContent();
  setupTriggers();
});

async function loadStructure() {
  return loadStructureForElem(document);
}

async function loadStructureForElem(htmlElement) {
  let promises = [];
  htmlElement.querySelectorAll("div").forEach((el) => {
    if (el === htmlElement) {
      return;
    }
    if (needsTemplate(el.id)) {
      promises.push(loadHTMLandRecurse(el));
    }
  });
  return Promise.all(promises);
}

async function loadHTMLandRecurse(el) {
  await loadHTMLTo(neededTemplate(el.id), el.id);
  return loadStructureForElem(el);
}

function needsTemplate(id) {
  return id.includes("-template-");
}

function neededTemplate(id) {
  return id.substring(id.indexOf("-template-") + 10, id.length);
}

async function loadHTMLTo(template, divId) {
  let div = document.getElementById(divId);
  let node = await loadHTML("/src/templates/html/".concat(template, ".html"));
  div.appendChild(node);
}

async function loadHTML(url) {
  let response = await fetch(url);
  let text = await response.text();

  let template = document.createElement("template");
  template.innerHTML = text;
  return document.importNode(template.content, true);
}

function loadDynamicContentFor(url, loadWith) {
  return fetch(url)
    .then((response) => response.json())
    .then((data) => loadWith(data))
    .catch(console.error);
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

function setBtnRef(htmlElement, selector, href) {
  let btn = htmlElement.querySelector(selector);
  btn.addEventListener("click", () => {
    window.location.href = href;
  });
}

function getFieldValue(name) {
  return document.getElementById(name.concat("-template-form-text-field")).querySelector("input").value;
}

function setLocal(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

function getLocal(name) {
  return JSON.parse(localStorage.getItem(name));
}