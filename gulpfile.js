const gulp = require('gulp');
const del = require('del');
const pump = require('pump');
const plugins = require('gulp-load-plugins')();
const gutil = require('gulp-util');
const uglify = require('gulp-uglify-es').default;
const runSequence = require('run-sequence');

const libJs = [
  'node_modules/jquery/dist/jquery.js',
  'node_modules/angular/angular.js',
  'node_modules/angular-animate/angular-animate.js',
  'node_modules/angular-messages/angular-messages.js',
  'node_modules/@uirouter/angularjs/release/angular-ui-router.js',
  'node_modules/angular-storage/dist/angular-storage.js',
  'node_modules/angular-translate/dist/angular-translate.js',
  'node_modules/angular-translate-loader-partial/angular-translate-loader-partial.js',
  'node_modules/ui-bootstrap4/dist/ui-bootstrap-tpls.js',
];
const localJs = [
  'src/app/components/core/src/app/**/*.module.js',
  'src/app/app.module.js',
  'src/app/components/**/*.module.js',
  'src/app/components/core/src/app/**/*.js',
  'src/app/**/*.js',
  '!**/*gulpfile.js',
  '!**/*.eslintrc.js'
];
const sourceJs = libJs.concat(localJs);
const sourceCss = [
  'src/styles/**/*.sass',
  'src/styles/**/*.scss'
];
const sourceHtml = ['src/html/**/*'];
const sourceImage = ['src/images/**/*'];
const sourceI18n = ['src/i18n/**/*'];
const dest = 'web';
const destinationJs = `${dest}/js`;
const destinationCss = `${dest}/stylesheets`;
const destinationHtml = `${dest}`;
const destinationImage = `${dest}/images`;
const destinationI18n = `${dest}/i18n`;
const finalJs = 'nean-frontend.js';
const lintJs = [
  'src/app/**/*.js',
  '!src/app/components/core/**/*.js',
  '!**/gulpfile.js',
  '!**/.eslintrc'
];
const cleanDest = [`${dest}`];
const cleanJs = [`${destinationJs}`];
const cleanCss = [`${destinationCss}`];
const cleanHtml = [
  `${destinationHtml}/**/*.html`,
  `${destinationHtml}/partials`
];
const cleanImage = [`${destinationImage}`];
const cleanI18n = [`${destinationI18n}`];
const isProduction = (process.env.NODE_ENV === 'production');
const pumpPromise = (streams) => {
  return new Promise((resolve, reject) => {
    pump(streams, (err) => {
      if (err) {
        gutil.log(gutil.colors.red('[Error]'), err.toString());
        reject(err);
      } else resolve();
    });
  });
};

// validates js files
gulp.task('lint', () => pumpPromise([
  gulp.src(lintJs),
  plugins.eslint(),
  plugins.eslint.format('stylish'),
  plugins.eslint.failAfterError(),
]));

// removes js
gulp.task('clean-js', () => del(cleanJs));

// removes css
gulp.task('clean-css', () => del(cleanCss));

// removes html
gulp.task('clean-html', () => del(cleanHtml));

// removes images
gulp.task('clean-image', () => del(cleanImage));

// removes i18n jsons
gulp.task('clean-i18n', () => del(cleanI18n));

// removes all static files
gulp.task('clean', (callback) => runSequence('clean-js', 'clean-css', 'clean-html', 'clean-image', 'clean-i18n', callback));

// creates css from sass files and reload in dev mode
gulp.task('css', () => pumpPromise([
  gulp.src(sourceCss),
  plugins.sass(),
  plugins.cleanCss(),
  gulp.dest(destinationCss),
  plugins.if(!isProduction, plugins.connect.reload()),
]));

// copy and minifies if necessary js files and reload in dev mode
gulp.task('js', () => pumpPromise([
  gulp.src((isProduction ? sourceJs : localJs)),
  plugins.concat(finalJs),
  gulp.dest(destinationJs),
  plugins.if(isProduction, uglify({ mangle: false })),
  plugins.if(isProduction, plugins.rename({ suffix: '.min' })),
  plugins.if(isProduction, gulp.dest(destinationJs)),
  plugins.if(!isProduction, plugins.connect.reload()),
]));

// copy and replaces in html js import if production mode and reload in dev mode
gulp.task('html', () => pumpPromise([
  gulp.src(sourceHtml),
  plugins.if(isProduction, plugins.htmlReplace({ js: '/js/nean-frontend.min.js' })),
  gulp.dest(destinationHtml),
  plugins.if(!isProduction, plugins.connect.reload()),
]));

// copy images and reload in dev mode
gulp.task('image', () => pumpPromise([
  gulp.src(sourceImage),
  gulp.dest(destinationImage),
  plugins.if(!isProduction, plugins.connect.reload()),
]));

// copy i18n files and reload in dev mode
gulp.task('i18n', () => pumpPromise([
  gulp.src(sourceI18n),
  gulp.dest(destinationI18n),
  plugins.if(!isProduction, plugins.connect.reload()),
]));

// creates connect server for dev mode
gulp.task('connect', () => {
  if (!isProduction) {
    plugins.connect.server({
      root: ['web', 'node_modules'],
      livereload: true,
    });
  }
});

// watch files for reload in dev mode
gulp.task('watch', () => {
  if (!isProduction) {
    gulp.watch(sourceCss, ['css']);
    gulp.watch(sourceJs, ['js']);
    gulp.watch(sourceHtml, ['html']);
    gulp.watch(sourceImage, ['image']);
    gulp.watch(sourceI18n, ['i18n']);
  }
});

gulp.task('default', (callback) => runSequence('clean', ['html', 'image', 'i18n', 'css', 'js'], 'connect', 'watch', callback));
gulp.task('postinstall', ['default']);
