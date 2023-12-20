---
layout: post
title: 'ChatGPTとSlackとNotionを組み合わせてBotを作る'
date: 2023-12-20 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
---

社内のSlackではChatGPTとNotionを組み合わせて作られたBotを動かしています。
主に2つの機能を実装しています。

- 文章を作成してNotionのデータベースに書き込む
- データベースの内容を検索して質問に答える

SlackのChatGPTのアプリは既に開発が予定されているので、ファイルの読み込みやスラッシュコマンドといった機能の自社での開発は見送っています。

https://slack.com/intl/ja-jp/blog/news/chatgpt-app-for-slack

# Notionに情報を書き込む

Slackのスレッドの内容を取得してChatGPTに渡すことで文章を生成します。
このような関数を定義してスレッドのメッセージを収集しています。

```ts
import { WebClient } from "@slack/web-api"
import { ChatCompletionMessageParam } from "openai/resources"
import { Config } from "../../config"

type Props = {
  channel: string
  threadTs?: string
  user: string
}

export const readMessagesFromSlackThread = async (props: Props) => {
  const client = new WebClient(Config.slackToken)

  if (typeof props.threadTs === "undefined") {
    return [] as ChatCompletionMessageParam[]
  }

  const messages: ChatCompletionMessageParam[] = []

  const repliesResp = await client.conversations.replies({
    channel: props.channel,
    ts: props.threadTs,
    inclusive: true,
  })

  if (typeof repliesResp.messages === "undefined") {
    return [] as ChatCompletionMessageParam[]
  }

  const replies = repliesResp.messages.sort((a, b) => {
    if (typeof a.ts === "undefined" || typeof b.ts === "undefined") {
      return 0
    }
    return parseFloat(a.ts) - parseFloat(b.ts)
  })

  for (const reply of replies) {
    if (typeof reply.text === "undefined") continue
    const content = reply.text.replace(/<@.*>/gi, "").trim()
    if (reply.bot_id === Config.slackBotId) {
      messages.push({ role: "assistant", content: content })
    }
    if (reply.bot_id !== Config.slackBotId) {
      messages.push({ role: "user", content: content })
    }
  }

  return messages
}
```

このコードの中のConfigの以下は環境変数などで独自に設定しておく必要があります。

- slackToken
- slackBotId

## メモや記事を作成する

プログラマ同士の会話をまとめて知見としてNotionのデータベースに書き込むことができます。

このようなプロンプトを用意してChatGPTに渡します。

```
あなたはプロのライターとしてプログラマ向けの日本語の記事を作成します。
ユーザのやり取りから次の形式のJSONを作成してください。
${sampleJson}
本文はマークダウンで見出しをh1から順に適切に使用しなるだけ省略せず詳細に書いてください。
```

コードではこのような関数を定義して呼び出しています。

```ts
import { OpenAI } from "openai"
import { ChatCompletionMessageParam } from "openai/resources"
import { Config } from "../../config"

type Props = {
  messages: string[]
}

type JsonFormat = {
  title: string
  markdown: string
  tags: string[]
  message: string
}

export const createNote = async (props: Props) => {
  const api = new OpenAI()

  const sampleJson: JsonFormat = {
    title: "質問のタイトル",
    markdown: "回答の本文",
    tags: ["タグ1", "タグ2"],
    message: "ユーザへの応答",
  }

  const jsonFormat = JSON.stringify(sampleJson)

  const prompt = `あなたはプロのライターとしてプログラマ向けの日本語の記事を作成します。
ユーザのやり取りから次の形式のJSONを作成してください。
${jsonFormat}
本文はマークダウンで見出しをh1から順に適切に使用しなるだけ省略せず詳細に書いてください。`

  const messages: ChatCompletionMessageParam[] = [
    {
      role: "system",
      content: prompt,
    },
    ...props.messages.map((message) => {
      return { role: "user" as const, content: message }
    }),
  ]

  const resp = await api.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: messages,
    max_tokens: 2048,
    response_format: { type: "json_object" },
  })

  const [choice] = resp.choices

  const jsonText = choice?.message.content ?? null

  if (jsonText === null) {
    return null
  }

  return JSON.parse(jsonText) as JsonFormat
}
```

このBotはチャンネルごとに処理が切り替わるようになっています。
プログラマ以外のチャンネルではそのようなプロンプトに切り替えるのが良いです。


## FAQを作成する

社内のスレッドでのお問い合わせ対応を要約してFAQを作成しデータベースに記録できます。

社内では2つのチャンネルでそのようなやり取りが発生しています。

- 総務へのお問い合わせ
- 情セキュへのお問い合わせ

プロンプトはこのようになります。

```
ユーザのやり取りを要約してFAQを作成して次の形式のJSONを返却してください。
====
${sampleJson}
====
回答の本文はマークダウンでなるだけ省略せず詳細に書いてください。
```

ChatGPTの応答するJSONの形式にはタグなども含めています。

```ts
const sampleJson: JsonFormat = {
  question: "質問のタイトル",
  answer: "短い回答",
  tags: ["タグ1", "タグ2"],
  markdown: "回答の本文",
  message: "ユーザへの応答",
}
```

Notionには本文とは別に要約した回答をカラムに含めておくと探しやすくなります。

# 指示を検出する

記事を作成したりFAQを作成したりする際に指示を検出することができます。

具体的には以下のようなメンションから指示を検出してます。

- @bot FAQを作成
- @bot メモにして
- @bot スレッドのやり取りから記事を作ってください

このようなプロンプトを定義してChatGPTに指示の検出をお願いしています。

```
以下のメッセージがあなたへの指示である場合はを関連する指示を1つだけ選んでください。関連しない場合はnullとしてください。
メッセージ: ${message}

可能な指示:
[
  {
    "name": "create_faq", "description": "FAQを作成する"
  }
]

次の形式のJSONでを応答してください。

{
  function: "実行する関数", or null
  text_to_user: "string",
}
```

関数はこのように定義しています。

```ts
import { OpenAI } from "openai"

type ResponseFormat = {
  words: string[]
}

export const extractSearchWords = async (text: string) => {
  const api = new OpenAI({ apiKey: Config.openAiKey })

  const sampleJson: ResponseFormat = {
    words: ["名詞A", "名詞B"],
  }

  const jsonFormat = JSON.stringify(sampleJson)

  const systemText = `以下のメッセージからデータベースの検索に使用する為の名詞を抜き出してJSON形式で応答しなさい。
形式:
${jsonFormat}

メッセージ: ${text}
`

  const resp = await api.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: systemText,
      },
    ],
    response_format: { type: "json_object" },
  })

  const [choice] = resp.choices

  const jsonText = choice?.message.content ?? null

  if (jsonText === null) {
    return []
  }

  const json = JSON.parse(jsonText) as ResponseFormat

  return json.words
}
```

このように使用できます。

```ts
const userInstruction = await detectUserInstruction({
  message: userMessage,
  instructions: [
    { name: "create_faq", description: "FAQを作成する" },
    {
      name: "create_note",
      description: "ノートまたはメモを作成する",
    },
    { name: "create_article", description: "記事を作成する" },
  ],
})

if (userInstruction?.function === "create_faq") {
  // FAQを作るぜ
}
```

# Notionの情報を活用して質問に答える

事前に指示の内容を分類する

## 単語を抽出する

Kuromojiのようなライブラリを用いて形態素解析を行い文章から名詞を抽出することができますがメモリを多く消費します。
もし使用頻度の少ない機能であればChatGPTを用いて文章から名詞を抽出することもできます。

```
以下のメッセージからデータベースの検索に使用する為の名詞を抜き出してJSON形式で応答しなさい。
形式:
{
  "words": ["名詞A", "名詞B"]
}

メッセージ: ${text}
```

コードはこのように書けます。JSONを返却するように `json_object` を設定しています。

```ts
import { OpenAI } from "openai"

type ResponseFormat = {
  words: string[]
}

export const extractSearchWords = async (text: string) => {
  const api = new OpenAI({ apiKey: Config.openAiKey })

  const sampleJson: ResponseFormat = {
    words: ["名詞A", "名詞B"],
  }

  const jsonFormat = JSON.stringify(sampleJson)

  const systemText = `以下のメッセージからデータベースの検索に使用する為の名詞を抜き出してJSON形式で応答しなさい。
形式:
${jsonFormat}

メッセージ: ${text}
`

  const resp = await api.chat.completions.create({
    model: "gpt-4-1106-preview",
    messages: [
      {
        role: "system",
        content: systemText,
      },
    ],
    response_format: { type: "json_object" },
  })

  const [choice] = resp.choices

  const jsonText = choice?.message.content ?? null

  if (jsonText === null) {
    return []
  }

  const json = JSON.parse(jsonText) as ResponseFormat

  return json.words
}
```

# Streamを取り扱う

ChatGPTのAPIから返却されたStreamを用いてSlackのメッセージを更新するとAPIを呼び出し過ぎて制限が発生します。

```ts
for await (const text of textStream) {
  client.chat.update({
    channel: props.channel,
    thread_ts: props.threadTs,
    ts: chatTs,
    text: text,
  })
}
```

会社の環境ではこのようなエラーが発生しました。

```
web-api:WebClient:1 API Call failed due to rate limiting. Will retry in 10 seconds.
```

そこで1000msの間隔を空けてAPIを呼び出すようにしています。

```ts
import { throttle } from "lodash"

const writeMessage = (text: string) => {
  return client.chat.update({
    channel: props.channel,
    thread_ts: props.threadTs,
    ts: chatTs,
    text: text,
  })
}

const writeMessageThrottle = throttle(writeMessage, 1000)

for await (const text of textStream) {
  await writeMessageThrottle(text)
}
```

Streamの最初の文字列を投稿、それ以降を更新するようにしています。

```ts
let chatTs: string | null = null

const writeMessage = (text: string) => {
  if (chatTs === null) return
  return client.chat.update({
    channel: props.channel,
    thread_ts: props.threadTs,
    ts: chatTs,
    text: props.to ? `<@${props.to}> ${text}` : text,
  })
}

/**
 * web-api:WebClient:1 API Call failed due to rate limiting. Will retry in 10 seconds.
 */
const writeMessageThrottle = throttle(writeMessage, 1000)

for await (const text of textStream) {
  if (chatTs === null) {
    const resp = await client.chat.postMessage({
      channel: props.channel,
      thread_ts: props.threadTs,
      text: props.to ? `<@${props.to}> ${text}` : text,
    })
    if (resp.ts === undefined) return
    chatTs = resp.ts
    continue
  }
  try {
    await writeMessageThrottle(text)
  } catch (error) {
    logger.error(error)
  }
}
```

最初の `client.chat.postMessage` の呼び出して取得したレスポンスを用いて、更新する為のAPIを呼び出しています。

あとAPIのエラーが発生した場合に処理が停止しないようにAPIの呼び出しはtry-catchで囲っておくのが良いです。

```ts
try {
  await writeMessageThrottle(text)
} catch (error) {
  logger.error(error)
}
```

# おまけ

## 文章を評価する

例えば以下のような文章があったとして、この文章が求める条件と一致するかを計算できます。

```
性別は男性で、年齢は27歳で、職業はプログラマをしています。
```

このような条件との一致を計算することができます。

```
こちらは文章です。

===
性別は男性で、年齢は27歳で、職業はプログラマをしています。
===

以下の条件との一致を計算しなさい。

===
性別: 男性
年齢: 25歳前後
職業: IT系
===

以下のJSONの形式で応答してください。

===
{
  "性別": "男性 or 女性",
  "性別の評価": "100点中の数値",
  "性別の評価の理由": "理由",
  "年齢": "年齢の数字",
  "年齢の評価": "100点中の数値",
  "年齢の評価の理由": "理由",
  "職業": "職業の名称",
  "職業の評価": "100点中の数値",
  "職業の評価の理由": "理由",
}
===
```

このような結果が得られます。

```
{
  "性別": "男性",
  "性別の評価": 100,
  "性別の評価の理由": "条件と完全に一致するから",
  "年齢": 27,
  "年齢の評価": 80,
  "年齢の評価の理由": "条件は25歳前後だけど、27歳は少し外れるから",
  "職業": "プログラマ",
  "職業の評価": 100,
  "職業の評価の理由": "プログラマはIT系に含まれるから"
}
```

## 記事を分析する

他にも以下のような評価を設定することで、プレスリリースなどの記事を分析することができます。

- アプリとの関係性
- ITとの関係性
- プログラミングとの関係性
- メタバースとの関係性
