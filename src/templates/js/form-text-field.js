function consume(data) {
    data = data["form-text-field"];
    Promise.all([
        loadContentFor(".display", "textContent", data, "display"),
        loadContentFor(".text-field", "placeholder", data, "placeholder"),
    ]).catch((error) => console.error("Error:", error));
}