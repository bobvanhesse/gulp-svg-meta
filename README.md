# gulp-svg-meta
A gulp plugin that will provide you with a json containing svg meta-data.
The resulting json will help you to automatically keep svg meta-data in sync with its occurence in your mark-up.

## API
### gulpSvgMeta(exportPath)
#### exportPath (required)
The path to the exported json file, including the file name, relative to the path set for `gulp.dest()`.
### Example
```js
gulp.task('svg', () => gulp
  .src('./src/sprite/**/*.svg')
  .pipe(svgMeta('./.temp/svg-meta.json'))
  .pipe(gulp.dest('./dist'))
);
```

## CLI
A demo is provided, showing how this module helps you to automate the process of including svg meta-data your mark-up,
through templating language `pug`. Try changing the `viewBox` attribute or the `title`-/`desc`-tag values in the svg
source files. The display of these values in your mark-up will remain in sync.
```
$ npm start
```
Developers are more than welcome to contribute to this project.
Do make sure your code makes it through the test without errors:
```
$ npm test
```
