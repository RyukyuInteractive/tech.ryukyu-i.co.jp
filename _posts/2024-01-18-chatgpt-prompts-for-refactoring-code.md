---
layout: post
title: 'ChatGPTとCopilotにコードを書いてもらいたい'
date: 2024-01-18 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
tags:
  - chatgpt
  - typescript
---

Copilotに何を指示すれば良いか分からない時は、思い切って適当に指示してみるのがお勧めです。

例えば、このような指示でもコードを生成してくれます。

```
n個の要素の配列を生成して返す関数を定義して。TypeScript
```

実際にはこのようにコードを生成してくれました。

```ts
function createArray(n: number): number[] {
    return Array.from({ length: n }, (v, k) => k);
}
```

n個の何の要素を生成するかを指定しなかったので0からn-1までの数値を含む配列を返すようにしてくれました。

次に追加の指示をしてみます。

```
二次元配列にして。
```

配列の中に配列を入れることで二次元配列を生成するようにしてくれました。

```ts
function create2DArray(n: number): number[][] {
  return Array.from({ length: n }, (_, i) =>
    Array.from({ length: n }, (_, j) => i + j)
  );
}
```

このような指示を繰り返すことで関数やクラスを定義していくことが出来ます。

# リファクタリング

Copilotにどのように指示すれば分からない場合は分けて指示すると良いです。

書きかけのコードの可読性を上げたい場合に以下のような指示が使いやすくてお勧めです。

- letの代わりにconstを使用して
- ガード節を使用して
- 変数を定義して可読性を上げて。分割代入は使用しないで。
- 関数と引数にDocコメントを追加して。
- コメントを追加して。

例えば、このようなコードの可読性を上げたいとします。

```ts
export function getImagePosition(position, width, height) {
  let result = "";
  if (width < height) {
    result = "translateY(";
  } else {
    result = "translateX(";
  }

  if (position !== "") {
    result += position + "%";
  } else {
    if (width === height) {
      result += "0%";
    } else {
      result += "-5%";
    }
  }

  result += ")";

  return result;
}
```

# 指示する

letやvarなどの再代入が使用されている場合はこのように指示できます。

```
letを避けてconstを使用して。
```

このようなコードが返ってきます。

```ts
function getImagePosition(position, width, height) {
  const isWidthLessThanHeight = width < height;
  let result = isWidthLessThanHeight ? "translateY(" : "translateX(";

  if (position !== "") {
    result += position + "%";
  } else {
    result += (width === height) ? "0%" : "-5%";
  }

  result += ")";

  return result;
}
```

## ガード節

if文のネストが深い場合はガード節を使用して可読性を上げることができます。

```
ガード節を使用して。
```

値を返すことで、if文のネストを減らすことができました。

```ts
function getImagePosition(position, width, height) {
  if (position !== "") {
    return `translate${width < height ? 'Y' : 'X'}(${position}%)`;
  }

  if (width === height) {
    return "translateX(0%)";
  }

  return `translate${width < height ? 'Y' : 'X'}(-5%)`;
}
```

## 引数を変更する

引数が多い場合はオブジェクトにします。VSCodeのF2で後から変数名を変更しやすいように分割代入を使用しないように指示しています。

```
引数をpropsにして型Propsを定義して。あと分割代入は使わないで。
```

型も定義してくれます。

```ts
type Props = {
  position: string;
  width: number;
  height: number;
};

function getImagePosition(props: Props) {
  if (props.position !== "") {
    return `translate${props.width < props.height ? 'Y' : 'X'}(${props.position}%)`;
  }

  if (props.width === props.height) {
    return "translateX(0%)";
  }

  return `translate${props.width < props.height ? 'Y' : 'X'}(-5%)`;
}
```

## 変数を定義する

変数を定義することで変数名からコードの意味を推測しやすくなります。

```
変数を定義して可読性を上げて。分割代入は使用しないで。
```

いい感じの変数名を考えてくれます。

```ts
type Props = {
  position: string;
  width: number;
  height: number;
};

function getImagePosition(props: Props) {
  const isWidthLessThanHeight = props.width < props.height;
  const axis = isWidthLessThanHeight ? 'Y' : 'X';

  if (props.position !== "") {
    return `translate${axis}(${props.position}%)`;
  }

  const defaultPosition = props.width === props.height ? "0%" : "-5%";
  return `translate${axis}(${defaultPosition})`;
}
```

## コメント

必要に応じてコメントを追加することでコードの意味を更に推測しやすくなります。

```
コメントを追加して。
```

このように日本語のコメントを追加してくれます。

```ts
type Props = {
  position: string;
  width: number;
  height: number;
};

function getImagePosition(props: Props) {
  // 幅が高さより小さいかどうかを判断する
  const isWidthLessThanHeight = props.width < props.height;
  // 軸を決定する（Y軸かX軸か）
  const axis = isWidthLessThanHeight ? 'Y' : 'X';

  // positionが指定されている場合は、その値を使用する
  if (props.position !== "") {
    return `translate${axis}(${props.position}%)`;
  }

  // positionが指定されていない場合、デフォルト位置を決定する
  const defaultPosition = props.width === props.height ? "0%" : "-5%";
  return `translate${axis}(${defaultPosition})`;
}
```

関数と引数には「Docコメント」と指示することでコメントを追加してくれます。

```
関数と引数にDocコメントを追加して。
```

このようにDocコメントを追加してくれます。

```ts
type Props = {
  /** 位置（パーセンテージ）。指定されていない場合は空文字列 */
  position: string;
  /** 画像の幅 */
  width: number;
  /** 画像の高さ */
  height: number;
};

/**
 * 画像の位置を計算する関数
 * @return
 */
function getImagePosition(props: Props) {
  // 幅が高さより小さいかどうかを判断する
  const isWidthLessThanHeight = props.width < props.height;

  // 軸を決定する（Y軸かX軸か）
  const axis = isWidthLessThanHeight ? 'Y' : 'X';

  // positionが指定されている場合は、その値を使用する
  if (props.position !== "") {
    return `translate${axis}(${props.position}%)`;
  }

  // positionが指定されていない場合、デフォルト位置を決定する
  const defaultPosition = props.width === props.height ? "0%" : "-5%";

  return `translate${axis}(${defaultPosition})`;
}
```

## 単体テスト

単体テストを書いておくことで関数の使い方の参考になります。

```
Vitestで日本語のタイトルの単体テストを書いて。describeは不要。
```

このような単体テストを書いてくれます。vitestのimportを無くしたい場合はそのように指示する必要があります。

```ts
import { it, expect } from 'vitest';
import { getImagePosition } from './path-to-your-function';

it('高さが幅より大きい場合、translateYを返す', () => {
  const result = getImagePosition({ position: '10', width: 100, height: 200 });
  expect(result).toBe('translateY(10%)');
});

it('幅が高さより大きい場合、translateXを返す', () => {
  const result = getImagePosition({ position: '20', width: 200, height: 100 });
  expect(result).toBe('translateX(20%)');
});

it('位置が空で幅と高さが同じ場合、デフォルトのtranslateX位置を返す', () => {
  const result = getImagePosition({ position: '', width: 100, height: 100 });
  expect(result).toBe('translateX(0%)');
});

it('位置が空で高さが幅より大きい場合、デフォルトのtranslateY位置を返す', () => {
  const result = getImagePosition({ position: '', width: 100, height: 200 });
  expect(result).toBe('translateY(-5%)');
});
```

# まとめ

Copilotにコードを生成したり修正してもらうことで、新しい気付きが得られたりするのでお勧めです。
