import assert from 'node:assert/strict'
import fs from 'node:fs/promises'
import test from 'node:test'
import rehypeStringify from 'rehype-stringify'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import remarkStringify from 'remark-stringify'
import {unified} from 'unified'
import {VFile} from 'vfile'
import remarkEmbedImages from '../index.js'

test('remark-embed-images', async function (t) {
  await t.test('should expose the public api', async function () {
    assert.deepEqual(Object.keys(await import('../index.js')).sort(), [
      'default'
    ])
  })

  await t.test('should inline images w/o file path', async function () {
    assert.match(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkEmbedImages)
          .use(remarkStringify)
          .process('![](./test/fixtures/foo/foo.png)')
      ),
      /!\[]\(data:image\/png;base64,/
    )
  })

  await t.test('should inline images w/o file path', async function () {
    assert.match(
      String(
        await unified()
          .use(remarkParse)
          .use(remarkEmbedImages)
          .use(remarkStringify)
          .process('![](test/fixtures/foo/foo.png)')
      ),
      /!\[]\(data:image\/png;base64,/
    )
  })

  await t.test('should throw for missing files', async function () {
    try {
      await unified()
        .use(remarkParse)
        .use(remarkEmbedImages)
        .use(remarkStringify)
        .process('![Some missing image](./missing.png)')
      assert.fail()
    } catch (error) {
      assert.match(String(error), /no such file or directory/)
    }
  })

  await t.test('should integrate with rehype', async function () {
    const input = new URL('fixtures/foo/input.md', import.meta.url)
    const output = new URL('foo-output.html', import.meta.url)
    const expected = String(await fs.readFile(output))
    const actual = String(
      await unified()
        .use(remarkParse)
        .use(remarkEmbedImages)
        .use(remarkRehype)
        .use(rehypeStringify)
        .process(new VFile({path: input, value: await fs.readFile(input)}))
    )
    assert.equal(actual.trimEnd(), expected.trimEnd())
  })
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

      const proc = unified()
        .use(remarkParse)
        .use(remarkEmbedImages)
        .use(remarkStringify)

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
