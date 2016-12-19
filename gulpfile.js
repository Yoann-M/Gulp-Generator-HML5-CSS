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
    gulp.watch("./app/css/*.css").on('change', browserSync.reload);
    // Watch jss
    gulp.watch("./app/js/*.js").on('change', browserSync.reload);
    // Watch html
    gulp.watch("./app/**/*.html").on('change', browserSync.reload);
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

// Copy and Minify images
gulp.task('step2-imagemin', function () {
    gulp.src('./app/*.ico')
        .pipe(gulp.dest('./prod/'));
    gulp.src('./app/img/**/*')
        .pipe(imagemin())
        .pipe(gulp.dest('./prod/img/'))
});

// Copy fonts
gulp.task('step3-fonts', function () {
    gulp.src('./app/font/**/*')
        .pipe(gulp.dest('./prod/font/'));
});

// Useref to compress all css and js files (presents in build tag in ./app/index.html)
gulp.task('step4-useref', function () {
    return gulp.src('./app/index.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', cleanCSS()))
        .pipe(gulp.dest('prod'));
});

gulp.task('build', ['step1-clean', 'step2-imagemin', 'step3-fonts', 'step4-useref']);