const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const sass = require("gulp-sass");
const pug = require("gulp-pug");
const uglify = require("gulp-uglify");
const imageMin = require("gulp-imagemin");
const concat = require("gulp-concat");
const del = require("del");
var plumber = require("gulp-plumber");

// Compile Pug
gulp.task("pug", () => {
  return gulp
    .src("src/pug/*.pug")
    .pipe(plumber())
    .pipe(
      pug({
        doctype: "html",
        pretty: false
      })
    )
    .pipe(gulp.dest("./src"));
});

// Compile sass & Inject Into Browser
gulp.task("sass", () => {
  return gulp
    .src(["src/scss/*.scss"])
    .pipe(plumber())
    .pipe(sass())
    .pipe(gulp.dest("src/assets/css"))
    .pipe(browserSync.stream());
});

// Watch sass, Pug & Serve
gulp.task("serve", ["sass", "pug"], () => {
  browserSync.init({
    server: "./src"
  });
  gulp.watch(["src/pug/*.pug"], ["pug"]).on("change", browserSync.reload);
  gulp.watch(["src/scss/**/*"], ["sass"]).on("change", browserSync.reload);
});
// Default Task
gulp.task("default", ["serve", "help"]);

// This is the Build part it creates the dist folder and readys all the files for deployment

// Copy HTML to dist folder
gulp.task("copyHtml", () => {
  return gulp.src(["src/*.html"]).pipe(gulp.dest("dist"));
});
// Copy Css to dist folder
gulp.task("copyCSS", () => {
  return gulp.src(["src/assets/css/*.css"]).pipe(gulp.dest("dist/assets/css"));
});
// ImageMin
gulp.task("imageMin", () => {
  return gulp
    .src(["src/assets/img/*"])
    .pipe(imageMin())
    .pipe(gulp.dest("dist/assets/img"));
});
// Minify, concat js files and copy them to dist folder
gulp.task("scripts", () => {
  return gulp
    .src(["src/assets/js/*.js"])
    .pipe(plumber())
    .pipe(concat("main.js"))
    .pipe(uglify())
    .pipe(gulp.dest("dist/assets/js"));
});

// Builds to dist folder, ready to deploy
gulp.task("build", ["imageMin", "scripts", "copyHtml", "copyCSS"]);

// Clean the build folder
gulp.task("clean", () => {
  console.log("-> Cleaning dist folder");
  del(["dist"]);
});

// Help Task
gulp.task("help", () => {
  console.log("");
  console.log("===== Help for Riiiad Starter Kit =====");
  console.log("");
  console.log("Usage: gulp [command]");
  console.log("The commands are the following");
  console.log("-------------------------------------------------------");
  console.log("clean: Removes all the compiled files on ./dist");
  console.log("copyCss: Copy the complied css files");
  console.log("copyHtml: Copy the Html files");
  console.log("imageMin: Copy the newer images to the build folder");
  console.log(
    "        build: Creates the dist folder if not already create and copy all files in it"
  );
  console.log("        help: Print this message");
  console.log("");
});
