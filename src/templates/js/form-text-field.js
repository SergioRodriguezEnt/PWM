document.querySelectorAll(".form-text-field").forEach((el) => {
    el.addEventListener("DOMContentLoaded", async function () {
        await loadStructure();
        loadDynamicContent(consume);
    });
});

function consume(data) {
    data = data["form-text-field"];
    Promise.all([
        loadContentFor(".display", "textContent", data, "display"),
        loadContentFor(".text-field", "placeholder", data, "placeholder"),
    ]).catch((error) => console.error("Error:", error));
}