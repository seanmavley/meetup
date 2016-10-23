var gulp = require('gulp');
var browser = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var port = process.env.SERVER_PORT || 3000;
var rename = require('gulp-rename');
var cleanCSS = require('gulp-clean-css');
var addsrc = require('gulp-add-src');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
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

gulp.task('scripts', function() {
  return gulp.src(['js/app.js', 'js/myjs.js'])
    .pipe(concat('build.js'))
    .pipe(gulp.dest('js'))
    .pipe(rename('build.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['serve', 'sass', 'scripts']);
