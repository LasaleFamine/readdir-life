import path from 'path';
import test from 'ava';
import fn from './../src';

const resolvedPath = path.join(__dirname, 'data-test');

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

