function generateGridSizeOptions() {
    let listOfGridSizes = [8, 12, 16, 32];

    let gridSizeContainer = document.getElementById("gridSize");

    listOfGridSizes.forEach((size) => {
        let option = document.createElement("option");
        option.setAttribute("value", size);
        option.innerHTML = size + " x " + size;
        gridSizeContainer.appendChild(option);
    });
}

function generateGrid() {
    let size = document.getElementById("gridSize").value;
    let lastColumn = size - 1;
    let indexBorder = size * size;

    let gridContainer = document.getElementById("grid");

    for (let index = 0; index < indexBorder; index++) {
        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", "pixel-" + index);
        input.setAttribute("name", "grid");
        gridContainer.appendChild(input);

        let isLastColumn = (index % size) === lastColumn;
        if (isLastColumn) {
            let lineBreak = document.createElement("br");
            gridContainer.appendChild(lineBreak);
        }
    }
}

function changeGrid() {
    // remove grid
    let gridContainer = document.getElementById("grid");
    gridContainer.textContent = '';

    generateGrid();
}