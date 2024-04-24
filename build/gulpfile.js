let createHtmlConfig = require("./configuration").createHtmlConfig;
let minimizingJsConfig = require("./configuration").minimizingJsConfig;
let minimizingCssConfig = require("./configuration").minimizingCssConfig;
let findAllHandleBarsDirectories = require("./find_sub_directories").findAllHandleBarsDirectories;

const gulp= require("gulp");
const concat = require("gulp-concat");
const minify = require("gulp-minify");
const handlebars= require("gulp-compile-handlebars");
const rename= require("gulp-rename");
const cleanCss = require("gulp-clean-css");
const sass = require("gulp-sass")(require("sass"));

const GULP_TASK_CREATE_HTML = "create-html";
const GULP_TASK_MINIMIZING_JS = "minimizing-js";
const GULP_TASK_MINIMIZING_CSS = "minimizing-css";

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

gulp.task(GULP_TASK_MINIMIZING_JS, function () {
    return gulp.src(minimizingJsConfig.srcDirectories)
        .pipe(concat(minimizingJsConfig.minimizedFileName))
        .pipe(minify())
        .pipe(gulp.dest(minimizingJsConfig.destDirectory));
});

gulp.task(GULP_TASK_MINIMIZING_CSS, function () {
    return gulp.src(minimizingCssConfig.srcDirectories)
        .pipe(sass().on("error", sass.logError))
        .pipe(concat(minimizingCssConfig.minimizedFileName))
        .pipe(cleanCss())
        .pipe(gulp.dest(minimizingCssConfig.destDirectory));
});

gulp.task("default",
    gulp.series(GULP_TASK_CREATE_HTML,
        GULP_TASK_MINIMIZING_JS,
        GULP_TASK_MINIMIZING_CSS
    )
);

