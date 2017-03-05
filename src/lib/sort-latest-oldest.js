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
		const typeTime = time === 'birthtime' && statA.stat[time] === undefined ? 'ctime' : time;
		return type === 'last' ?
			statB.stat[typeTime].getTime() - statA.stat[typeTime].getTime() :
			statA.stat[typeTime].getTime() - statB.stat[typeTime].getTime();
	});
};
