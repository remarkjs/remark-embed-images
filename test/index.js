import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import {remark} from 'remark'
import {VFile} from 'vfile'
import remarkHtml from 'remark-html'
import remarkEmbedImages from '../index.js'

test('remark-embed-images', async () => {
  assert.match(
    String(
      await remark()
        .use(remarkEmbedImages)
        .process('![](./test/fixtures/foo/foo.png)')
    ),
    /!\[]\(data:image\/png;base64,/,
    'should inline images w/o file path'
  )

  assert.match(
    String(
      await remark()
        .use(remarkEmbedImages)
        .process('![](test/fixtures/foo/foo.png)')
    ),
    /!\[]\(data:image\/png;base64,/,
    'should inline images w/o file path'
  )

  try {
    await remark()
      .use(remarkEmbedImages)
      .process('![Some missing image](./missing.png)')
    assert.fail()
  } catch (error) {
    assert.match(
      String(error),
      /no such file or directory/,
      'should throw for missing files'
    )
  }

  const input = new URL('fixtures/foo/input.md', import.meta.url)
  const output = new URL('foo-output.html', import.meta.url)
  const expected = String(await fs.readFile(output))
  const actual = String(
    await remark()
      .use(remarkEmbedImages)
      .use(remarkHtml, {sanitize: false})
      .process(new VFile({path: input, value: await fs.readFile(input)}))
  )
  assert.equal(actual, expected, 'should integrate with `remark-html`')
})

test('fixtures', async function (t) {
  const base = new URL('fixtures/', import.meta.url)
  const folders = await fs.readdir(base)

  let index = -1

  while (++index < folders.length) {
    const folder = folders[index]

    if (folder.startsWith('.')) continue

    await t.test(folder, async function () {
      const folderUrl = new URL(folder + '/', base)
      const inputUrl = new URL('input.md', folderUrl)
      const outputUrl = new URL('output.md', folderUrl)

      const input = String(await fs.readFile(inputUrl))

      /** @type {string} */
      let output

      const proc = remark().use(remarkEmbedImages)

      try {
        output = String(await fs.readFile(outputUrl))
      } catch {
        output = input
      }

      const file = new VFile({path: inputUrl, value: input})
      assert.equal(String(await proc.process(file)), String(output))
    })
  }
})
