function generateGrid() {
    $(document).ready(function () {
        let grid = getGrid();
        let gridRow;

        let indexBorder = getIndexBorder();
        for (let index = 0; index < indexBorder; index++) {
            if (isPixelFirstRow(index)) {
                gridRow = createElementInDocument("div");
            }

            gridRow.appendChild(createPixel(index));

            if (isPixelLastRow(index)) {
                grid.appendChild(gridRow);
            }
        }
    });
}

function resetGrid() {
    resetTools();

    if (isTriggeredByChangingGridSize()) {
        createNewGrid();
    }
    else {
        colorAllPixelsToDefaultColor();
    }
}

function createNewGrid() {
    removeGrid();
    generateGrid();
    adjustPixelSizeInputAfterResetGrid();
    resetKeyIsTriggeredByChangingGridSize();
}

function createPixel(index) {
    let pixel = createElementInDocument("div");

    let id = generatePixelId(index);

    pixel.setAttribute("id", id);
    pixel.setAttribute("class", createClassValueFromPixel(index));
    setPixelSize(pixel, calculateDefaultPixelLength());
    pixel.setAttribute("onclick", onClickValueColorPixel(id));

    return pixel;
}

function removeGrid() {
    getGrid().textContent = '';
}

function adjustPixelSizeInputAfterResetGrid() {
    setMaximumFromAdjustPixelSize();
    setDefaultValueFromAdjustPixelSize();
}

function colorAllPixelsToDefaultColor() {
    let listOfPixels = getGrid().querySelectorAll(".pixel");

    for (let index = 0; index < listOfPixels.length; index++) {
        listOfPixels[index].style.backgroundColor = DEFAULT_PIXEL_COLOR_HEXADEZIMAL;
    }
}

function colorPixel(idFromPixel) {
    let pixel = getElementByIdFromDocument(idFromPixel);
    pixel.style.backgroundColor = getPixelColor().value;
}

function createClassValueFromPixel(index) {
    let classValue = "pixel";
    if (isPixelLastRow(index)) {
        classValue = addClassAsString(classValue, "last-row");
    }
    if (isPixelLastColumn(index)) {
        classValue = addClassAsString(classValue, "last-column");
    }
    return classValue;
}

function setPixelSize(pixel, pixelLength) {
    let lengthAsString = numberOfPixelsAsString(pixelLength);
    pixel.style.height = lengthAsString;
    pixel.style.width = lengthAsString;
}

function resetTools() {
    getFill().checked = false;
    setDisableForPixelColor(false);
}

function isTriggeredByChangingGridSize() {
    return getItemFromLocalStorage(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY) === "true";
}

function resetKeyIsTriggeredByChangingGridSize() {
    setItemFromLocalStorage(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY, "");
}

function calculateDefaultPixelLength() {
    return Math.floor(getMaximumPixelSize() * 0.5);
}

function isPixelLastRow(index) {
    return whichRowIsIndex(index) === lastRowNumber();
}

function isPixelFirstRow(index) {
    return whichRowIsIndex(index) === firstRowNumber();
}

function isPixelLastColumn(index) {
    return whichColumnIsIndex(index) === lastColumnNumber();
}

function getGrid() {
    return getElementByIdFromDocument(GRID_ID);
}

function getGridWithJQuery() {
    return getElementByIdFromDocumentWithJQuery(GRID_ID);
}