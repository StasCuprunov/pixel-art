let createHtmlConfig = {
    srcDirectory: "../src/handlebars",
    templateDataPath: "../src/data/templateData.js",
    indexHandlebarsPath: "../src/handlebars/index.handlebars",
    htmlFileName: "index.html",
    srcPath: "../src/html"
};

exports.createHtmlConfig = createHtmlConfig;

let minimizingJsConfig = {
    srcDirectories: ["../src/js/files/*js"],
    minimizedFileName: "bundle.js",
    destDirectory: "../src/js"
};

exports.minimizingJsConfig = minimizingJsConfig;

let minimizingCssConfig = {
    srcDirectories: "../src/scss/files/*.scss",
    minimizedFileName: "bundle.css",
    destDirectory: "../src/scss"
}

exports.minimizingCssConfig = minimizingCssConfig;