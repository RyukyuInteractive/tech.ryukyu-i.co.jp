import path from "path";
import gulp from "gulp";
import sass from "gulp-sass";
import browserSync from "browser-sync";
import webpack from "webpack-stream";
import plumber from "gulp-plumber";
import bourbon from "node-bourbon";
import { spawn } from "child_process";
import webpackConfig from "./webpack.config.js";

let messages = {
  jekyllBuild:
    '<span style="color: grey">Running:</span> $ bundle exec jekyll build'
};

const paths = {
  baseDir: "_site",
  srcDir: "_dev",
  destDir: "assets",
  js: "js/**/*.js",
  sass: "css/**/*.scss",
  html: [
    "*.html",
    "_includes/*.html",
    "_layouts/*.html",
    "_posts/**/*",
    "_npm/**/*"
  ]
};

const opts = {
  sass: {
    outputStyle: "expanded",
    includePaths: bourbon.includePaths
  },
  browserSync: {
    server: {
      baseDir: paths.baseDir
    },
    browser: "default",
    open: false
  },
  webpack: webpackConfig
};

export const jekyllBuildTask = done => {
  browserSync.notify(messages.jekyllBuild);
  return spawn("bundle", ["exec", "jekyll", "build"], { stdio: "inherit" }).on(
    "close",
    done
  );
};

export const sassTask = () => {
  return gulp
    .src(path.join(paths.srcDir, paths.sass), { base: paths.srcDir })
    .pipe(plumber())
    .pipe(sass(opts.sass).on("error", sass.logError))
    .pipe(gulp.dest(path.join(paths.baseDir, paths.destDir)))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(paths.destDir));
};

export const webpackTask = () => {
  return gulp
    .src(path.join(paths.srcDir, paths.js))
    .pipe(plumber())
    .pipe(webpack(opts.webpack))
    .pipe(gulp.dest(path.join(paths.baseDir, paths.destDir, "/js")))
    .pipe(browserSync.reload({ stream: true }))
    .pipe(gulp.dest(path.join(paths.destDir, "/js")));
};

export const watch = () => {
  gulp.watch(path.join(paths.srcDir, paths.sass), gulp.series(sassTask));
  gulp.watch(path.join(paths.srcDir, paths.js), gulp.series(webpackTask));
  gulp.watch(paths.html, gulp.series(jekyllBuildTask));
};

export const browserSyncTask = gulp.series(
  sassTask,
  webpackTask,
  jekyllBuildTask,
  () => {
    browserSync.init(null, opts.browserSync);
  }
);

export default gulp.series(browserSyncTask, watch);
