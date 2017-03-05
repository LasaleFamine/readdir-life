import {resolve} from 'path';
import test from 'ava';
import fn from './../src';

test('throw when dir is not passed (latest)', async t => {
	const err = await t.throws(fn.latest());
	t.is(err.message, 'Path must be a string. Received undefined');
});

test('throw when dir is not passed (oldest)', async t => {
	const err = await t.throws(fn.oldest());
	t.is(err.message, 'Path must be a string. Received undefined');
});

test('throw when dir is not passed (sortLatest)', async t => {
	const err = await t.throws(fn.sortLatest());
	t.is(err.message, 'Path must be a string. Received undefined');
});

test('throw when dir is not passed (sortOldest)', async t => {
	const err = await t.throws(fn.sortOldest());
	t.is(err.message, 'Path must be a string. Received undefined');
});

test('throw when readdir throws', async t => {
	const err = await t.throws(fn.latest('some/path/that/not/exist'));
	t.is(err.message, `ENOENT: no such file or directory, scandir '${resolve('some/path/that/not/exist')}'`);
});
