const gulp = require("gulp");
const handlebars = require("gulp-compile-handlebars");
const rename = require("gulp-rename");

gulp.task("default", function () {
    const options = {
        batch : ["../src/handlebars/partials"],
    };

    return gulp.src("../src/handlebars/pixel-art.handlebars")
        .pipe(handlebars(null, options))
        .pipe(rename("pixel-art.html"))
        .pipe(gulp.dest("../src/html"));
});