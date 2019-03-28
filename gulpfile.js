const gulp = require('gulp');
const minify = require('gulp-minify');
const filter = require('gulp-filter');
const child = require('child_process');
const gutil = require('gulp-util');
const del = require('del');

const {series} = require('gulp');

const paths = {
  scripts: {
    src: 'scripts/src/*',
    dest: 'scripts/'
  }
};

gulp.task('cleanScripts', done => {
  del([paths.scripts.dest + "*.js"])
  done();
});

gulp.task('formatScripts', done => {
  gulp
    .src(paths.scripts.src, {allowEmpty: true})
    .pipe(minify({ext: ".min.js"}))
    .pipe(filter("**/*.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
  done();
});

gulp.task('jekyllBuildProd', done => {
  let productionEnv = process.env;
  productionEnv.JEKYLL_ENV = 'production';
  return child.spawn('jekyll', [
    'build', '--config', '_config_prod.yml'
  ], {
    stdio: 'inherit',
    env: productionEnv
  }).on('close', done);
});

gulp.task('serve', done => {
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

exports.default = series('cleanScripts', 'formatScripts');
exports.build = series('cleanScripts', 'formatScripts', 'jekyllBuildProd');
exports.serve = 'serve';