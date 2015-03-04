/**
 * Build file
 * @author: Jacek Dominiak
 * @copyright: Jacek Dominiak
 * @created: 04/03/15
 */

var gulp = require('gulp')
    , uglify = require('gulp-uglify')
    , rename = require('gulp-rename')
    , ngAnnotate = require('gulp-ng-annotate')
    , to5 = require('gulp-babel');


// compile source
gulp.task('compile-source', function () {
    gulp.src('src/*.js')
        .pipe(to5())
        .pipe(gulp.dest('dist'));
});

// annotate
gulp.task('annotate', function () {
    gulp.src('dist/*.js')
        .pipe(ngAnnotate());
});

// uglify
gulp.task('uglify', function () {
    gulp.src('./dist/*.js')
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.src('dist'));
});

gulp.task('default', ['compile-source', 'annotate', 'uglify']);

gulp.task('watch', function () {
    gulp.watch('scr/*.js', ['compile-source', 'annotate', 'uglify']);
})
