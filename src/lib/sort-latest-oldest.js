'use strict';

const {statSync} = require('fs');
const {resolve, join} = require('path');

module.exports = (dir, files, type, time) => {
	let stats = [];
	for (let file of files) {
		const stat = statSync(resolve(join(dir, file)));
		stats = stats.concat({
			file,
			stat
		});
	}

	return stats.sort((statA, statB) => {
		return type === 'last' ?
			statB.stat[time].getTime() > statA.stat[time].getTime() :
			statA.stat[time].getTime() > statB.stat[time].getTime();
	});
};
