var gulp         = require('gulp'),
    plumber      = require('gulp-plumber'),
    gutil        = require('gulp-util'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

// File path variables

var paths = {
    html: {
        src: '**/*.{twig,php}',
        dest: ''
    },
    // images: {
    //     src: basePaths.src + 'images/**/*.{jpg,gif,png}',
    //     dest: basePaths.dest + 'images/'
    // },
    scripts: {
        src: 'static/*.js',
        dest: 'static/'
    },
    styles: {
        src: 'style.css',
        dest: ''
    },
    sass: {
      src: 'sass/**/*.scss',
      dest: 'sass/style.scss'
    }
};

// Tasks

gulp.task('browserSync', function() {
  browserSync.init({
      proxy: "localhost:8888/timber-boilerplate"
    });
  });

gulp.task('watch', function() {
  gulp.watch(paths.sass.src, ['css']);
  gulp.watch(paths.html.src).on('change', reload);
  gulp.watch(paths.scripts.src, ['js']).on('change', reload);
  gulp.watch(paths.styles.src, ['autoprefixer']).on('change', reload);
  // gulp.watch(paths.images.src, ['img']).on('change', reload);
});

gulp.task('css', function() {
  gulp.src(paths.sass.dest)
    .pipe(sass.sync().on('error', sass.logError))
    // Compile everything into one file, style.css
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('autoprefixer', function() {
  gulp.src(paths.styles.src)
    .pipe(autoprefixer({
      browsers: ['> 1%, last 2 versions, Firefox ESR, Opera 12.1'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.styles.dest));
});

gulp.task('js', function() {
  return gulp.src(paths.scripts.src)
    .pipe(gulp.dest(paths.scripts.dest));
});

// gulp.task('img', function() {
//   return gulp.src(paths.images.src)
//     .pipe(gulp.dest(paths.images.dest))
// });

gulp.task('default', ['browserSync','watch']);
