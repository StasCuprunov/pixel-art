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

function cancelModalReset() {
    document.getElementById(GRID_SIZE_ID).value = localStorage.getItem(GRID_SIZE_OLD_KEY);
    hideModalReset();
}

function hideModalReset() {
    document.getElementById(MODAL_RESET_ID).hidden = true;
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