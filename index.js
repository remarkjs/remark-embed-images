/**
 * @typedef {import('mdast').Root} Root
 */

import fs from 'node:fs'
import path from 'node:path'
import mimes from 'mime/lite.js'
import {visit} from 'unist-util-visit'

const relative = /^\.{1,2}\//

/**
 * Plugin to embed local images as data URIs, inlining files as base64-encoded
 * values.
 *
 * @type {import('unified').Plugin<void[], Root>}
 */
export default function embedImages() {
  return (tree, file, done) => {
    let count = 0

    visit(tree, 'image', (node) => {
      if (node.url && relative.test(node.url)) {
        count++

        fs.readFile(
          path.resolve(file.cwd, file.dirname, node.url),
          'base64',
          (error, data) => {
            if (error) {
              count = Number.POSITIVE_INFINITY
              return done(error)
            }

            const mime = mimes.getType(path.extname(node.url))

            if (mime) {
              node.url = 'data:' + mime + ';base64,' + data
            }

            if (--count === 0) {
              done()
            }
          }
        )
      }
    })

    if (!count) {
      done()
    }
  }
}
