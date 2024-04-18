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
    $(document).ready(function () {
        let lastColumn = sizeOfGrid() - 1;

        let grid = document.getElementById(GRID_ID);
        let pixelLength = calculatePixelLength();

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
            let numberOfPixelsAsCSS = numberOfPixelsAsString(pixelLength);
            input.style.height = numberOfPixelsAsCSS;
            input.style.width = numberOfPixelsAsCSS;
            input.setAttribute("onclick",  onClickValueColorPixel(id))
            grid.appendChild(input);

            if (isLastColumn) {
                let lineBreak = document.createElement("br");
                grid.appendChild(lineBreak);
            }
        }
    });
}

function resetGrid() {
    document.getElementById(FILL_ID).checked = false;
    setDisableForPixelColor(false);
    removeGrid();
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
    return $(jQueryId(PIXEL_COLOR_ID)).prop("disabled", isDisabled);
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

function calculatePixelLength() {
    let gridSize = sizeOfGrid();
    let containerWidth = document.getElementById(GRID_CONTAINER_ID).offsetWidth;
    let containerHeight = maximumHeightForPixelPicture();
    let pictureSize = Math.min(containerWidth, containerHeight);

    let sizeOfBorderPixels = gridSize + 1;
    let availableWidthForPixels = pictureSize - sizeOfBorderPixels;

    return Math.floor(availableWidthForPixels / gridSize);
}

function maximumHeightForPixelPicture() {
    let windowHeight = window.innerHeight;

    let introductionHeight = outerHeightFromElement(INTRODUCTION_ID);
    let tipsHeight = outerHeightFromElement(TIPS_ID);
    let toolsHeight = outerHeightFromElement(TOOLS_ID);
    let createPictureTitleHeight = outerHeightFromElementWithTag(PICTURE_ID, "h2");
    let downloadHeight = outerHeightFromElement(DOWNLOAD_ID)

    return windowHeight - (introductionHeight + tipsHeight + toolsHeight + createPictureTitleHeight + downloadHeight);
}

function outerHeightFromElement(id) {
    return $(jQueryId(id)).outerHeight(true);
}

function outerHeightFromElementWithTag(id, tag) {
    return $(jQueryId(id)).find(tag).outerHeight(true);
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