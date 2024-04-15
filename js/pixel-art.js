function generateGridSizeOptions() {
    var listOfGridSizes = [8, 12, 16, 32];

    var gridSizeContainer = document.getElementById("gridSize");

    listOfGridSizes.forEach((size) => {
        var option = document.createElement("option");
        option.setAttribute("value", size);
        option.innerHTML = size + " x " + size;
        gridSizeContainer.appendChild(option);
    });
}