---
layout: post
title: 'ChatGPTのStreamのNode.jsで取り扱う'
date: 2023-12-20 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
---

Node.jsのChatGPTのライブラリではStreamを用いた通信を行うことができます。
ただ、扱いが面倒なのでこのライブラリを使うと便利です。といった内容です。

https://sdk.vercel.ai/docs/guides/providers/openai-functions

```ts
const api = new OpenAI()

const messages = [{ role: "user", content: "定時は何時ですか？" }]

const stream = await api.chat.completions.create({
  model: "gpt-4-1106-preview",
  messages: messages,
  max_tokens: 2048,
  stream: true,
})

for await (const data of stream) {
  const [choice] = data.choices
  console.log(choice)
}
```

console.logにはこのような値が出力されます。

```ts
{
  index: 0,
  delta: { role: 'assistant', content: '' },
  finish_reason: null
}
{ index: 0, delta: { content: '通' }, finish_reason: null }
{ index: 0, delta: { content: '常' }, finish_reason: null }
{ index: 0, delta: { content: 'の' }, finish_reason: null }
{ index: 0, delta: { content: '勤' }, finish_reason: null }
{ index: 0, delta: { content: '務' }, finish_reason: null }
{ index: 0, delta: { content: '時間' }, finish_reason: null }
{ index: 0, delta: { content: 'や' }, finish_reason: null }
{ index: 0, delta: { content: '定' }, finish_reason: null }
{ index: 0, delta: { content: '時' }, finish_reason: null }
```

文章がバラバラの状態で返却されるので配列に書き込み結合します。

```ts
const contents = []

for await (const data of stream) {
  const [choice] = data.choices
  if (typeof choice.delta.content === "string") {
    contents.push(choice.delta.content)
  }
  const message = contents.join("")
  console.log(message)
}
```

または、このようにも書けます。

```ts
let message = ""

for await (const data of stream) {
  const [choice] = data.choices
  if (typeof choice.delta.content === "string") {
    message += choice.delta.content
  }
  console.log(message)
}
```

変数 `message` の中身はこのようになります。

```
通
通常
通常の
通常のビ
通常のビジ
通常のビジネ
通常のビジネス
通常のビジネス環
通常のビジネス環境
通常のビジネス環境では
通常のビジネス環境では、
通常のビジネス環境では、定
通常のビジネス環境では、定時
通常のビジネス環境では、定時は
通常のビジネス環境では、定時は会
```

# Function Calling

このようなツールを定義して引数に加えてみます。

```ts
const tools = [
  {
    type: "function",
    function: {
      name: "ask_about_company_regulations",
      description: "社内の規定について質問する",
      parameters: {
        type: "object",
        properties: {
          text: {
            type: "string",
            description: "Question text regarding company regulations",
          },
        },
        required: ["text"],
      },
    },
  },
]

const stream = await api.chat.completions.create({
  model: "gpt-4-1106-preview",
  messages: messages,
  max_tokens: 2048,
  stream: true,
  tool_choice: "auto",
  tools: tools,
})
```

するとこのようなレスポンスに変化します。
先ほどの `choice.delta.content` が含まれていないことが分かります。

```ts
{
  index: 0,
  delta: { role: 'assistant', content: null, tool_calls: [ [Object] ] },
  finish_reason: null
}
{ index: 0, delta: { tool_calls: [ [Object] ] }, finish_reason: null }
{ index: 0, delta: { tool_calls: [ [Object] ] }, finish_reason: null }
{ index: 0, delta: { tool_calls: [ [Object] ] }, finish_reason: null }
```

この `tool_calls` の中身をのぞいてみます。

```ts
for await (const data of stream) {
  const [choice] = data.choices
  if (typeof choice.delta.tool_calls !== "undefined") {
    const [toolCall] = choice.delta.tool_calls
    console.log(toolCall)
  }
}
```

このように引数が文字列としてバラバラで返却されます。

```ts
{
  index: 0,
  id: 'call_ml2fAzqUnvIBdBLZ0yQycIIb',
  type: 'function',
  function: { name: 'ask_about_company_regulations', arguments: '' }
}
{ index: 0, function: { arguments: '{"' } }
{ index: 0, function: { arguments: 'text' } }
{ index: 0, function: { arguments: '":"' } }
{ index: 0, function: { arguments: 'What' } }
{ index: 0, function: { arguments: ' time' } }
{ index: 0, function: { arguments: ' is' } }
{ index: 0, function: { arguments: ' the' } }
{ index: 0, function: { arguments: ' fixed' } }
{ index: 0, function: { arguments: ' starting' } }
{ index: 0, function: { arguments: ' time' } }
{ index: 0, function: { arguments: ' for' } }
{ index: 0, function: { arguments: ' work' } }
{ index: 0, function: { arguments: '?"' } }
{ index: 0, function: { arguments: '}' } }
```

ここまでくると扱いづらく非常に厄介です。コードが複雑になります。

```ts
for await (const data of stream) {
  const [choice] = data.choices
  if (typeof choice.delta.tool_calls !== "undefined") {
    const [toolCall] = choice.delta.tool_calls
    // 色々な処理
  }
  // 色々な処理
}
```

# ライブラリを使用する

そこで ai というライブラリを使うと少しコードが短くなります。

https://sdk.vercel.ai/docs/guides/providers/openai-functions

このようなコードになり返り値にStreamを受け取ることができます。

```ts
import { OpenAIStream } from "ai"

const resp = await api.chat.completions.create({
  stream: true,
  model: Config.chatModel,
  messages: messages,
  max_tokens: Config.maxTokens,
  functions:
})

const stream = OpenAIStream(resp, {
  experimental_onFunctionCall: async (
    { name, arguments: args },
    createFunctionCallMessages,
  ) => {
    if (name === 'ask_about_company_regulations') {
      const message = "about_company_regulations"
      const newMessages = createFunctionCallMessages(message)
      return api.chat.completions.create({
        messages: [...messages, ...newMessages],
        stream: true,
        model: "gpt-4-1106-preview",
      });
    }
  },
})
```

ただこのStreamからそのまま文字列の値を取り出すことは出来ないので以下のような関数を定義しています。

```ts
declare global {
  interface ReadableStream<R> {
    [Symbol.asyncIterator](a?: never): AsyncIterableIterator<R>
  }
}

export async function* toTextStream(stream: ReadableStream) {
  const chunks = []

  for await (const data of stream) {
    chunks.push(data)
    yield Buffer.concat(chunks).toString()
  }
}
```

このように使用しています。

```ts
const stream = OpenAIStream(resp)

const textStream = toTextStream(stream)

for await (const text of textStream) {
  console.log(text)
}
```

このStreamでは関数が何回も呼び出されるので、throttleを使うと遅延させることができます。

```ts
import { throttle } from "lodash"

const handleText = (text: string) => {
  // テキストで何かする
}

const handleTextThrottle = throttle(handleText, 1000)

for await (const text of textStream) {
  handleTextThrottle(text)
}
```

Slackの呼び出し回数を減らすためにもこのような処理が必要です。

# 最後に

このライブラリはChatGPTでないLLMにも対応しており、今後はLLMのサイトへの組み込みが進んでいく可能性があります。

https://sdk.vercel.ai/docs/getting-started

便利なのでぜひ使ってみてください。
