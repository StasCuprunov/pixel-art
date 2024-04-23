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

function getMaximumPixelSize() {
    let availableWidthForPixels = getGridContainerWidth() - getSizeOfBorderPixelsFromGrid();
    return Math.floor(availableWidthForPixels / sizeOfGrid());
}

function getSizeOfBorderPixelsFromGrid() {
    return sizeOfGrid() + 1;
}

function getGridContainerWidth() {
    return document.getElementById(GRID_CONTAINER_ID).offsetWidth;
}
