import {join} from 'path';
import {sleep} from 'sleep';
import fs from 'fs-extra';
import test from 'ava';
import fn from './../src';

const resolvedPath = join(__dirname, 'data-test');
const oldestFile = join(resolvedPath, 'oldest-modified-late.txt');
const latestFolder = join(resolvedPath, 'latest');

const preTest = async () => {
	fs.ensureDirSync(resolvedPath);
	fs.ensureFileSync(oldestFile);
	sleep(1);
	fs.ensureDirSync(latestFolder);
	sleep(1);
	fs.writeFileSync(oldestFile, 'test2');
	Promise.resolve(true);
};

test.before(async () => {
	return await preTest();
});

test('get latest without type (fallback modified)', async t => {
	const res = await fn.latest(resolvedPath);
	t.is(res.file, 'oldest-modified-late.txt');
});

test('get latest with type specified', async t => {
	const res = await fn.latest(resolvedPath, 'birthtime');
	t.is(res.file, 'latest');
});

test('get oldest without type specified (fallback modified)', async t => {
	const res = await fn.oldest(resolvedPath);

	t.is(res.file, 'latest');
});

test('get oldest with type specified', async t => {
	const res = await fn.oldest(resolvedPath, 'birthtime');
	t.is(res.file, 'oldest-modified-late.txt');
});

test.after(() => {
	fs.removeSync(resolvedPath);
});
