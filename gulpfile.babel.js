import fs from 'fs';
import gulp from 'gulp';
import gulpPug from 'gulp-pug';
import path from 'path';
import gulpSvgMeta from '.';
import svgStore from 'gulp-svgstore';

const reload = (relativePath) => {
  const modulePath = path.resolve(__dirname, relativePath);
  if(modulePath in require.cache) {
    delete require.cache[modulePath];
  }
  return fs.existsSync(modulePath) ? require(modulePath) : undefined;
};

const pugData = () => ({
  svgMeta: reload('./.temp/svg-meta.json')
});

gulp.task('svg', () => gulp
  .src('./src/sprite/**/*.svg')
  .pipe(gulpSvgMeta('../.temp/svg-meta.json'))
  .pipe(svgStore({
    fileName: 'sprite'
  }))
  .pipe(gulp.dest('./dist'))
);

gulp.task('pug', () => gulp
  .src('./src/**/[^_]*.pug')
  .pipe(gulpPug({
    data: pugData()
  }))
  .pipe(gulp.dest('./dist'))
);

gulp.task('default', gulp.series('svg', 'pug'));