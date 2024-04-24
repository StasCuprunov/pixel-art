function generateGridSizeOptions() {
    let listOfGridSizes = [8, 12, 16, 32];
    createSelect(GRID_SIZE_ID, listOfGridSizes, createInnerHtmlFromGridSizeSelect);

    $(document).ready(function () {
        setLocalStorageGridSizeKey();
    });
}

function onChangeGridSize() {
    setKeyIsTriggeredByChangingGridSizeTrue();
    triggerModalReset();
    setLocalStorageGridSizeKey();
}

function sizeOfGrid() {
    return Number(getGridSize().value);
}

function createInnerHtmlFromGridSizeSelect(size) {
    return size + " x " + size;
}

function setLocalStorageGridSizeKey() {
    if (getModalReset().hidden) {
        actualizeKeyGridSizeOld();
    }
}

function setKeyIsTriggeredByChangingGridSizeTrue() {
    setItemFromLocalStorage(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY, true);
}

function actualizeKeyGridSizeOld() {
    setItemFromLocalStorage(GRID_SIZE_OLD_KEY, getGridSize().value);
}

function getGridSize() {
    return getElementByIdFromDocument(GRID_SIZE_ID);
}