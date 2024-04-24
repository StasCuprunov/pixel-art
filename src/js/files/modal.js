function triggerModalReset() {
    if (isMinimumOnePixelColored()) {
        getModalReset().hidden = false;
    }
    else {
        resetGrid();
    }
}

function triggerResetButtonFromModal() {
    resetGrid();
    hideModalReset();
}

function cancelModalReset() {
    hideModalReset();
    setGridSizeToOldValue();
}

function hideModalReset() {
    getModalReset().hidden = true;
    resetKeyIsTriggeredByChangingGridSize();
}

function isMinimumOnePixelColored() {
    let listOfPixels = getGrid().querySelectorAll(".pixel");
    let listOfPixelsLength = listOfPixels.length;

    for (let index = 0; index < listOfPixelsLength; index++) {
        let backgroundColor = listOfPixels[index].style.backgroundColor;
        if ((backgroundColor !== "") && (backgroundColor !== DEFAULT_PIXEL_COLOR_RGB)) {
            return true;
        }
    }
    return false;
}

function setGridSizeToOldValue() {
    getGridSize().value = getItemFromLocalStorage(GRID_SIZE_OLD_KEY);
}

function getModalReset() {
    return getElementByIdFromDocument(MODAL_RESET_ID);
}