'use strict'

var path = require('path')
var test = require('tape')
var remark = require('remark')
var html = require('remark-html')
var vfile = require('to-vfile')
var embedImages = require('..')

test('remark-embed-images', function (t) {
  t.plan(5)

  remark()
    .use(embedImages)
    .process(read('foo.md'), function (error, file) {
      t.deepEqual(
        [error, String(file)],
        [null, String(read('foo-result.md')).replace(/\r\n/g, '\n')],
        'should inline images'
      )
    })

  remark()
    .use(embedImages)
    .use(html)
    .process(read('foo.md'), function (error, file) {
      t.deepEqual(
        [error, String(file)],
        [null, String(read('foo-result.html')).replace(/\r\n/g, '\n')],
        'should integrate with remark-html'
      )
    })

  remark()
    .use(embedImages)
    .process(read('error.md'), function (error, file) {
      t.deepEqual(
        [/no such file or directory/.test(error), file],
        [true, undefined],
        'should fail on missing images'
      )
    })

  remark()
    .use(embedImages)
    .process(read('empty.md'), function (error, file) {
      t.deepEqual(
        [error, String(file)],
        [null, String(read('empty.md')).replace(/\r\n/g, '\n')],
        'should work on documents without images'
      )
    })

  remark()
    .use(embedImages)
    .process(read('unknown-mime.md'), function (error, file) {
      t.deepEqual(
        [error, String(file)],
        [null, String(read('unknown-mime.md')).replace(/\r\n/g, '\n')],
        'should ignore extensions that are unknown'
      )
    })
})

function read(basename) {
  return vfile.readSync({cwd: __dirname, path: path.join('fixtures', basename)})
}
