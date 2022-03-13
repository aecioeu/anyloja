var gulp = require('gulp');
var plumber = require('gulp-plumber');

const terser = require('gulp-terser');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifyCSS = require('gulp-minify-css');
const cleanCSS = require('gulp-clean-css');
var htmlmin = require('gulp-htmlmin');
const javascriptObfuscator = require('gulp-javascript-obfuscator');
// Source Path
var js_src = "./public/assets/js/src/*.js";
// Dist Path
var js_dist = "./public/assets/js/";
var js_dist_name = "app.js";



const purgecss = require('gulp-purgecss')

/*

gulp.src('file.js')
    .pipe(javascriptObfuscator({
        compact: true
    }))
    .pipe(gulp.dest('dist'));*/

// Minify e Concat Scripts
gulp.task('js', function() {
    return gulp.src(js_src)
        .pipe(plumber())
        .pipe(terser())
        .pipe(concat(js_dist_name))
        .pipe(javascriptObfuscator({
            compact: true
        }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(js_dist));
});


// Source Path
var css_src = "./public/assets/css/src/*.css";
// Dist Path
var css_dist = "./public/assets/css/";
var css_dist_name = "style-master.css";

// Minify e Concat Scripts
gulp.task('css', function() {
    return gulp.src(css_src)
        //.pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(minifyCSS())
        .pipe(concat(css_dist_name))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest(css_dist));
});

gulp.task('purgecss', () => {
    return gulp.src('./public/assets/css/style-master.min.css')
        //./public/assets/css/style-master.min.css
        .pipe(purgecss({
            //     content: ['src/**/*.html']
            content: ['./views/app/**/*.ejs', './views/app/*.ejs']

        }))
        .pipe(gulp.dest('build/css'))
})


gulp.task('critical', function() {
    return gulp.src('./public/assets/css/src/critical.css')
        //.pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(minifyCSS())
        .pipe(concat('minimal.css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/assets/css/'));
});



gulp.task('pages', function() {
    return gulp.src(['./views/src/*.ejs'])
        .pipe(htmlmin({
            collapseWhitespace: true,
            removeComments: true
        }))
        .pipe(gulp.dest('./views/'));
});

// Watch
gulp.task('watch', function() {
    gulp.watch(css_src, gulp.series('css'));
    gulp.watch(js_src, gulp.series('js'));
    gulp.watch('./views/src/*.ejs', gulp.series('pages'));
    // gulp.watch('./public/assets/css/style-master.min.css', gulp.series('purgecss'));
});

// Default
gulp.task('default', gulp.series('watch'));