'use strict'

var path = require('path')
var datauri = require('datauri').sync
var visit = require('unist-util-visit')

module.exports = embedImages

var relative = /^\.{1,2}\//

function embedImages() {
  return transformer
}

function transformer(tree, file) {
  visit(tree, 'image', visitor)

  function visitor(node) {
    var url = String(node.url)

    if (relative.test(url)) {
      node.url = datauri(path.resolve(file.dirname, url))
    }
  }
}
