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

function onChangeGridSize() {
    localStorage.setItem(IS_TRIGGERED_BY_CHANGING_GRID_SIZE_KEY, true);
    triggerModalReset();
    setLocalStorageGridSizeKey();
}

function sizeOfGrid() {
    return Number(document.getElementById(GRID_SIZE_ID).value);
}

function setLocalStorageGridSizeKey() {
    if (document.getElementById(MODAL_RESET_ID).hidden) {
        localStorage.setItem(GRID_SIZE_OLD_KEY, document.getElementById(GRID_SIZE_ID).value);
    }
}