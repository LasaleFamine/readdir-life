'use strict';

const readDir = require('./lib/read-dir');
const sortLatestOldest = require('./lib/sort-latest-oldest');

module.exports.latest = (dir, time) => {
	return readDir(dir)
		.then(list => sortLatestOldest(dir, list, 'last', time || 'mtime'))
		.then(latest => latest[0] || [])
		.catch(err => {
			throw err;
		});
};

module.exports.oldest = (dir, time) => {
	return readDir(dir)
		.then(list => sortLatestOldest(dir, list, 'old', time || 'mtime'))
		.then(oldest => oldest[0] || [])
		.catch(err => {
			throw err;
		});
};
