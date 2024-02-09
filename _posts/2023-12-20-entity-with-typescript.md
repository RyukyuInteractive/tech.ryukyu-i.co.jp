---
layout: post
title: 'TypeScriptで値オブジェクトを扱う'
date: 2023-12-20 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
---

リポジトリの紹介

https://github.com/RyukyuInteractive/next-template-domain

# 値オブジェクト

文字列や数字などのプリミティブな値の代わりに値オブジェクトを用いることでコードが少し安全になります。
値オブジェクトやエンティティの定義は、製品の仕様を考えるのにとても役に立ちます。

- 言語は何種類だっけ？
- ユーザのメールアドレスは必須だっけ？nullableだっけ？
- ユーザ名は何文字までだっけ？

変数をこのように定義したとします。

```ts
const language = new "ja"
```

この変数の値はこのように間違って「ja」を「jp」と書いてしまってもエラーになりません。
しかし、この変数の使い方によっては例えばデータベースに間違った値が書き込んでしまうこともあるかもしれません。

```ts
const language = new "jp"
```

このようにクラスや関数にしておけば、間違った値を入れようとすると型エラーになります。

```ts
import { z } from "@/domain/values/lang"

const language = new Language("ja")
```

## 定義する

クラスでこのように定義できます。
ここでは「zod」を用いて引数の値を検証していますが、どのような方法でも構いません。

```ts
import { z } from "zod"

export const zLanguage = z.union([
  z.literal("ja"),
  z.literal("vi"),
  z.literal("en"),
  z.literal("zh_cn"),
  z.literal("zh_tw"),
])

/**
 * 言語
 */
export class Language {
  readonly _key = "Language"

  constructor(readonly value: z.infer<typeof zLanguage> = "ja") {
    zLanguage.parse(value)
    Object.freeze(this)
  }
}
```

このクラスは「ja」や「vi」に対応しているが「fr」に対応していないといった製品のビジネスのルールの表現にもなっています。

```ts
constructor(readonly value: z.infer<typeof zLanguage> = "ja") {}
```

この箇所ではZodを用いてバリデーションを行っています。
HTTPリクエストやデータベース、新しいデータの作成など様々な箇所でバリデーションが発生しますが、それの処理をクラスに集約させることができます。

```ts
zLanguage.parse(value)
```

このようなコードは型によるエラーが発生し、コードの書き間違えを防ぐことができます。。

```ts
if (language.value === "jp") {}
```

このようなメソッドを定義すると可読性が上がり、コードの補完も利用しやすくなります。

```ts
export class Language {
  get isJa() {
    return this.value === "ja"
  }
}
```

少しだけ読みやすくなります。

```ts
if (language.isJa) {
  // ...
}
```

# Factory

このようにメソッドを定義しておくとString型をインスタンスに変換できます。
例えば、データベースから取得した値や、フォームから取得した値はString型になっていることがあると思います。

```ts
import { z } from "zod"

export const zLanguage = z.union([
  z.literal("ja"),
  z.literal("vi"),
  z.literal("en"),
  z.literal("zh_cn"),
  z.literal("zh_tw"),
])

export class Language {
  readonly _key = "Language"

  constructor(readonly value: z.infer<typeof zLanguage> = "ja") {
    zLanguage.parse(value)
    Object.freeze(this)
  }

  static fromText(text?: string | null) {
    if (text === "ja") {
      return new Language("ja")
    }

    if (text === "en") {
      return new Language("en")
    }

    if (text === "zh_cn") {
      return new Language("zh_cn")
    }

    if (text === "zh_tw") {
      return new Language("zh_tw")
    }

    return new Language("ja")
  }
}
```

しかしこれは値オブジェクトの責務ではないので、複雑になると思う場合は別のクラスにする方が良いです。

```ts
export class LanguageFactory {
  static fromText(text?: string | null) {
    if (text === "ja") {
      new Language("ja")
    }

    return new Language("ja")
  }
}
```

このように使用できます。

```ts
const text = "ja"

const language = LanguageFactory.fromText(text)
```

また、このようにメソッドを定義しておくと書き間違えが減って便利です。

```ts
export class LanguageFactory {
  static get ja() {
    return new Language("ja")
  }
}
```

例えば、ユーザを初期化する際にこのように書けます。

```ts
const user = new User({
  language: LanguageFactory.ja,
})
```

## テスト

メソッドはテストを書いておくと安心です。

```ts
import { Language } from "../language"


test("ja", async () => {
  const language = LanguageFactory.ja

  expect(language.isJa).toBeTruthy()
})
```

# エンティティ

値オブジェクトを組み合わせてエンティティを定義できます。

```ts
const zProps = z.object({
  id: z.string(),
  language: z.instanceof(Language),
})

type Props = z.infer<typeof zProps>

/**
 * ユーザー
 */
export class UserEntity implements Props {
  readonly id!: Props["id"]

  readonly language!: Props["createdAt"]

  constructor(private props: Props) {
    Object.assign(this, zProps.parse(props))
    Object.freeze(this)
  }
}
```

## イミュータブル

このようにプロパティを上書きすることが出来ないようになっています。

```ts
const user = new UserEntity()

user.language = new Language("ja")
```

クラスにはこのようなインスタンスを返すメソッドを定義しておくと、プロパティを変更した新しいインスタンスを返却できます。

```ts
updateLanguage(language: Language) {
  return new UserEntity({ ...this.props, language })
}
```

このようにメソッドを呼び出して新しいインスタンスを定義します。

```ts
const user = new UserEntity()

const draftUser = user.updateLanguage("foo")
```

# サービス

# インフラ

