var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    util = require('gulp-util'),
    bower = require('gulp-bower'),
    notify = require('gulp-notify'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    connect = require('gulp-connect'),
    nunjucks = require('gulp-nunjucks-render');

var jsSrc,
    nunjucksSrc,
    nunjucksAssets,
    env,

env = process.env.NODE_ENV || 'development';
/*

if (env==='development') {
    outputDir = 'builds/development/';
    sassStyle = 'expanded';
} else {
    outputDir = 'builds/production/';
    sassStyle = 'compressed';
}

*/


jsSrc = ['dev/scripts/*.js'];
nunjucksSrc = ['dev/tpl/**/*.+(html|nunjucks|njk)'];
nunjucksAssets = ['dev/tpl/*.+(html|nunjucks|njk)'];

var config = {
    sassPath: './dev/sass',
    bowerPath: './bower_components',
    fontPath: './dev/fonts'
}

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerPath))
});

gulp.task('icons', function() {
    return gulp.src(config.bowerPath + '/font-awesome/fonts/**.*')
        .pipe(gulp.dest('./assets/fonts'));
});

gulp.task('fonts', function() {
    return gulp.src(config.fontPath + '/bree-serif/**.*')
        .pipe(gulp.dest('./assets/fonts'));
});

gulp.task('sass', function() {
    return sass(config.sassPath + '/style.scss', {
            style: 'compressed',
            loadPath: [
                config.sassPath,
                config.bowerPath + '/bootstrap-sass/assets/stylesheets',
                config.bowerPath + '/font-awesome/scss',
            ]
        })
            .on("error", notify.onError(function (error) {
                return "Error: " + error.message;
            }))
        .pipe(gulp.dest('./assets/css'));
});


gulp.task('js', function () {
    gulp.src(jsSrc)
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(connect.reload())
});

gulp.task('connect', function(){
    connect.server({
        root: 'assets/',
        livereload: true
    });
});

gulp.task('nunjucks', function() {
  return gulp.src(nunjucksAssets)
  .pipe(nunjucks({
      path: ['dev/tpl/']
    }))
  .pipe(gulp.dest('assets'))
  .pipe(connect.reload());
});

gulp.task('watch', function () {
    gulp.watch(jsSrc, ['js']);
    gulp.watch(nunjucksSrc, ['nunjucks']);
    gulp.watch(config.sassPath + '/**/*.scss', ['sass']);
});

gulp.task('default', ['js', 'bower', 'sass', 'icons', 'fonts', 'nunjucks', 'connect', 'watch']);