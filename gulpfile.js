const gulp = require('gulp');
const minify = require('gulp-minify');
const filter = require('gulp-filter');
const child = require('child_process');
const gutil = require('gulp-util');
const del = require('del');

const paths = {
  scripts: {
    src: '_scripts/*',
    dest: 'scripts/'
  }
};

gulp.task('clean-scripts', done => {
  del([paths.scripts.dest])

  done();
});

gulp.task('pipe-scripts', done => {
  gulp
    .src(paths.scripts.src, { allowEmpty: true })
    .pipe(gulp.dest(paths.scripts.dest));

  done();
});

gulp.task('pipe-scripts-prod', done => {
  gulp
    .src(paths.scripts.src, {allowEmpty: true})
    .pipe(minify({ext: ".min.js"}))
    .pipe(filter("**/*.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));

  done();
});

gulp.task('jekyll-serve', done => {
  const jekyll = child.spawn('jekyll', ['serve', '--watch']);

  const jekyllLogger = (buffer) => {
    buffer
      .toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };

  jekyll
    .stdout
    .on('data', jekyllLogger);
  jekyll
    .stderr
    .on('data', jekyllLogger);

  done();
});

gulp.task('jekyll-build-prod', done => {
  browserSync.notify(messages.jekyllBuild);

  let productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'production';

  return child.spawn('jekyll', ['build'], {
    stdio: 'inherit',
    env: productionEnv
  }).on('close', done);
});

gulp.task('default', gulp.series('clean-scripts', 'pipe-scripts'));
gulp.task('serve', gulp.series('default', 'jekyll-serve'));
gulp.task('build-prod', gulp.series('clean-scripts', 'pipe-scripts-prod', 'jekyll-build-prod'));