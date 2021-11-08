# remark-embed-images

[![Build][build-badge]][build]
[![Coverage][coverage-badge]][coverage]
[![Downloads][downloads-badge]][downloads]
[![Size][size-badge]][size]
[![Sponsors][sponsors-badge]][collective]
[![Backers][backers-badge]][collective]
[![Chat][chat-badge]][chat]

**[remark][]** plugin to embed local images as data URIs.

## Contents

*   [What is this?](#what-is-this)
*   [When should I use this?](#when-should-i-use-this)
*   [Install](#install)
*   [Use](#use)
*   [API](#api)
    *   [`unified().use(remarkEmbedImages)`](#unifieduseremarkembedimages)
*   [Types](#types)
*   [Compatibility](#compatibility)
*   [Security](#security)
*   [Related](#related)
*   [Contribute](#contribute)
*   [License](#license)

## What is this?

This package is a [unified][] ([remark][]) plugin that inlines images as data
URIs.

**unified** is a project that transforms content with abstract syntax trees
(ASTs).
**remark** adds support for markdown to unified.
**mdast** is the markdown AST that remark uses.
This is a remark plugin that transforms mdast.

## When should I use this?

You can use this package when you want to move markdown that references local
images around more easily, because images will be inlined.
This does makes the markdown quite hard to read and isn’t supported everywhere
(such as GitHub), because data URIs might result in security risks.

## Install

This package is [ESM only](https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c).
In Node.js (version 12.20+, 14.14+, or 16.0+), install with [npm][]:

```sh
npm install remark-embed-images
```

In Deno with [Skypack][]:

```js
import remarkEmbedImages from 'https://cdn.skypack.dev/remark-embed-images@3?dts'
```

In browsers with [Skypack][]:

```html
<script type="module">
  import remarkEmbedImages from 'https://cdn.skypack.dev/remark-embed-images@3?min'
</script>
```

## Use

Say we have an image [`foo.png`][foo.png] and next to it the following file
`example.md`:

```markdown
![A pink square](./foo.png)
```

And our module `example.js` looks as follows:

```js
import {read} from 'to-vfile'
import {remark} from 'remark'
import remarkEmbedImages from 'remark-embed-images'

main()

async function main() {
  const file = await remark()
    .use(remarkEmbedImages)
    .process(await read('example.md'))

  console.log(String(file))
}
```

Now running `node example.js` yields:

```markdown
![A pink square](data:image/png;base64,iVBORw0…)
```

## API

This package exports no identifiers.
The default export is `remarkEmbedImages`.

### `unified().use(remarkEmbedImages)`

Plugin to embed local images as data URIs.
There are no options.

## Types

This package is fully typed with [TypeScript][].
There are no extra exported types.

## Compatibility

Projects maintained by the unified collective are compatible with all maintained
versions of Node.js.
As of now, that is Node.js 12.20+, 14.14+, and 16.0+.
Our projects sometimes work with older versions, but this is not guaranteed.

This plugin works with `unified` version 6+ and `remark` version 7+.

## Security

Always be careful with user input.
For example, it’s possible to hide JavaScript inside images (such as GIFs,
WebPs, and SVGs).
User provided images open you up to a [cross-site scripting (XSS)][xss] attack.

## Related

*   [`remarkjs/remark-images`](https://github.com/remarkjs/remark-images)
    — add a simpler image syntax
*   [`remarkjs/remark-unwrap-images`](https://github.com/remarkjs/remark-unwrap-images)
    — remove the wrapping paragraph for images

## Contribute

See [`contributing.md`][contributing] in [`remarkjs/.github`][health] for ways
to get started.
See [`support.md`][support] for ways to get help.

This project has a [code of conduct][coc].
By interacting with this repository, organization, or community you agree to
abide by its terms.

## License

[MIT][license] © [David Herges][author]

<!-- Definitions -->

[build-badge]: https://github.com/remarkjs/remark-embed-images/workflows/main/badge.svg

[build]: https://github.com/remarkjs/remark-embed-images/actions

[coverage-badge]: https://img.shields.io/codecov/c/github/remarkjs/remark-embed-images.svg

[coverage]: https://codecov.io/github/remarkjs/remark-embed-images

[downloads-badge]: https://img.shields.io/npm/dm/remark-embed-images.svg

[downloads]: https://www.npmjs.com/package/remark-embed-images

[size-badge]: https://img.shields.io/bundlephobia/minzip/remark-embed-images.svg

[size]: https://bundlephobia.com/result?p=remark-embed-images

[sponsors-badge]: https://opencollective.com/unified/sponsors/badge.svg

[backers-badge]: https://opencollective.com/unified/backers/badge.svg

[collective]: https://opencollective.com/unified

[chat-badge]: https://img.shields.io/badge/chat-discussions-success.svg

[chat]: https://github.com/remarkjs/remark/discussions

[npm]: https://docs.npmjs.com/cli/install

[skypack]: https://www.skypack.dev

[health]: https://github.com/remarkjs/.github

[contributing]: https://github.com/remarkjs/.github/blob/HEAD/contributing.md

[support]: https://github.com/remarkjs/.github/blob/HEAD/support.md

[coc]: https://github.com/remarkjs/.github/blob/HEAD/code-of-conduct.md

[license]: license

[author]: https://spektrakel.de

[remark]: https://github.com/remarkjs/remark

[foo.png]: test/fixtures/foo.png

[unified]: https://github.com/unifiedjs/unified

[xss]: https://en.wikipedia.org/wiki/Cross-site_scripting

[typescript]: https://www.typescriptlang.org
