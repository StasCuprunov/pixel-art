const gulp= require("gulp");
const handlebars= require("gulp-compile-handlebars");
const rename= require("gulp-rename");
const {readdir} = require("node:fs/promises");

gulp.task("default", async function () {
    let options = {
        batch: await findAllHandleBarsDirectories(),
    };

    let templateData = require("../src/data/templateData.js");

    return gulp.src("../src/handlebars/index.handlebars")
        .pipe(handlebars(templateData, options))
        .pipe(rename("index.html"))
        .pipe(gulp.dest("../src/html"));
});

function findAllHandleBarsDirectories() {
    return findAllSubDirectories("../src/handlebars");
}

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
