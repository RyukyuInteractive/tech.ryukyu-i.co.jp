---
layout: post
title:  'Tech Lunch 2019-11-13'
date:   2019-11-13 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)

### 

----

## [@jhonyspicy](https://github.com/jhonyspicy)

### 

----

## [@atomita](https://github.com/atomita)

### ハッカーズチャンプルーアンカンファレンスでhands-onやってきた報告

[使った資料](https://gist.github.com/atomita/76f79bc0106a675e1b570314b1489ed1)を見せつつ、ちょっと動作させてみたり

イベントでは、hands-onなどで、ネットワークに負荷かけそうな(多量のdownloadとか)ことをやる場合は、事前に必要なものをdownloadしておいてもらう案内とかしたほうが良さそうだな、と学びました

### [Svelte](https://svelte.dev/)の紹介

以前、目にしてたけど、また先日も目にしたので、ちょっと紹介しました

cliでcompileしてjsを出力するという、AltJSみたいなframework  
compile前のsource codeはVueによく似た感じですね  
で、compileすると、VirtualDOMを使わずにreactiveに動作するjsが生成されちゃいます

compile後のjsは結構読みやすい感じで、他の重厚なframeworkを使ってて、debugしてたらframeworkの中に入り込んでわけわからん、ってなった経験がある身からすると、使いやすそうに思えます
