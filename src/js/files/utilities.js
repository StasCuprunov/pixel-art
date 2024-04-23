function getIndexBorder() {
    let size = sizeOfGrid();
    return size * size;
}

function generatePixelId(index) {
    return PREFIX_PIXEL_ID + index;
}

function jQueryId(id) {
    return "#" + id;
}

function numberOfPixelsAsString(numberOfPixels) {
    return numberOfPixels + "px";
}

function addClassAsString(classList, newClass) {
    return classList + " " + newClass;
}

function setSelectToFirstOption(id) {
    document.getElementById(id).value = document.getElementById(id).options[0].value;
}

function onClickValueColorPixel(id) {
    return "colorPixel('" + id + "')";
}

function onClickValueFillAdjacentPixels(id) {
    return "fillAdjacentPixels('" + id + "')";
}