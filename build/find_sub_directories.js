let {readdir} = require("node:fs/promises");
let configuration = require("./gulp_configuration.json");
let createHtmlConfig = configuration.createHtmlConfig;

function findAllHandleBarsDirectories() {
    return findAllSubDirectories(createHtmlConfig.srcDirectory);
}

exports.findAllHandleBarsDirectories = findAllHandleBarsDirectories;

async function findAllSubDirectories(directoryPath) {
    let prefixDirectoryPath = directoryPath + "/";
    let listOfDirectories = [];
    let allSuffixPaths = await readdir(directoryPath, {recursive: true});

    allSuffixPaths.forEach((path) => {
        if (!isFilePath(path)) {
            listOfDirectories.push(prefixDirectoryPath + path);
        }
    });
    return listOfDirectories;
}

function isFilePath(path) {
    return path.includes(".");
}