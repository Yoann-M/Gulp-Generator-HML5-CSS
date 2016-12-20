// BASE
var gulp        = require('gulp');
var watch       = require('gulp-watch');
// SYNC
var browserSync = require('browser-sync').create();
var reload      = browserSync.reload;
// COMPRESSOR
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var cleanCSS    = require('gulp-clean-css');
var imagemin    = require('gulp-imagemin');
// TOOLS
var rename      = require("gulp-rename");
var gulpif      = require('gulp-if');
var useref      = require('gulp-useref');
var del         = require('del');


//-----------------------------------------------------------------------
// SERVE PROJECT     
//-----------------------------------------------------------------------


gulp.task('serve', function () {
    browserSync.init({
        server: "./app"
    });
    // If use MAMP & php, replace browserSync.init by this
    //  browserSync.init({
    //     proxy: "localhost:8888",
    //     startPath: '/folder-name-in-htdocs/app/index.php'
    // });
    gulp.watch("./app/css/*.css").on('change', browserSync.reload);
    // Watch jss
    gulp.watch("./app/js/*.js").on('change', browserSync.reload);
    // Watch html or php
    gulp.watch("./app/**/*.{html,php}").on('change', browserSync.reload);
    // Watch img
    watch('app/img/**/*').on('change', browserSync.reload);
    // Watch font
     watch('app/font/**/*').on('change', browserSync.reload);
});


//-----------------------------------------------------------------------
// BUILD PROJECT     
//-----------------------------------------------------------------------

// Delete all images in /prod/img/ for clean
gulp.task('step1-clean', function () {
    del(['./prod/']).then(paths => {
        console.log('Deleted files and folders:\n', paths.join('\n'));
    });
});

// Copy files (html or php files, fonts, favicon)
gulp.task('step2-copy', function () {
    gulp.src('./app/favicon.ico')
        .pipe(gulp.dest('./prod/'));
    gulp.src('./app/font/**/*')
        .pipe(gulp.dest('./prod/font/'));

});


// Minify images
gulp.task('step3-imagemin', function () {
    gulp.src('./app/*.ico')
        .pipe(gulp.dest('./prod/'));
    gulp.src('./app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/img/'))
});


// Useref to compress all css and js files (presents in build tag in ./app/index.html)
gulp.task('step4-useref', function () {
    return gulp.src('./app/*.{html,php}')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('prod'));
});

gulp.task('build', ['step1-clean', 'step2-copy', 'step3-imagemin', 'step4-useref']);