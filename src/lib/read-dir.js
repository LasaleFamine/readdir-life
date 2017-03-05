'use strict';

const {readdir} = require('fs');
const {resolve} = require('path');
// Conflict with promise `resolve`
const resolvePath = resolve;

module.exports = dir => {
	return new Promise((resolve, reject) => {
		readdir(
			resolvePath(dir),
			(err, list) => {
				if (err) {
					return reject(err);
				}
				return resolve(list);
			}
		);
	});
};
