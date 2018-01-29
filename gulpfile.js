var gulp = require("gulp"),
    plumber = require('gulp-plumber'),
    plug = require('gulp-load-plugins')();
    cssnext = require('postcss-cssnext'),
    customProperties = require('postcss-custom-properties')(),
    customMedia = require('postcss-custom-media'),
    atImport = require('postcss-import'),
    easings = require('postcss-easings'),
    nested = require('postcss-nested'),
    colorFunction = require('postcss-color-function'),
    merge = require('merge-stream');
;

var src = './_src';
var dst = '.';

function pipeCss(name, stream) {
    stream
        .pipe(plug.concat(name + '.css'))
        .pipe(gulp.dest(dst + '/css/'))
        .pipe(plug.csso())
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(gulp.dest(dst + '/css/'))
    ;
}

function pipeJs(name, stream) {
    stream
        .pipe(plug.concat(name + '.js'))
        .pipe(gulp.dest(dst + '/js/'))
        .pipe(plug.uglify())
        .pipe(plug.rename({ suffix: '.min' }))
        .pipe(gulp.dest(dst + '/js/'))
    ;
}

customProperties.setVariables({
    '--img-path': '../img/',
    '--color-grey': '#343434',
    '--color-grey-semilight': '#C2C2C2',
    '--color-grey-light': '#DBDBDB',
    '--color-blue': '#2B8ABF',
    '--screen-sm-min': '768px',
    '--screen-md-min': '992px',
    '--screen-lg-min': '1200px',
});
gulp.task('css', function() {
    pipeCss('site', gulp
        .src(src + '/css/*.css')
        .pipe(plumber())
        .pipe(plug.postcss([
            customProperties,
            easings({
                easings: {
                    easeOutElastic: 'cubic-bezier(.05,1.01,.23,1.24)',
                }
            }),
            customMedia,
            atImport(),
            nested(),
            cssnext,
            colorFunction,
        ]))
    );
});

gulp.task('js', function() {
    pipeJs('site', gulp
        .src(src + '/js/*.js')
        .pipe(plumber())
        .pipe(plug.jshint())
        .pipe(plug.jshint.reporter('default'))
    );
});

gulp.task('libs:css', function() {
    pipeCss('vendors', gulp
        .src('./bower.json')
        .pipe(plumber())
        .pipe(plug.mainBowerFiles('**/*.css'))
    );
});

gulp.task('libs:js', function() {
    var modernizr = gulp
        .src(src + '/js/*.js')
        .pipe(plug.modernizr({
            cache: false,
            crawl: false,
            options: [
                "setClasses",
                "html5shiv",
                "html5printshiv",
            ],
        }))
    ;
    var bower = gulp
        .src('./bower.json')
        .pipe(plug.mainBowerFiles('**/*.js'))
    ;

    pipeJs('vendors', merge(modernizr, bower));
});

gulp.task('libs', ['libs:css', 'libs:js']);

gulp.task('default', ['libs', 'css', 'js'], function() {
    gulp.watch(src + '/css/**/*', ['css']);
    gulp.watch(src + '/js/**/*', ['js']);
});
