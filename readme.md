# remark-embed-images

[![Travis][travis-badge]][travis]
[![Circle][circle-badge]][circle]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Chat][chat-badge]][chat]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]

Embed local images as data URIs, inlining files as base64-encoded values.

## Installation

[npm][]:

```bash
npm install remark-embed-images
```

## Usage

Say we have [foo.png][], and next to it the following file, `example.md`:

```markdown
![A PNG file](./foo.png)
```

And our script, `example.js`, looks as follows:

```javascript
var vfile = require('to-vfile')
var remark = require('remark')
var embed = require('remark-embed-images')

remark()
  .use(embed)
  .process(vfile.readSync('example.md'), function(err, file) {
    if (err) throw err
    console.log(String(file))
  })
```

Now, running `node example` yields:

```markdown
![A PNG file](data:image/png;base64,iVBORw0…)
```

## API

### `remark.use(embedImages)`

Embed local images as data URIs.

## Contribute

See [`contributing.md` in `remarkjs/remark`][contributing] for ways to get
started.

This organisation has a [Code of Conduct][coc].  By interacting with this
repository, organisation, or community you agree to abide by its terms.

## License

[MIT][license] © [David Herges][author]

<!-- Definitions -->

[travis-badge]: https://img.shields.io/travis/remarkjs/remark-embed-images.svg

[travis]: https://travis-ci.org/remarkjs/remark-embed-images

[circle-badge]: https://img.shields.io/circleci/project/github/remarkjs/remark-embed-images/master.svg

[circle]: https://circleci.com/gh/remarkjs/remark-embed-images

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-embed-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-embed-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-embed-images.svg

[downloads]: https://www.npmjs.com/package/remark-embed-images

[chat-badge]: https://img.shields.io/badge/join%20the%20community-on%20spectrum-7b16ff.svg

[chat]: https://spectrum.chat/unified/remark

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[license]: license

[author]: https://spektrakel.de

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[foo.png]: test/fixtures/foo.png
