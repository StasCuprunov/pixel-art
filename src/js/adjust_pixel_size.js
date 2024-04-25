function initializeAdjustPixelSize() {
    $(document).ready(function () {
        setMinimumFromAdjustPixelSize();
        setMaximumFromAdjustPixelSize();
        setDefaultValueFromAdjustPixelSize();
    });
}

function adaptPixelSizeFromGrid() {
    let newPixelSize = getAdjustPixelSizeInput().value;

    let indexBorder = getIndexBorder();
    for (let index = 0; index < indexBorder; index++) {
        setPixelSize(getPixel(index), newPixelSize);
    }
}

function setMinimumFromAdjustPixelSize() {
    let minimum = 2;

    getAdjustPixelSizeInput().min = minimum;
    getAdjustPixelSizeRange().querySelector(".min").innerText = minimum;
}

function setMaximumFromAdjustPixelSize() {
    let maximum = getMaximumPixelSize();

    getAdjustPixelSizeInput().max = maximum;
    getAdjustPixelSizeRange().querySelector(".max").innerText = maximum;
}

function setDefaultValueFromAdjustPixelSize() {
    getAdjustPixelSizeInput().value = calculateDefaultPixelLength();
}

function getMaximumPixelSize() {
    let availableWidthForPixels = getGridContainerWidth() - getSizeOfBorderPixelsFromGrid();
    return Math.floor(availableWidthForPixels / sizeOfGrid());
}

function getSizeOfBorderPixelsFromGrid() {
    return sizeOfGrid() + 1;
}

function getGridContainerWidth() {
    return getGridContainer().offsetWidth;
}

function getAdjustPixelSizeInput() {
    return getElementByIdFromDocument(ADJUST_PIXEL_SIZE_INPUT_ID);
}

function getAdjustPixelSizeRange() {
    return getElementByIdFromDocument(ADJUST_PIXEL_SIZE_RANGE_ID);
}

function getGridContainer() {
    return getElementByIdFromDocument(GRID_CONTAINER_ID);
}

function getPixel(index) {
    return getElementByIdFromDocument(generatePixelId(index));
}
