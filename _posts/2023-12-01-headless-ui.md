---
layout: post
title: 'ArkUIやRadixUIのようなHeadlessUIについて'
date: 2023-12-01 12:00:00 +0900
comments: false
author: reiwa
typora-root-url: ..
---

Reactには色々なUIライブラリがありますが、TailwindCSSを使用できるHeadlessUIなライブラリが使いやすいと感じています。
コンポーネントのスタイルを調整しやすく、ライブラリの依存が減り変更も容易になります。

その中でも以下の2つは良い気がします。

- Ark UI - [https://ark-ui.com/](https://ark-ui.com/)
- Radix UI Themes - [https://www.radix-ui.com/](https://www.radix-ui.com/)

更にそれらを用いたこれらのライブラリが良いと感じました。

- Park UI - [https://park-ui.com/](https://park-ui.com/)
- shadcn/ui - [https://ui.shadcn.com/](https://ui.shadcn.com/)

## HeadlessUIとは

HeadlessUIとは、スタイルを提供しないコンポーネントのことです。RadixUIなどがあります。

https://www.radix-ui.com/primitives/docs/overview/introduction

このようにスタイルはTailwindCSSやCSS Modulesなどで自分で提供する必要があります。

```tsx
return (
  <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
    <Checkbox.Indicator className="CheckboxIndicator">
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Root>
)
```

スタイルが提供できれば良いのでTailwindCSSでもCSS-in-JSでもCSSモジュールでも良いです。
TailwindCSSのみを使用していてCSS-in-JSは馴染みが無い場合はこちらの記事が参考になります。

[https://zenn.dev/takuyakikuchi/articles/b1b20f65d4f9cf](https://zenn.dev/takuyakikuchi/articles/b1b20f65d4f9cf)

## TailwindCSSだけではダメか

TailwindCSSだけでUIライブラリを自作するのは、Stateやデザイントークンを自作することになりとても大変です。
少なくともDialogなら表示するかどうかなどStateが必要になってきます。

スタイルだけだとしてもButtonなどの開発は大変です。PrimaryやSecondaryなどのデザインの仕様も考える必要があります。

ちなみにTailwindCSSもHeadless UIのライブラリを提供してますが数が少ないです。

[https://headlessui.com/](https://headlessui.com/)

TailwindCSSを使用してコンポーネントを開発するなら、何かしらのHeadlessUIを使用するのが良いと思います。

## shadcn/ui

shadcn/uiはTailwindCSSとRadixUIを用いてコンポーネントを作っています。

[https://ui.shadcn.com](https://ui.shadcn.com)

ライブラリはそれぞれ以下のような関係になっています。

- スタイル - TailwindCSS
- コンポーネント - RadixUI
- テーマ - shadcn/ui

コンポーネントをローカルのファイルに生成して使用するという方法がとても良いと感じました。

[https://ui.shadcn.com/docs/installation/next](https://ui.shadcn.com/docs/installation/next)

このようにローカルにファイルを作作られます。

```
/components/ui/button.tsx
/components/ui/card.tsx
```

このように使用できます。

```tsx
import { Button } from "@/components/ui/button"
```

この方法ならshadcn/uiを自分たちで拡張することも容易ですし、同じような方法でコンポーネントを配布しているライブラリがあれば移行するのも簡単です。

## 理想のUIライブラリ

以下のようなUIライブラリが理想だと思いました。

- TailwindCSSを使用している、可能ならCSS-in-JSも選べる
- RadixUIまたはArk-UIのようなHeadlessUIを使用している、可能なら選べる
- shadcn/uiのようにローカルにファイルを生成する、可能ならCLIもある

このような構成であればライブラリの開発が停止しても切り替えることが出来ます。
例えば、RadixUIが機能しなくなった場合にもArk-UIに切り替えてshadcn/uiを使い続けるといったことが出来れば理想です。

実際のところButtonやCardなどの基本的なコンポーネントが同じなので切り替えは可能と思います。

# Ark UI

ArkUIはHeadlessUIのライブラリのひとつです。ChakraUIのチームが開発しています。

また、Zagというライブラリに依存しています。

- State Machine - Zag
- Headless Component - Ark

このページではこのような開発が進んでいる経緯を解説しています。

[https://www.adebayosegun.com/blog/the-future-of-chakra-ui](https://www.adebayosegun.com/blog/the-future-of-chakra-ui)

## Zag

このライブラリは、コンポーネントの為のStateのみを提供しています。
例えば、数字の入力だと最大値や最小値といったStateを定義して管理する必要があると思います。

```tsx
const [state, send] = useMachine(numberInput.machine({ id: '1', max: 50, min: -50 }));

const api = numberInput.connect(state, send, normalizeProps);
```

JSXと組み合わせるとこのように使用できるみたいです。

```tsx
const [state, send] = useMachine(numberInput.machine({ id: '1', max: 50, min: -50 }));

const api = numberInput.connect(state, send, normalizeProps);

return (
  <div {...api.rootProps}>
    <label {...api.labelProps}>Enter number:</label>
    <div>
      <button {...api.decrementButtonProps}>DEC</button>
      <input {...api.inputProps} />
      <button {...api.incrementButtonProps}>INC</button>
    </div>
  </div>
)
```

これをコンポーネント化したものがArkUIです。

```tsx
return (
  <NumberInput min={-50} max={50}>
    <NumberInput.Label>Label</NumberInput.Label>
    <NumberInput.Field />
    <NumberInput.Control>
      <NumberInput.DecrementTrigger>
        <button>-1</button>
      </NumberInput.DecrementTrigger>
      <NumberInput.IncrementTrigger>
        <button>+1</button>
      </NumberInput.IncrementTrigger>
    </NumberInput.Control>
  </NumberInput>
)
```

このコンポーネントにTailwindCSSなどのスタイルを適用するには、どちらの方法を使うこともできます。

```tsx
const api = numberInput.connect(state, send, normalizeProps);
<label className={"font-bold"} {...api.labelProps}>Enter number:</label>
```

Zagを内包したArkUIを使用する場合はこのようになります。
基本的にStateを修正することは殆どないと思うのでこちらを使用するのが良いです。

```tsx
<NumberInput.Label className={"font-bold"}>Label</NumberInput.Label>
```

## ChakraUIではダメか

以下の条件の場合はChakraUIで問題ないと思います。

- ChakraUIのテーマが好み
- ChakraUIのコンポーネントが足りている
- TailwindCSSを使用しない（Css-in-JSを使用する）

ChakraUIの以下のような書き方はclassNameに比べてとても良いですね。

```tsx
<Box p={4} />
```

このライブラリはダークモードなどTailwindCSSのエコシステムと競合してしまいます。

# Park UI

Headless UIにはスタイルが無いので自分でコードを書いて適用する必要があります。
理想はshadcn/uiのようにテーマを提供しているUIライブラリが増えていくことです。

ArkUIはまだ開発中ですが、これをベースに作られたPark UIはというUIライブラリがあります。

[https://park-ui.com/](https://park-ui.com/)

こちらはTailwindCSSとPandaCSSの両方を選ぶことができます。このPandaCSSはChakraUIが開発するゼロランタイムのCss-in-JSライブラリです。

[https://github.com/chakra-ui/panda](https://github.com/chakra-ui/panda)

shadcnのようにコンポーネントがパッケージ化されているわけではなく、ローカルでコンポーネントを展開します。

```tsx
import { ark, type HTMLArkProps } from '@ark-ui/react'
import { type VariantProps } from 'tailwind-variants'
import { styled } from '~/lib/styled'
import { buttonStyles } from './recipe'

type ButtonVariantProps = VariantProps<typeof buttonStyles>
export type ButtonProps = ButtonVariantProps & HTMLArkProps<'button'>

export const Button = styled<ButtonProps>(ark.button, buttonStyles)
```

shadcn/uiのようなCLIは無いのでサイトを見てファイルを作ってコピペする必要があります。
読み込まれているbuttonStylesの中身はこのようになっていて、好きなように変更できます。

```tsx
export const buttonStyles = tv({
  base: 'button',
  defaultVariants: {
    variant: 'solid',
    size: 'md',
  },
  variants: {
    variant: {
      solid: 'button--variant_solid',
    }
  }
})
```

独自のテーマやコンポーネントを作りたい場合は、このライブラリを使ってスタイルを修正するのも良さそうです。
リポジトリはこちらです。

[https://github.com/cschroeter/park-ui](https://github.com/cschroeter/park-ui)

# 最後に

最近はv0というサイトでshadcn/uiとTailwindCSSのコードを日本語で生成できます。

[https://v0.dev/](https://v0.dev/)

また、TailwindCSSは大量にリポジトリがあり学習されているのかChatGPTの生成するコードの質が良くCopilotとの相性も良いです。

これからはLLMとの相性も考えてライブラリを選択したいです。
