---
layout: post
title: "ArkUIやRadixUIのようなHeadlessUIについて"
date: 2023-12-01 12:00:00 +0900
comments: false
author: reiwa
typora-root-url: ..
tags:
  - react
  - tailwind
---

React には色々な UI ライブラリがありますが、TailwindCSS を使用できる HeadlessUI なライブラリが使いやすいと感じています。
コンポーネントのスタイルを調整しやすく、ライブラリの依存が減り変更も容易になります。

その中でも以下の 2 つは良い気がします。

- Ark UI - [https://ark-ui.com/](https://ark-ui.com/)
- Radix UI Themes - [https://www.radix-ui.com/](https://www.radix-ui.com/)

更にそれらを用いたこれらのライブラリが良いと感じました。

- Park UI (Ark UI) - [https://park-ui.com/](https://park-ui.com/)
- shadcn/ui (Radix UI) - [https://ui.shadcn.com/](https://ui.shadcn.com/)

## HeadlessUI とは

HeadlessUI とは、スタイルを提供しないコンポーネントのことです。RadixUI などがあります。

[https://www.radix-ui.com/primitives/docs/overview/introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)

このようにスタイルは TailwindCSS や CSS Modules などで自分で提供する必要があります。

```tsx
return (
  <Checkbox.Root className="CheckboxRoot" defaultChecked id="c1">
    <Checkbox.Indicator className="CheckboxIndicator">
      <CheckIcon />
    </Checkbox.Indicator>
  </Checkbox.Root>
);
```

スタイルが提供できれば良いので TailwindCSS でも CSS-in-JS でも CSS モジュールでも良いです。
TailwindCSS のみを使用していて CSS-in-JS は馴染みが無い場合はこちらの記事が参考になります。

[https://zenn.dev/takuyakikuchi/articles/b1b20f65d4f9cf](https://zenn.dev/takuyakikuchi/articles/b1b20f65d4f9cf)

## TailwindCSS だけではダメか

TailwindCSS だけで UI ライブラリを自作するのは、State やデザイントークンを自作することになりとても大変です。
少なくとも Dialog なら表示するかどうかなど State が必要になってきます。

スタイルだけだとしても Button などの開発は大変です。Primary や Secondary などのデザインの仕様も考える必要があります。

ちなみに TailwindCSS も Headless UI のライブラリを提供してますが数が少ないです。

[https://headlessui.com/](https://headlessui.com/)

TailwindCSS を使用してコンポーネントを開発するなら、何かしらの HeadlessUI を使用するのが良いと思います。

## shadcn/ui

shadcn/ui は TailwindCSS と RadixUI を用いてコンポーネントを作っています。

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
import { Button } from "@/components/ui/button";
```

この方法なら shadcn/ui を自分たちで拡張することも容易ですし、同じような方法でコンポーネントを配布しているライブラリがあれば移行するのも簡単です。

## 理想の UI ライブラリ

以下のような UI ライブラリが理想だと思いました。

- TailwindCSS を使用している、可能なら CSS-in-JS も選べる
- RadixUI または Ark-UI のような HeadlessUI を使用している、可能なら選べる
- shadcn/ui のようにローカルにファイルを生成する、可能なら CLI もある

このような構成であればライブラリの開発が停止しても切り替えることが出来ます。
例えば、RadixUI が機能しなくなった場合にも Ark-UI に切り替えて shadcn/ui を使い続けるといったことが出来れば理想です。

実際のところ Button や Card などの基本的なコンポーネントが同じなので切り替えは可能と思います。

# Ark UI

ArkUI は HeadlessUI のライブラリのひとつです。ChakraUI のチームが開発しています。

また、Zag というライブラリに依存しています。

- State Machine - Zag
- Headless Component - Ark

このページではこのような開発が進んでいる経緯を解説しています。

[https://www.adebayosegun.com/blog/the-future-of-chakra-ui](https://www.adebayosegun.com/blog/the-future-of-chakra-ui)

## Zag

このライブラリは、コンポーネントの為の State のみを提供しています。
例えば、数字の入力だと最大値や最小値といった State を定義して管理する必要があると思います。

```tsx
const [state, send] = useMachine(
  numberInput.machine({ id: "1", max: 50, min: -50 })
);

const api = numberInput.connect(state, send, normalizeProps);
```

JSX と組み合わせるとこのように使用できるみたいです。

```tsx
const [state, send] = useMachine(
  numberInput.machine({ id: "1", max: 50, min: -50 })
);

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
);
```

これをコンポーネント化したものが ArkUI です。

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
);
```

このコンポーネントに TailwindCSS などのスタイルを適用するには、どちらの方法を使うこともできます。

```tsx
const api = numberInput.connect(state, send, normalizeProps);
<label className={"font-bold"} {...api.labelProps}>
  Enter number:
</label>;
```

Zag を内包した ArkUI を使用する場合はこのようになります。
基本的に State を修正することは殆どないと思うのでこちらを使用するのが良いです。

```tsx
<NumberInput.Label className={"font-bold"}>Label</NumberInput.Label>
```

## ChakraUI ではダメか

以下の条件の場合は ChakraUI で問題ないと思います。

- ChakraUI のテーマが好み
- ChakraUI のコンポーネントが足りている
- TailwindCSS を使用しない（Css-in-JS を使用する）

ChakraUI の以下のような書き方は className に比べてとても良いですね。

```tsx
<Box p={4} />
```

このライブラリはダークモードなど TailwindCSS のエコシステムと競合してしまいます。

# Park UI

Headless UI にはスタイルが無いので自分でコードを書いて適用する必要があります。
理想は shadcn/ui のようにテーマを提供している UI ライブラリが増えていくことです。

ArkUI はまだ開発中ですが、これをベースに作られた Park UI はという UI ライブラリがあります。

[https://park-ui.com/](https://park-ui.com/)

こちらは TailwindCSS と PandaCSS の両方を選ぶことができます。この PandaCSS は ChakraUI が開発するゼロランタイムの Css-in-JS ライブラリです。

[https://github.com/chakra-ui/panda](https://github.com/chakra-ui/panda)

shadcn のようにコンポーネントがパッケージ化されているわけではなく、ローカルでコンポーネントを展開します。

```tsx
import { ark, type HTMLArkProps } from "@ark-ui/react";
import { type VariantProps } from "tailwind-variants";
import { styled } from "~/lib/styled";
import { buttonStyles } from "./recipe";

type ButtonVariantProps = VariantProps<typeof buttonStyles>;
export type ButtonProps = ButtonVariantProps & HTMLArkProps<"button">;

export const Button = styled<ButtonProps>(ark.button, buttonStyles);
```

shadcn/ui のような CLI は無いのでサイトを見てファイルを作ってコピペする必要があります。
読み込まれている buttonStyles の中身はこのようになっていて、好きなように変更できます。

```tsx
export const buttonStyles = tv({
  base: "button",
  defaultVariants: {
    variant: "solid",
    size: "md",
  },
  variants: {
    variant: {
      solid: "button--variant_solid",
    },
  },
});
```

独自のテーマやコンポーネントを作りたい場合は、このライブラリを使ってスタイルを修正するのも良さそうです。
リポジトリはこちらです。

[https://github.com/cschroeter/park-ui](https://github.com/cschroeter/park-ui)

# 最後に

最近は v0 というサイトで shadcn/ui と TailwindCSS のコードを日本語で生成できます。

[https://v0.dev/](https://v0.dev/)

また、TailwindCSS は大量にリポジトリがあり学習されているのか ChatGPT の生成するコードの質が良く Copilot との相性も良いです。

これからは LLM との相性も考えてライブラリを選択したいです。
