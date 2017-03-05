import {join} from 'path';
import fs from 'fs-extra';
import test from 'ava';
import fn from './../src';

const resolvedPath = join(__dirname, 'data-test');
const oldestFile = join(resolvedPath, 'oldest-modified-late.txt');
const latestFolder = join(resolvedPath, 'latest');

const wait = millisec => new Promise(resolve => setTimeout(() => resolve(), millisec));

const preTest = async () => {
	fs.ensureDirSync(resolvedPath);
	fs.ensureFileSync(oldestFile);
	const timeout1 = await wait(2000);
	console.log('Created file');
	clearTimeout(timeout1);
	fs.ensureDirSync(latestFolder);
	const timeout2 = await wait(2000);
	clearTimeout(timeout2);
	console.log('Created folder');
	const timeout3 = await wait(2000);
	clearTimeout(timeout3);
	fs.writeFileSync(oldestFile, 'test2');
	console.log('Modified file');
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
