import cheerio from 'cheerio';
import path from 'path';
import PluginError from 'plugin-error';
import thru from 'through2';
import Vinyl from 'vinyl';
const svgMeta = (outputPath) => {
  let meta = {};
  let latestFile;
  let latestMod;
  const extract = (file, enc, cb) => {
    if(file.isNull()) {
      cb();
    }
    if(file.isStream()) {
      this.emit('error', new PluginError('svg-meta', 'Streams are not supported.'));
      cb();
    }
    const filePath = path.relative(file.base, file.path);
    const id = filePath.replace(/\//g, '-').replace(/\.svg$/, '');
    const $ = cheerio.load(file.contents.toString(enc), {xmlMode: true});
    const elem = $('svg').first();
    const viewBox = elem.attr('viewBox');
    const optional = ['title', 'desc'].map((tag) =>
      elem.find(tag).length ? ({[tag]: elem.find(tag).last().text()}) : {}
    );
    const fileMeta = Object.assign({viewBox}, ...optional);
    meta[id] = fileMeta;
    if(!latestMod || file.stat && file.stat.mtime > latestMod) {
      latestFile = file;
      latestMod = file.stat && file.stat.mtime;
    }
    cb(null, file);
  };
  const bundle = (cb) => {
    if(!latestFile) {
      cb();
      return;
    }
    const metaFile = new Vinyl();
    metaFile.contents = Buffer.from(JSON.stringify(meta));
    metaFile.path = outputPath;
    cb(null, metaFile);
  };
  return thru.obj(extract, bundle);
};
export default svgMeta;