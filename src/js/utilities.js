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

function createSelect(idFromSelect, listOfOptions, createInnerHtmlFunction) {
    let select = getElementByIdFromDocument(idFromSelect);
    listOfOptions.forEach((option) => {
        let optionInput = document.createElement("option");
        optionInput.setAttribute("value", option);
        optionInput.innerHTML = createInnerHtmlFunction(option);
        select.appendChild(optionInput);
    });
}

function setSelectToFirstOption(id) {
    getElementByIdFromDocument(id).value = getElementByIdFromDocument(id).options[0].value;
}

function onClickValueColorPixel(id) {
    return "colorPixel('" + id + "')";
}

function onClickValueFillAdjacentPixels(id) {
    return "fillAdjacentPixels('" + id + "')";
}

function getElementByIdFromDocument(id) {
    return document.getElementById(id);
}

function getElementByIdFromDocumentWithJQuery(id) {
    return $(jQueryId(id));
}

function getFullFileName(fileName, fileType) {
    return fileName + "." + fileType;
}

function createElementInDocument(tagName) {
    return document.createElement(tagName);
}

function getItemFromLocalStorage(key) {
    return localStorage.getItem(key);
}

function setItemFromLocalStorage(key, value) {
    localStorage.setItem(key, value);
}