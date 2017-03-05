# readdir-life
[![GitHub tag](https://img.shields.io/github/release/lasalefamine/readdir-life.svg?style=flat-square)](https://github.com/LasaleFamine/readdir-life)
[![Build Status](https://travis-ci.org/lasalefamine/readdir-life.svg?branch=master)](https://travis-ci.org/LasaleFamine/readdir-life?style=flat-square)
[![Coverage Status](https://coveralls.io/repos/github/LasaleFamine/readdir-life/badge.svg?branch=master)](https://coveralls.io/github/LasaleFamine/readdir-life?branch=master)
[![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg?style=flat-square)](https://github.com/LasaleFamine/readdir-life)
[![npm](https://img.shields.io/npm/dt/readdir-life.svg?style=flat-square)](https://github.com/LasaleFamine/readdir-life)

> Check what are the oldest/latest files/folders within a directory



## Install

```
$ yarn add readdir-life
```

## Usage

```js
const {join} = require('path');
const readdirLife = require('readdir-life');

const pathResolved = path.join(__dirname, 'your-path');

readdirLife.latest(pathResolved)
	.then(res => console.log(res))
	.catch(err => console.error(err));

/* =>

{
	file: 'latest-file-or-folder',
	stat: {
		dev: 16777220,
		mode: 33188,
		nlink: 1,
		uid: 501,
		gid: 20,
		rdev: 0,
		blksize: 4096,
		ino: 14889287,
		size: 0,
		blocks: 0,
		atime: 2017-03-05T01:29:07.000Z,
		mtime: 2017-03-05T01:29:16.000Z,
		ctime: 2017-03-05T01:29:16.000Z,
		birthtime: 2017-03-05T01:29:06.000Z
	}
}
*/
```


## API

### .latest(input, [options])

#### input

Type: `string`

Directory to read.

#### options

##### typeTime

Type: `string`<br>
Default: `mtime` // Modified time

Type of the time to check: `ctime|mtime|atime|birthtime`
More info: [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)

### .oldest(input, [options])

#### input

Type: `string`

Directory to read.

#### options

##### typeTime

Type: `string`<br>
Default: `mtime` // Modified time

Type of the time to check: `ctime|mtime|atime|birthtime`
More info: [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)

## Todo

- .sortAsc
- .sortDesc

## Related
- [fs.readdir](https://nodejs.org/api/fs.html#fs_fs_readdir_path_options_callback)
- [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats)

## License

MIT © [LasaleFamine](https://godev.space)
