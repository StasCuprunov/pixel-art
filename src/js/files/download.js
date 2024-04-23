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

function submit() {
    makeScreenshotOfPixelPicture();
    resetDownloadInputs();
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

function resetDownloadInputs() {
    document.getElementById(FILE_NAME_ID).value = "";
    setSelectToFirstOption(FILE_TYPE_ID);
}