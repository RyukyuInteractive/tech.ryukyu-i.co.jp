import path from 'path';
import gulp from 'gulp';
import sass from 'gulp-sass';
import browserSync from 'browser-sync';
import webpack from 'webpack-stream';
import plumber from 'gulp-plumber';
import bourbon from 'node-bourbon';
import { spawn } from 'child_process';
import webpackConfig from './webpack.config.js';

let messages = {
  jekyllBuild: '<span style="color: grey">Running:</span> $ bundle exec jekyll build'
};

const paths = {
  baseDir: '_site',
  srcDir: '_dev',
  destDir: 'assets',
  js: 'js/**/*.js',
  sass: 'css/**/*.scss',
  html: [
    '*.html',
    '_includes/*.html',
    '_layouts/*.html',
    '_posts/**/*',
    '_npm/**/*'
  ]
};

const opts = {
  sass: {
    outputStyle: 'expanded',
    includePaths: bourbon.includePaths
  },
  browserSync: {
    server: {
      baseDir: paths.baseDir
    },
    browser: 'default',
    open: false,
  },
  webpack: webpackConfig
};

gulp.task('jekyll-build', done => {
  browserSync.notify(messages.jekyllBuild);
  return spawn('bundle' , ['exec', 'jekyll', 'build'], { stdio: 'inherit' })
    .on('close', done);
});

gulp.task('jekyll-rebuild', ['jekyll-build'], () => {
  browserSync.reload();
});

gulp.task('browser-sync', ['sass', 'webpack', 'jekyll-build'], () => {
  browserSync.init(null, opts.browserSync);
});

gulp.task('sass', () => {
  return gulp.src(path.join(paths.srcDir, paths.sass), { base: paths.srcDir })
    .pipe(plumber())
    .pipe(sass(opts.sass).on('error', sass.logError))
    .pipe(gulp.dest(path.join(paths.baseDir, paths.destDir)))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(paths.destDir))
});

gulp.task('webpack', () => {
  return gulp.src(path.join(paths.srcDir, paths.js))
    .pipe(plumber())
    .pipe(webpack(opts.webpack))
    .pipe(gulp.dest(path.join(paths.baseDir, paths.destDir, '/js')))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(path.join(paths.destDir, '/js')));
});

gulp.task('watch', () => {
  gulp.watch(path.join(paths.srcDir, paths.sass), ['sass']);
  gulp.watch(path.join(paths.srcDir, paths.js), ['webpack']);
  gulp.watch(paths.html, ['jekyll-rebuild']);
});

gulp.task('default', [
  'browser-sync',
  'watch',
]);

