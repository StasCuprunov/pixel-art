function generateGridSizeOptions() {
    let listOfGridSizes = [8, 12, 16, 32];

    let gridSizeContainer = document.getElementById(GRID_SIZE_ID);

    listOfGridSizes.forEach((size) => {
        let option = document.createElement("option");
        option.setAttribute("value", size);
        option.innerHTML = size + " x " + size;
        gridSizeContainer.appendChild(option);
    });
}

function generateGrid() {
    let size = sizeOfGrid();
    let lastColumn = size - 1;
    let indexBorder = size * size;

    let gridContainer = document.getElementById(GRID_ID);

    for (let index = 0; index < indexBorder; index++) {
        let id = generatePixelId(index)

        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", id);
        input.setAttribute("name", GRID_ID);
        input.setAttribute("onClick", "colorPixel('" + id + "')");
        gridContainer.appendChild(input);

        let isLastColumn = (index % size) === lastColumn;
        if (isLastColumn) {
            let lineBreak = document.createElement("br");
            gridContainer.appendChild(lineBreak);
        }
    }
}

function resetGrid() {
    // remove grid
    let gridContainer = document.getElementById(GRID_ID);
    gridContainer.textContent = '';

    generateGrid();
}

function changeTool() {
    let valueFromOnClick;
    let prefixValueFromOnClick;
    let suffixValueFromOnClick = "')";
    let isFillToolActive = document.getElementById("fill").checked;

    if (isFillToolActive) {
        document.getElementById(PIXEL_COLOR_ID).disabled = true;
        prefixValueFromOnClick = "fillAdjacentPixels('";
    }
    else{
        document.getElementById(PIXEL_COLOR_ID).setAttribute("disabled", "");
        prefixValueFromOnClick = "colorPixel('";
    }
    for (let index = 0; index < getIndexBorder(); index++) {
        let id = generatePixelId(index);
        valueFromOnClick = prefixValueFromOnClick + id + suffixValueFromOnClick;
        document.getElementById(id).onclick = valueFromOnClick;
    }
}

function colorPixel(id) {
    let color = document.getElementById(PIXEL_COLOR_ID).value;

    let pixelButton = document.getElementById(id);
    pixelButton.style.backgroundColor = color;
}

function fillAdjacentPixels(id) {
    let fillColor = document.getElementById(id).getAttribute("background-color");

    let indexFillPixel = id.replace(PREFIX_PIXEL_ID, "");
    if (!Number.isInteger(indexFillPixel)) {
        return;
    }

    const FIRST_ROW = 0;
    const LAST_ROW = sizeOfGrid() - 1;
    const FIRST_COLUMN = 0;
    const LAST_COLUMN = sizeOfGrid() - 1;

    let rowFromFillIndex = whichRowIsIndex(indexFillPixel);
    let columnFromFillIndex = whichColumnIsIndex(indexFillPixel);

    if (rowFromFillIndex !== FIRST_ROW) {
        changeColorFromPixel(indexTopFromPixel(indexFillPixel), fillColor);

        if (columnFromFillIndex !== FIRST_COLUMN) {
            changeColorFromPixel(indexTopLeftFromPixel(indexFillPixel), fillColor);
        }

        if (columnFromFillIndex !== LAST_COLUMN) {
            changeColorFromPixel(indexTopRightFromPixel(indexFillPixel), fillColor);
        }
    }
    if (rowFromFillIndex !== LAST_ROW) {
        changeColorFromPixel(indexBottomFromPixel(indexFillPixel), fillColor);

        if (columnFromFillIndex !== FIRST_COLUMN) {
            changeColorFromPixel(indexBottomLeftFromPixel(indexFillPixel), fillColor);
        }

        if (columnFromFillIndex !== LAST_COLUMN) {
            changeColorFromPixel(indexBottomRightFromPixel(indexFillPixel), fillColor);
        }
    }
    if (columnFromFillIndex !== FIRST_COLUMN) {
        changeColorFromPixel(indexLeftFromPixel(indexFillPixel), fillColor);
    }
    if (columnFromFillIndex !== LAST_COLUMN) {
        changeColorFromPixel(indexRightFromPixel(indexFillPixel), fillColor);
    }
}

function sizeOfGrid() {
    return document.getElementById(GRID_SIZE_ID).value;
}

function changeColorFromPixel(index, color) {
    document.getElementById(generatePixelId(index)).backgroundColor = color;
}

function indexTopFromPixel(index) {
    return index - sizeOfGrid();
}

function indexRightFromPixel(index) {
    return index + 1;
}

function indexBottomFromPixel(index) {
    return index + sizeOfGrid();
}

function indexLeftFromPixel(index) {
    return index - 1;
}

function indexTopLeftFromPixel(index) {
    return indexLeftFromPixel(indexTopFromPixel(index));
}

function indexTopRightFromPixel(index) {
    return indexRightFromPixel(indexTopFromPixel(index));
}

function indexBottomRightFromPixel(index) {
    return indexRightFromPixel(indexBottomFromPixel(index));
}

function indexBottomLeftFromPixel(index) {
    return indexLeftFromPixel(indexBottomFromPixel(index));
}

function getIndexBorder() {
    let sizeOfGrid = sizeOfGrid();
    return sizeOfGrid * sizeOfGrid;
}

function whichRowIsIndex(index) {
    return Math.floor(index / sizeOfGrid());
}

function whichColumnIsIndex(index) {
    return index % sizeOfGrid();
}

function generatePixelId(index) {
    return PREFIX_PIXEL_ID + index;
}
