---
layout: post
title: 'サブコマンドとファイルディスクリプタを活用したテキスト比較'
date: 2024-02-08 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
tags:
  - chatgpt
  - linux
---

:::message
この記事はChatGPTが社内のSlackのスレッドを要約して生成したものです。
:::

最初に、サブコマンドを利用してヒアドキュメントで与えられたテキストをソートする例を紹介します。

```bash
(
cat <<EOD
c
a
b
EOD
) | sort
```

このパターンは、複数行のテキストを `cat` コマンドで読み込んでからパイプラインを通じて `sort` コマンドに送り、ソートされた結果のテキストを出力するものです。サブコマンド `()` を使用しているため、全体が一つのコマンドとして扱われることで、ソート操作をシームレスに行うことができます。

## サブコマンドを使用しない場合

一方で、サブコマンドを使用しない場合は、以下のように記述します。

```bash
cat <<EOD | sort
c
a
b
EOD
```

これは上記のコマンドと同じように動作しますが、可読性や書きやすさで若干の違いがあります。

## サブコマンドを使用したdiff

さて、具体的に複雑な例として、2つのヒアドキュメントを比較する場合を見てみましょう。以下はサブコマンドと特殊なファイルディスクリプタを使用して `diff` コマンドで2つのテキストの差を見つける方法です。

```bash
(
cat <<EOD
a
b
c
EOD
) | ((
cat <<EOD
a
d
c
EOD
) | diff -u /dev/fd/3 -) 3<&0
```

ここで `diff -u /dev/fd/3 -` は `/dev/fd/3` （ファイルディスクリプタ3）と標準入力（`-`）を比較します。`3<&0` はファイルディスクリプタ3に標準入力を複製しているので、`diff` は最初と2番目のヒアドキュメントの違いを比較できるようになっています。

この技法は特にシェルスクリプトで複数のテキストストリームを様々な方法で比較したい場合に便利です。

## まとめ

サブコマンドとファイルディスクリプタの活用は、シェルスクリプトにおけるテキスト操作の可能性を広げるものです。テキストの比較、ソートなど、一見複雑なタスクも簡潔でパワフルなコマンドラインの魔法でスマートに実行することができます。
