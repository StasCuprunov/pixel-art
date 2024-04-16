function generateGridSizeOptions() {
    let listOfGridSizes = [8, 12, 16, 32];

    let gridSizeContainer = document.getElementById(GRID_SIZE_ID);

    listOfGridSizes.forEach((size) => {
        let option = document.createElement("option");
        option.setAttribute("value", size);
        option.innerHTML = size + " x " + size;
        gridSizeContainer.appendChild(option);
    });
}

function generateGrid() {
    let lastColumn = sizeOfGrid() - 1;

    let gridContainer = document.getElementById(GRID_ID);

    for (let index = 0; index < getIndexBorder(); index++) {
        let id = generatePixelId(index);
        let isLastColumn = whichColumnIsIndex(index) === lastColumn;

        let input = document.createElement("input");
        input.setAttribute("type", "button");
        input.setAttribute("id", id);
        input.setAttribute("name", GRID_ID);

        let classValue = "pixel";

        if (isLastColumn) {
            classValue += " " + "last-column";
        }

        input.setAttribute("class", classValue);
        input.setAttribute("onclick",  onClickValueColorPixel(id))
        gridContainer.appendChild(input);

        if (isLastColumn) {
            let lineBreak = document.createElement("br");
            gridContainer.appendChild(lineBreak);
        }
    }
}

function resetGrid() {
    document.getElementById(FILL_ID).checked = false;
    setDisableForPixelColor(false);

    // remove grid
    let gridContainer = document.getElementById(GRID_ID);
    gridContainer.textContent = '';

    generateGrid();
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

    for (let index = 0; index < getIndexBorder(); index++) {
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

function makeScreenshotOfPixelPicture() {
    $(document).ready(function(){
        let fileName = $("#" + FILE_NAME_ID).val();
        let fileType = $("#" + FILE_TYPE_ID).val();

        let fullFileName = fileName + "." + fileType;

        let gridContainer = $("#" + GRID_ID);
        // [0] is necessary
        html2canvas(gridContainer[0]).then((canvas) => {
            canvas.toBlob(function (blob) {
                window.saveAs(blob, fullFileName);
            });
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

    const FIRST_ROW = 0;
    const LAST_ROW = sizeOfGrid() - 1;
    const FIRST_COLUMN = 0;
    const LAST_COLUMN = sizeOfGrid() - 1;

    let rowFromFillIndex = whichRowIsIndex(indexFillPixel);
    let columnFromFillIndex = whichColumnIsIndex(indexFillPixel);

    if (rowFromFillIndex !== FIRST_ROW) {
        changeColorFromPixel(indexTopFromPixel(indexFillPixel), fillColor);

        if (columnFromFillIndex !== FIRST_COLUMN) {
            changeColorFromPixel(indexTopLeftFromPixel(indexFillPixel), fillColor);
        }

        if (columnFromFillIndex !== LAST_COLUMN) {
            changeColorFromPixel(indexTopRightFromPixel(indexFillPixel), fillColor);
        }
    }
    if (rowFromFillIndex !== LAST_ROW) {
        changeColorFromPixel(indexBottomFromPixel(indexFillPixel), fillColor);

        if (columnFromFillIndex !== FIRST_COLUMN) {
            changeColorFromPixel(indexBottomLeftFromPixel(indexFillPixel), fillColor);
        }

        if (columnFromFillIndex !== LAST_COLUMN) {
            changeColorFromPixel(indexBottomRightFromPixel(indexFillPixel), fillColor);
        }
    }
    if (columnFromFillIndex !== FIRST_COLUMN) {
        changeColorFromPixel(indexLeftFromPixel(indexFillPixel), fillColor);
    }
    if (columnFromFillIndex !== LAST_COLUMN) {
        changeColorFromPixel(indexRightFromPixel(indexFillPixel), fillColor);
    }
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

function whichRowIsIndex(index) {
    return Math.floor(index / sizeOfGrid());
}

function whichColumnIsIndex(index) {
    return index % sizeOfGrid();
}

function setDisableForPixelColor(isDisabled) {
    $(document).ready(function(){
        $("#" + PIXEL_COLOR_ID).prop("disabled", isDisabled);
    });
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