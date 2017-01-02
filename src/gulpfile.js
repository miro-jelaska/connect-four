var gulp = require('gulp');
var ts = require('gulp-typescript');

// Used for debuging
var gutil = require('gulp-util');
var path = require('path');


gulp.task('ts', function() {
    gulp.src('./app/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            out: 'app.js'
        }))
        .pipe(gulp.dest('built/'));
});


gulp.task('default', ['ts']);