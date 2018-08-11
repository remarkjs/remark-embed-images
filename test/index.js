'use strict'

var test = require('tape')
var remark = require('remark')
var html = require('remark-html')
var vfile = require('to-vfile')
var embedImages = require('..')

test('remark-embed-images', function(t) {
  var input = vfile.readSync({cwd: __dirname, path: 'fixtures/foo.md'})

  t.plan(2)

  remark()
    .use(embedImages)
    .process(input, function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [
          null,
          String(
            vfile.readSync({cwd: __dirname, path: 'fixtures/foo-result.md'})
          )
        ],
        'should inline images'
      )
    })

  remark()
    .use(embedImages)
    .use(html)
    .process(input, function(err, file) {
      t.deepEqual(
        [err, String(file)],
        [
          null,
          String(
            vfile.readSync({cwd: __dirname, path: 'fixtures/foo-result.html'})
          )
        ],
        'should integrate with remark-html'
      )
    })
})
