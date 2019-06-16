'use strict'

var path = require('path')
var test = require('tape')
var remark = require('remark')
var html = require('remark-html')
var vfile = require('to-vfile')
var embedImages = require('..')

test('remark-embed-images', function(t) {
  t.plan(5)

  remark()
    .use(embedImages)
    .process(read('foo.md'), function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, String(read('foo-result.md'))],
        'should inline images'
      )
    })

  remark()
    .use(embedImages)
    .use(html)
    .process(read('foo.md'), function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, String(read('foo-result.html'))],
        'should integrate with remark-html'
      )
    })

  remark()
    .use(embedImages)
    .process(read('error.md'), function(err, file) {
      t.deepEqual(
        [/no such file or directory/.test(err), file],
        [true, undefined],
        'should fail on missing images'
      )
    })

  remark()
    .use(embedImages)
    .process(read('empty.md'), function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, String(read('empty.md'))],
        'should work on documents without images'
      )
    })

  remark()
    .use(embedImages)
    .process(read('unknown-mime.md'), function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [null, String(read('unknown-mime.md'))],
        'should ignore extensions that are unknown'
      )
    })
})

function read(basename) {
  return vfile.readSync({cwd: __dirname, path: path.join('fixtures', basename)})
}
