let createHtmlConfig = require("./configuration").createHtmlConfig;
let findAllHandleBarsDirectories = require("./find_sub_directories").findAllHandleBarsDirectories;

const gulp= require("gulp");
const handlebars= require("gulp-compile-handlebars");
const rename= require("gulp-rename");

const GULP_TASK_CREATE_HTML = "create-html";

gulp.task(GULP_TASK_CREATE_HTML, async function() {
    let options = {
        batch: await findAllHandleBarsDirectories(),
    };

    let templateData = require(createHtmlConfig.templateDataPath);

    return gulp.src(createHtmlConfig.indexHandlebarsPath)
        .pipe(handlebars(templateData, options))
        .pipe(rename(createHtmlConfig.htmlFileName))
        .pipe(gulp.dest(createHtmlConfig.srcPath));
});

gulp.task("default",  gulp.series(GULP_TASK_CREATE_HTML));

