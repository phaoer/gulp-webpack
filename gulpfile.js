//加载外挂：自动瞄准，无后座，锁血，大挪移.......~~~
var gulp = require('gulp'),
    minify=require('gulp-minify-css');
    autoprefixer = require('gulp-autoprefixer'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    clean = require('gulp-clean'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    fileinclude = require('gulp-file-include'),
    webpack = require('gulp-webpack');

gulp.task('css', function() {
    gulp.src('src/css/*.css')
        .pipe(concat('main.css'))
        .pipe(minify())
        .pipe(gulp.dest('dist/css'));
})

gulp.task('scripts', function() {
  return gulp.src('src/entry.js')
      .pipe(webpack( require('./webpack.config.js') ))
      .pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
  return gulp.src('src/images/**/*')
      .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
      .pipe(gulp.dest('dist/images'))
      .pipe(notify({ message: 'Images compile complete' }));
});

gulp.task('html', function() {
  return gulp.src('src/**/*.html')
      .pipe(fileinclude({
        prefix: '@@',
        basepath: '@file'
      }))
      .pipe(gulp.dest('dist/'))
      .pipe(notify({ message: 'html compile complete' }));
});

gulp.task('clean', function() {
  return gulp.src(['dist/css', 'dist/js', 'dist/images'], {read: false})
      .pipe(clean());
});

gulp.task('default', ['clean'], function() {
  gulp.start('css','scripts', 'images', 'html');
});


gulp.task('watch', function() {

  gulp.watch('src/css/**/*.css', ['css']);

  gulp.watch('src/js/**/*.js', ['scripts']);

  gulp.watch('src/images/**/*', ['images']);

  gulp.watch('src/**/*.html', ['html']) ;

  livereload.listen();
  gulp.watch(['dist/**']).on('change', livereload.changed);

});