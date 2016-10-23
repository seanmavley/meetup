var gulp = require('gulp');
var browser = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var port = process.env.SERVER_PORT || 3000;
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var sassPaths = [
  'bower_components/foundation-sites/scss',
  'bower_components/motion-ui/src'
];

// connect to browser-sync and reload
// upon changes to the html files
gulp.task('serve', function() {
  browser.init({ server: '.', port: port });
  gulp.watch('*.html').on('change', browser.reload);
});

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed'
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(addsrc('css/mycss.css'))
    .pipe(concat('build.css'))
    .pipe(gulp.dest('css'))
    .pipe(rename('build.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('css'))
});

gulp.task('build', ['sass'], function() {
  return gulp.src(['css/*.css'])
    .pipe(concat('app.css'))
    .pipe(gulp.dest('css'))
    .pipe(rename('app.min.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(gulp.dest('css'));
});

gulp.task('default', ['serve', 'sass']);
