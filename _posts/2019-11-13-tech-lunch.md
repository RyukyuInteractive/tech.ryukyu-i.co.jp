---
layout: post
title:  'Tech Lunch 2019-11-13'
date:   2019-11-13 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## [@naotty](https://github.com/naotty)

### AWS Security Scanner
・・というUAのログが付くようになった。
IPもAWSだから最初はAWSのサービスかなーと思ったけどそんなのは見当たらない。
ググっても明確な情報はなかったので、これで穴が見つかれば突いてくるんだろうなと。
そりゃそうだよなと思った話。


### Laravelでジョブをキューに送る
・・際には、データまで入れてしまわないように注意する。
キューに入ってるものを見ると確認できます。

----

## [@jhonyspicy](https://github.com/jhonyspicy)

### Laravel MeetUp Okinawa 第10回にてLTしてきました。

[作成したスライド](https://speakerdeck.com/jhonyspicy/laravel-xiang-kefalse-package-falsezuo-rifang)はこちら

[サンプルコード](https://github.com/jhonyspicy/laravel-example-package)はこちら

私にとって初めてのTLでして、数日前から緊張していましたがなんとか発表してきました。
発表した内容はLaravel向けのPackageの作り方の簡単な説明になります。

脳内シミュレーションはばっちりだったんですが「あれ言おう、これ言おう」をいくつか言えてなかったのを後から気づいてしまいまして（汗
次回はもっとうまく発表出来るようにします。

しかしとても緊張しましたが、いい経験でした。

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
