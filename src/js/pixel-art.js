function generateGridSizeOptions() {
    let listOfGridSizes = [8, 12, 16, 32];

    let gridSizeContainer = document.getElementById(GRID_SIZE_ID);

    listOfGridSizes.forEach((size) => {
        let option = document.createElement("option");
        option.setAttribute("value", size);
        option.innerHTML = size + " x " + size;
        gridSizeContainer.appendChild(option);
    });
    $(document).ready(function () {
       setLocalStorageGridSizeKey();
    });
}

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

function onChangeGridSize() {
    localStorage.setItem(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY, true);
    triggerModalReset();
    setLocalStorageGridSizeKey();
}

function triggerModalReset() {
    if (isMinimumOnePixelColored()) {
        document.getElementById(MODAL_RESET_ID).hidden = false;
    }
    else {
        resetGrid();
    }
}

function triggerResetButtonFromModal() {
    resetGrid();
    setLocalStorageGridSizeKey();
    hideModalReset();
}

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

function generateFileTypeOptions() {
    let listOfFileTypes = ["gif", "jpg", "png"];

    let fileTypeContainer = document.getElementById(FILE_TYPE_ID);

    listOfFileTypes.forEach((fileType) => {
        let option = document.createElement("option");
        option.setAttribute("value", fileType);
        option.innerHTML = fileType.toUpperCase();
        fileTypeContainer.appendChild(option);
    });
}

function initializeAdjustPixelSize() {

    $(document).ready(function () {
        setMinimumFromAdjustPixelSize();
        setMaximumFromAdjustPixelSize();
        setDefaultValueFromAdjustPixelSize();
    });
}

function adaptPixelSizeFromGrid() {
    let newPixelSize = document.getElementById(ADJUST_PIXEL_SIZE_INPUT_ID).value;

    let indexBorder = getIndexBorder();
    for (let index = 0; index < indexBorder; index++) {
        let id = generatePixelId(index);

        let pixel = document.getElementById(id);

        pixel.style.width = numberOfPixelsAsString(newPixelSize);
        pixel.style.height = numberOfPixelsAsString(newPixelSize);
    }

}

function submit() {
    makeScreenshotOfPixelPicture();
    resetDownloadInputs();
}

function resetDownloadInputs() {
    document.getElementById(FILE_NAME_ID).value = "";
    setSelectToFirstOption(FILE_TYPE_ID);
}

function setSelectToFirstOption(id) {
    document.getElementById(id).value = document.getElementById(id).options[0].value;
}

function makeScreenshotOfPixelPicture() {
    let fileName = $(jQueryId(FILE_NAME_ID)).val();
    let fileType = $(jQueryId(FILE_TYPE_ID)).val();

    let fullFileName = fileName + "." + fileType;

    let gridContainer = $(jQueryId(GRID_ID));
    // [0] is necessary
    html2canvas(gridContainer[0]).then((canvas) => {
        canvas.toBlob(function (blob) {
            window.saveAs(blob, fullFileName);
        });
    });
}

function colorPixel(id) {
    let color = document.getElementById(PIXEL_COLOR_ID).value;

    let pixelButton = document.getElementById(id);
    pixelButton.style.backgroundColor = color;
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

function sizeOfGrid() {
    return Number(document.getElementById(GRID_SIZE_ID).value);
}

function changeColorFromPixel(index, color) {
    document.getElementById(generatePixelId(index)).style.backgroundColor = color;
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
    let size = sizeOfGrid();
    return size * size;
}

function whichColumnIsIndex(index) {
    return Math.floor(index / sizeOfGrid());
}

function whichRowIsIndex(index) {
    return index % sizeOfGrid();
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

function generatePixelId(index) {
    return PREFIX_PIXEL_ID + index;
}

function onClickValueColorPixel(id) {
    return "colorPixel('" + id + "')";
}

function onClickValueFillAdjacentPixels(id) {
    return "fillAdjacentPixels('" + id + "')";
}

function calculateDefaultPixelLength() {
    return Math.floor(getMaximumPixelSize() * 0.5);
}

function getGridContainerWidth() {
    return document.getElementById(GRID_CONTAINER_ID).offsetWidth;
}

function getSizeOfBorderPixelsFromGrid() {
    return sizeOfGrid() + 1;
}

function jQueryId(id) {
    return "#" + id;
}

function numberOfPixelsAsString(numberOfPixels) {
    return numberOfPixels + "px";
}

function removeGrid() {
    let gridContainer = document.getElementById(GRID_ID);
    gridContainer.textContent = '';
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

function addClassAsString(classList, newClass) {
    return classList + " " + newClass;
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

function setLocalStorageGridSizeKey() {
    if (document.getElementById(MODAL_RESET_ID).hidden) {
        localStorage.setItem(GRID_SIZE_OLD_KEY, document.getElementById(GRID_SIZE_ID).value);
    }
}

function hideModalReset() {
    document.getElementById(MODAL_RESET_ID).hidden = true;
}

function cancelModalReset() {
    document.getElementById(GRID_SIZE_ID).value = localStorage.getItem(GRID_SIZE_OLD_KEY);
    hideModalReset();
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

function isMinimumOnePixelColored() {
    let listOfPixels = document.getElementById(GRID_ID).querySelectorAll(".pixel");

    for (let index = 0; index < listOfPixels.length; index++) {
        let backgroundColor = listOfPixels[index].style.backgroundColor;
        if (backgroundColor !== "" && backgroundColor !== "rgb(255, 255, 255)") {
            return true;
        }
    }
    return false;
}

function colorAllPixelsToDefaultColor() {
    let listOfPixels = document.getElementById(GRID_ID).querySelectorAll(".pixel");

    for (let index = 0; index < listOfPixels.length; index++) {
        listOfPixels[index].style.backgroundColor = "#ffffff";

    }
}

function getMaximumPixelSize() {
    let availableWidthForPixels = getGridContainerWidth() - getSizeOfBorderPixelsFromGrid();
    return Math.floor(availableWidthForPixels / sizeOfGrid());
}

function setMinimumFromAdjustPixelSize() {
    let minimum = 2;
    let adjustPixelSizeInput = document.getElementById(ADJUST_PIXEL_SIZE_INPUT_ID);
    let adjustPixelSizeRange = document.getElementById(ADJUST_PIXEL_SIZE_RANGE_ID);

    adjustPixelSizeInput.min = minimum;
    adjustPixelSizeRange.querySelector(".min").innerText = minimum;
}

function setMaximumFromAdjustPixelSize() {
    let maximum = getMaximumPixelSize();
    let adjustPixelSizeInput = document.getElementById(ADJUST_PIXEL_SIZE_INPUT_ID);
    let adjustPixelSizeRange = document.getElementById(ADJUST_PIXEL_SIZE_RANGE_ID);

    adjustPixelSizeInput.max = maximum;
    adjustPixelSizeRange.querySelector(".max").innerText = maximum;
}

function setDefaultValueFromAdjustPixelSize() {
    let adjustPixelSizeInput = document.getElementById(ADJUST_PIXEL_SIZE_INPUT_ID);
    adjustPixelSizeInput.value = calculateDefaultPixelLength();
}

function adjustPixelSizeInputAfterResetGrid() {
    setMaximumFromAdjustPixelSize();
    setDefaultValueFromAdjustPixelSize();
}
