# remark-embed-images

> Embed images with data: URIs, inlining base64-encoded sources


## Usage

Input:
```md
![A PNG](./foo.png)
```

Process:
```js
const embedImage = require('remark-embed-images');
const vfile = require('to-vfile')
const MARKDOWN = vfile.readSync('myfile.md');

remark()
  .use(embedImages)
  .process(MARKDOWN, function (err, file) {
    vfile.writeSync({path: 'myfile_inlined.md', contents: String(file)});
  });
```

Output:
```md
![A PNG](data:image/png;base64,0000...)
```
