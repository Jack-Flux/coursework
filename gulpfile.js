"use strict";

var gulp = require("gulp")
  , sass = require("gulp-sass")
  , concat = require('gulp-concat')
  , streamqueue = require("streamqueue");

gulp.task("sass", function() {
  return gulp.src("./sass/*.scss")
    .pipe(sass({
      outputStyle: "compressed"
    }).on("error", sass.logError))
    .pipe(concat('main.css'))
    .pipe(gulp.dest("./public/css"));
});

gulp.task("sass:watch", function() {
  gulp.watch("./sass/*.scss", ["sass"]);
});

gulp.task("default", ["sass", "sass:watch"]);
