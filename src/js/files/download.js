function generateFileTypeOptions() {
    let listOfFileTypes = ["gif", "jpg", "png"];
    createSelect(FILE_TYPE_ID, listOfFileTypes,  createInnerHtmlFromFileTypeSelect);
}

function submit() {
    makeScreenshotOfPixelPicture();
    resetDownloadInputs();
}

function createInnerHtmlFromFileTypeSelect(fileType) {
    return fileType.toUpperCase();
}

function makeScreenshotOfPixelPicture() {
    let fileName = getFileNameWithJQuery().val();
    let fileType = getFileTypeWithJQuery().val();

    // [0] is necessary
    html2canvas(getGridWithJQuery()[0]).then((canvas) => {
        canvas.toBlob(function (blob) {
            blob = setBlobToPicture(blob, fileType);
            saveAs(blob, getFullFileName(fileName, fileType));
        });
    });
}

function setBlobToPicture(blob, fileType) {
    return blob.slice(0, blob.size, "image/" + fileType);
}

function resetDownloadInputs() {
    getFileName().value = "";
    setSelectToFirstOption(FILE_TYPE_ID);
}

function getFileNameWithJQuery() {
    return getElementByIdFromDocumentWithJQuery(FILE_NAME_ID);
}

function getFileTypeWithJQuery() {
    return getElementByIdFromDocumentWithJQuery(FILE_TYPE_ID);
}

function getFileName() {
    return getElementByIdFromDocument(FILE_NAME_ID);
}
