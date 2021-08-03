import fs from 'fs'
import path from 'path'
import mimes from 'mime/lite.js'
import {visit} from 'unist-util-visit'

var relative = /^\.{1,2}\//

export default function embedImages() {
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

    function one(error, data) {
      var mime

      if (error) {
        count = Infinity
        return done(error)
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
