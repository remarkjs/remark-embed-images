'use strict';

const path = require('path');
const datauri = require('datauri').sync;
const visit = require('unist-util-visit');

module.exports = attacher;

function attacher() {
  return transformer;

  function transformer(tree, file) {
    visit(tree, 'image', visitor);

    function visitor(node) {
      const url = String(node.url);
      /* Unused variables:
       * const alt = node.alt;
       * const title = node.title;
       */

      let local = url.startsWith('./') || url.startsWith('../');
      if (local) {
        const imageFileUrl = path.resolve(file.dirname, url);

        node.url = datauri(imageFileUrl);
      }
    }
  }
}
