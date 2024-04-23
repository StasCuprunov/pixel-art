function generateGrid() {
    $(document).ready(function () {
        let grid = document.getElementById(GRID_ID);
        let pixelLength = calculateDefaultPixelLength();
        let gridRow;

        let indexBorder = getIndexBorder();
        for (let index = 0; index < indexBorder; index++) {
            let id = generatePixelId(index);

            let isFirstRow = isPixelFirstRow(index);
            let isLastRow = isPixelLastRow(index);
            let isLastColumn = isPixelLastColumn(index);

            if (isFirstRow) {
                gridRow = document.createElement("div");
            }

            let pixel= createPixel(id, pixelLength, isLastRow, isLastColumn);
            gridRow.appendChild(pixel);

            if (isLastRow) {
                grid.appendChild(gridRow);
            }
        }
    });
}

function resetGrid() {
    document.getElementById(FILL_ID).checked = false;
    setDisableForPixelColor(false);

    if (localStorage.getItem(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY) === "true") {
        removeGrid();
        generateGrid();
        adjustPixelSizeInputAfterResetGrid();
        localStorage.setItem(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY, "");
    }
    else {
        colorAllPixelsToDefaultColor();
    }
}

function createPixel(id, pixelLength, isLastRow, isLastColumn) {
    let pixel= document.createElement("div");
    pixel.setAttribute("id", id);

    let classValue = "pixel";
    if (isLastRow) {
        classValue = addClassAsString(classValue, "last-row");
    }
    if (isLastColumn) {
        classValue = addClassAsString(classValue, "last-column");
    }

    pixel.setAttribute("class", classValue);
    let numberOfPixelsAsCSS = numberOfPixelsAsString(pixelLength);
    pixel.style.height = numberOfPixelsAsCSS;
    pixel.style.width = numberOfPixelsAsCSS;
    pixel.setAttribute("onclick",  onClickValueColorPixel(id));

    return pixel;
}

function removeGrid() {
    let gridContainer = document.getElementById(GRID_ID);
    gridContainer.textContent = '';
}

function adjustPixelSizeInputAfterResetGrid() {
    setMaximumFromAdjustPixelSize();
    setDefaultValueFromAdjustPixelSize();
}

function colorAllPixelsToDefaultColor() {
    let listOfPixels = document.getElementById(GRID_ID).querySelectorAll(".pixel");

    for (let index = 0; index < listOfPixels.length; index++) {
        listOfPixels[index].style.backgroundColor = "#ffffff";
    }
}

function colorPixel(id) {
    let color = document.getElementById(PIXEL_COLOR_ID).value;

    let pixelButton = document.getElementById(id);
    pixelButton.style.backgroundColor = color;
}

function calculateDefaultPixelLength() {
    return Math.floor(getMaximumPixelSize() * 0.5);
}

function isPixelLastRow(index) {
    let lastRow = sizeOfGrid() - 1;
    return whichRowIsIndex(index) === lastRow;
}

function isPixelFirstRow(index) {
    let firstRow = 0;
    return whichRowIsIndex(index) === firstRow;
}

function isPixelLastColumn(index) {
    let lastColumn = sizeOfGrid() - 1;
    return whichColumnIsIndex(index) === lastColumn;
}