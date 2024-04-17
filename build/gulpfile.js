let gulp= require("gulp");
let handlebars= require("gulp-compile-handlebars");
let rename= require("gulp-rename");

gulp.task("default", function () {
    let options = {
        batch : ["../src/handlebars/partials"],
    };

    let templateData = require("../src/js/templateData.js");

    return gulp.src("../src/handlebars/pixel-art.handlebars")
        .pipe(handlebars(templateData, options))
        .pipe(rename("pixel-art.html"))
        .pipe(gulp.dest("../src/html"));
});