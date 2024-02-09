---
layout: post
title: 'Node.jsでサイズの大きいCSVファイルを読み取る'
date: 2024-02-09 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
tags:
  - typescript
  - nodejs
---

Node.jsではある程度の大きなファイルを`readFile`で読み取ろうとするとエラーが発生します。

```ts
$ node
> await require("fs/promises").readFile("large.csv", "utf-8")
Uncaught RangeError: Invalid string length
    at readFileHandle (node:internal/fs/promises:539:25)
    at async REPL20:1:33
>
```

大きなCSVファイルを取り扱う場合は工夫が必要みたいです。

# CSVデータを読み取る

CSV文字列は `csv-parse` というライブラリを用いてオブジェクトに変換できます。

https://www.npmjs.com/package/csv-parse

型定義を省略するとこのように書けます。

```ts
import { parse } from "csv-parse/sync"
import { readFile, readdir } from "fs/promises"

const fileText = await readFile(`parts/${fileName}`, "utf-8")

const recordKeys = [
  "id",
  "name",
]

const records = parse(fileText, {
  columns: recordKeys,
  skip_empty_lines: true,
})

for (const record of records) {
  console.log(record)
}
```

ライブラリは `csv-parse` ではなく `csv-parse/sync` を使用しています。

# Streamを使用する

Streamを使用することでも大きなファイルを読み取ることが出来ます。

```ts
import { createReadStream } from "fs"

const stream = await createReadStream("sample.csv", "utf-8")

for await (const text of stream) {
  console.log(text)
}
```

更に読み取った文字列をCSVデータに変換する必要があります。

```ts
import { parse } from "csv-parse"

const parser = parse({
  columns: recordKeys,
  trim: true,
  skip_empty_lines: true,
})

for await (const record of stream.pipe(parser)) {
  console.log(record)
}
```

# ファイルを分割する

10万件ごとのようなまとまった件数のCSVデータを作成したい場合は、事前にファイルを分割して読み取る方法が考えられます。

macOSではこのコマンドを実行してファイルを分割できます。この場合は100000行ごとにファイルを分割します。

```
split -l 100000 large.csv
```

これはNode.jsのREPLからも実行することもできます。

```bash
$ node
> require("child_process").execSync("split -l 100000 large.csv")
```

100000行ごとにファイルであれば、`readFile`で読み取ることができます。

例えば `parts` というディレクトリに分割されたファイルが保存されている場合は以下のように読み取ることができます。

```ts
import { readFile, readdir } from "fs/promises"

const fileNames = await readdir(`${process.cwd()}/parts`)

for (const fileName of fileNames) {
  const fileText = await readFile(`parts/${fileName}`, "utf-8")

  console.log(fileText)
}
```

このように関数化することもできそうです。

```ts
import { exec } from "child_process"
import { promisify } from "util"
import { mkdir, mkdtemp, readFile, readdir } from "fs/promises"
import { join } from "path"
import { tmpdir } from "os"

const execPromise = promisify(exec)

type Options = {
  count: number
}

export async function* readLargeFile(filePath: string, options: Options) {
  const tmpDirectory = await mkdtemp(tmpdir())

  await mkdir(tmpDirectory, { recursive: true })

  await execPromise(
    `cd ${tmpDirectory} && split -l ${options.count} ${filePath}`,
  )

  const files = await readdir(tmpDirectory)

  for (const file of files) {
    console.log(file)
    const filePath = join(tmpDirectory, file)
    yield await readFile(filePath, "utf-8")
  }
}
```

ただ分割できる数に制限があり小さ過ぎるとこのようなエラーが発生します。

```
split: too many files
```

このように使用できます。

```ts
const texts = readLargeFile(filePath, { count: 10000 })

for await (const text of texts) {
  console.log(text.length)
}
```

最後に、このようにCSVデータに変換できます。

```ts
import { parse } from "csv-parse/sync"

const texts = readLargeFile(filePath, { count: 10000 })

const recordKeys = [
  "id",
  "name",
]

for await (const text of texts) {
  const record = parse(text, {
    columns: recordKeys,
    skip_empty_lines: true,
  })
  console.log(record)
}
```
