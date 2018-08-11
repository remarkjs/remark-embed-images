'use strict'

var fs = require('fs')
var path = require('path')
var mimes = require('mime/lite')
var visit = require('unist-util-visit')

module.exports = embedImages

var relative = /^\.{1,2}\//

function embedImages() {
  return transformer
}

function transformer(tree, file, done) {
  var count = 0

  visit(tree, 'image', visitor)

  if (!count) {
    done()
  }

  function visitor(node) {
    var url = node.url

    if (url && relative.test(url)) {
      count++
      fs.readFile(path.resolve(file.cwd, file.dirname, url), 'base64', one)
    }

    function one(err, data) {
      var mime

      if (err) {
        count = Infinity
        return done(err)
      }

      mime = mimes.getType(path.extname(url))

      if (mime) {
        node.url = 'data:' + mime + ';base64,' + data
      }

      if (--count === 0) {
        done()
      }
    }
  }
}
