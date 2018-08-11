'use strict';

const test = require('tape');
const remark = require('remark');
const html = require('remark-html');
const vfile = require('to-vfile');
const embedImages = require('.');

const FOO = vfile.readSync({path: 'fixtures/foo.md'});
const FOO_RESULT_MD = vfile.readSync('fixtures/foo-result.md');
const FOO_RESULT_HTML = vfile.readSync('fixtures/foo-result.html');

test('remark-embed-images', function (t) {
  remark()
    .use(embedImages)
    .process(FOO, function (err, file) {
      t.ifErr(err);

      t.equal(String(file), FOO_RESULT_MD.contents.toString());

      t.end();
    });
});

test('integration test with remark-html', function (t) {
  remark()
    .use(embedImages)
    .use(html)
    .process(FOO, function (err, file) {
      t.ifErr(err);

      t.equal(String(file), FOO_RESULT_HTML.contents.toString());

      t.end();
    });
});
