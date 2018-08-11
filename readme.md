# remark-embed-images [![Build Status][build-badge]][build-status] [![Coverage Status][coverage-badge]][coverage-status] [![Chat][chat-badge]][chat]

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

[build-badge]: https://img.shields.io/travis/remarkjs/remark-embed-images.svg

[build-status]: https://travis-ci.org/remarkjs/remark-embed-images

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-embed-images.svg

[coverage-status]: https://codecov.io/github/remarkjs/remark-embed-images

[chat-badge]: https://img.shields.io/gitter/room/remarkjs/Lobby.svg

[chat]: https://gitter.im/remarkjs/Lobby

[license]: license

[author]: https://spektrakel.de

[npm]: https://docs.npmjs.com/cli/install

[contributing]: https://github.com/remarkjs/remark/blob/master/contributing.md

[coc]: https://github.com/remarkjs/remark/blob/master/code-of-conduct.md

[foo.png]: test/fixtures/foo.png
