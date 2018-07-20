import cheerio from 'cheerio';
import {name as MODULE_NAME} from './package.json';
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
      return cb();
    }
    if(file.isStream()) {
      return cb(new PluginError(MODULE_NAME, 'Streams are not supported.'));
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
    if(typeof outputPath !== 'string') {
      cb(new PluginError(MODULE_NAME, 'Assign a path for the product of this module including the file name.'));
    }
    metaFile.path = outputPath.replace(/(.json)?$/, '.json');
    cb(null, metaFile);
  };
  return thru.obj(extract, bundle);
};
export default svgMeta;