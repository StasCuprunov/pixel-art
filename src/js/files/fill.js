function changeTool() {
    let isDisabled;
    let onClickValue;
    let isFillToolActive = document.getElementById(FILL_ID).checked;

    if (isFillToolActive) {
        isDisabled = true;
    }
    else {
        isDisabled = false;
    }
    setDisableForPixelColor(isDisabled);

    let indexBorder = getIndexBorder();
    for (let index = 0; index < indexBorder; index++) {
        let id = generatePixelId(index);

        if (isFillToolActive) {
            onClickValue = onClickValueFillAdjacentPixels(id);
        }
        else {
            onClickValue = onClickValueColorPixel(id);
        }
        document.getElementById(id).onclick = new Function(onClickValue);
    }
}

function fillAdjacentPixels(id) {
    let fillColor = document.getElementById(id).style.backgroundColor;

    let indexFillPixel = Number(id.replace(PREFIX_PIXEL_ID, ""));

    fillAdjacentPixelsIfFillPixelIsNotInFirstColumn(indexFillPixel, fillColor);
    fillAdjacentPixelsIfFillPixelIsNotInLastColumn(indexFillPixel, fillColor);
    fillAdjacentPixelIfFillPixelIsNotFirstRow(indexFillPixel, fillColor);
    fillAdjacentPixelIfFillPixelIsNotLastRow(indexFillPixel, fillColor);
}

function fillAdjacentPixelsIfFillPixelIsNotInFirstColumn(indexFillPixel, fillColor) {
    let columnFromFillIndex = whichColumnIsIndex(indexFillPixel);

    if (columnFromFillIndex !== firstColumnNumber()) {
        changeColorFromPixel(indexTopFromPixel(indexFillPixel), fillColor);
        let rowFromFillIndex = whichRowIsIndex(indexFillPixel);

        if (rowFromFillIndex !== firstRowNumber()) {
            changeColorFromPixel(indexTopLeftFromPixel(indexFillPixel), fillColor);
        }

        if (rowFromFillIndex !== lastRowNumber()) {
            changeColorFromPixel(indexTopRightFromPixel(indexFillPixel), fillColor);
        }
    }
}

function fillAdjacentPixelsIfFillPixelIsNotInLastColumn(indexFillPixel, fillColor) {
    let columnFromFillIndex = whichColumnIsIndex(indexFillPixel);
    if (columnFromFillIndex !== lastColumnNumber()) {
        changeColorFromPixel(indexBottomFromPixel(indexFillPixel), fillColor);

        let rowFromFillIndex = whichRowIsIndex(indexFillPixel);
        if (rowFromFillIndex !== firstRowNumber()) {
            changeColorFromPixel(indexBottomLeftFromPixel(indexFillPixel), fillColor);
        }

        if (rowFromFillIndex !== lastRowNumber()) {
            changeColorFromPixel(indexBottomRightFromPixel(indexFillPixel), fillColor);
        }
    }
}

function fillAdjacentPixelIfFillPixelIsNotFirstRow(indexFillPixel, fillColor) {
    let rowFromFillIndex = whichRowIsIndex(indexFillPixel);
    if (rowFromFillIndex !== firstRowNumber()) {
        changeColorFromPixel(indexLeftFromPixel(indexFillPixel), fillColor);
    }
}

function fillAdjacentPixelIfFillPixelIsNotLastRow(indexFillPixel, fillColor) {
    let rowFromFillIndex = whichRowIsIndex(indexFillPixel);
    if (rowFromFillIndex !== lastRowNumber()) {
        changeColorFromPixel(indexRightFromPixel(indexFillPixel), fillColor);
    }
}

function changeColorFromPixel(index, color) {
    document.getElementById(generatePixelId(index)).style.backgroundColor = color;
}

function setDisableForPixelColor(isDisabled) {
    $(jQueryId(PIXEL_COLOR_ID)).prop("disabled", isDisabled);

    let cursorValue, opacityValue;

    if (isDisabled) {
        cursorValue = "not-allowed";
        opacityValue = 0.6;
    }
    else {
        cursorValue = "pointer";
        opacityValue = 1;
    }

    document.getElementById(PIXEL_COLOR_ID).style.cursor = cursorValue;
    document.getElementById(PIXEL_COLOR_ID).style.opacity = opacityValue;
}

function whichColumnIsIndex(index) {
    return Math.floor(index / sizeOfGrid());
}

function whichRowIsIndex(index) {
    return index % sizeOfGrid();
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

function firstRowNumber() {
    return 0;
}

function lastRowNumber() {
    return sizeOfGrid() - 1;
}

function firstColumnNumber() {
    return 0;
}

function lastColumnNumber() {
    return sizeOfGrid() - 1;
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