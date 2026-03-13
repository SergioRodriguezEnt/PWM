async function loadStructure() {
    document.querySelectorAll('div').forEach(el => {
        if (needsTemplate(el.id)) {
            loadHTMLTo(neededTemplate(el.id), el.id);
        }
    })
}

function needsTemplate(id) {
    return id.includes('-template-');
}

function neededTemplate(id) {
    return id.substring(id.indexOf('-template-')+10, id.length);
}

async function loadHTMLTo(template, divId) {
    let div = document.getElementById(divId);
    let node = await loadHTML("/src/templates/html/".concat(template, ".html"));
    div.appendChild(node);
}

async function loadHTML(url) {
    let response = await fetch(url);
    let text = await response.text();

    let template = document.createElement('template');
    template.innerHTML = text;
    return document.importNode(template.content, true);
}

function loadDynamicContent(consume) {
    fetch('/src/resources/content.json')
        .then(response => response.json())
        .then(data => consume(data))
        .catch(error => console.error('Error:', error));
}

async function loadContentFor(selector, attribute, data, data_name) {
    return loadContentForElem(document, selector, attribute, data, data_name)
}

async function loadContentForElem(htmlElement, selector, attribute, data, data_name) {
    let element = htmlElement.querySelector(selector)
    element[attribute] = data[data_name]
}