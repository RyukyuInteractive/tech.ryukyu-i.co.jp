---
layout: post
title:  "Swift に静的解析を導入して奇麗なコードを書きたい"
date:   2017-01-10 00:00:00 +0900
comments: true
author: tdkn
typora-root-url: ..
tags:
  - ios
---

こんにちは〜 @tdkn です！

突然ですが皆さん、iOS なプロジェクトにコーディング規約適用してますか?

チームでアプリ作ってると、人によってコーディングスタイルがバラバラになりがちですね。俺は `self` 省略派だ！とか、波括弧 `{}` は改行してから始める(BSD/オールマンスタイル)とか、インデントが〜とか、いろいろ有りますね。しかし、そんなの自由気ままに書かれたら統一性が皆無で困っちゃいますよね。気分はモヤモヤ、他人の書いたコードもついつい修正したくなっちゃいます、僕みたいなひとは。

プロジェクト初期の段階でコーディングスタイルについてメンバー同士で話し合って決めておき、スタイルの違反をエディタで検知できれば幸せになれそうな気がしますね?ネ?

[SwiftLint][swiftlint] 使いましょう！！！

## インストール方法

Homebrew でインストールできます。

`brew install swiftlint`

僕は Cocoapods が好きじゃないので使いませんが、Cocoapods 経由でも導入は可能とのこと。ここには書かないので Google 先生に聞くと良いでしょうw

## 使い方

ここでおもむろに Run Script を追加します。

```shell
if which swiftlint >/dev/null; then
  swiftlint
else
  echo "warning: SwiftLint not installed, download from https://github.com/realm/SwiftLint"
fi
```

Xcode のプロジェクトファイルで `Build Phases` を開いて、`+` ボタンから `New Run Script Phase` です。Script の名前は `SwiftLint` とかにしておくと良いと思います。

>  ![Screen Shot 2017-01-10 at 6.51.56](/images/2017/01/Screen Shot 2017-01-10 at 6.51.56.png)

`.swiftlint.yml`という名前のファイルをプロジェクトのルートディレクトリに作成することで、設定を行うことができます。ルールの一覧はターミナル上で `swiftlint rules` を実行すると確認することができます。

```yaml
#
# .swiftlint.yml
#
excluded:
  - Carthage
  - Pods
disabled_rules:
  - trailing_whitespace
  - line_length
```

上記の設定ファイルでは、`Carthage` と `Cocoapods` 用のディレクトリを除外しています。ライブラリの Lint までおこなう必要は無いので。あと、Xcodeのコード補完を利用して行く上で邪魔になるので、行末の空白チェックと1行あたりの文字数チェックは行わないようにしています。ここらへんは Lint で検出される Error/Warning の様子を見ながら適宜調整していくと良いと思います。

以上で、`⌘ + B` ビルド時に Lint が走るようになりました！

## オートコレクト機能

SwiftLint には `swiftlint autocorrect` というコマンドが用意されており、検出した違反内容で簡単なものであれば自動で修正してくれます。ただ、実行すると前のデータは失われますのでご利用は計画的に。

## [参考] さまざまなスタイルガイド

- [Swift Programming Language - Apple][swiftlang]
- [Swift Style Guide - GitHub][github-swift-style-guide]
- [Swift Style Guide - Ray Wenderlich][rw-swift-style-guide]
- [Swift Style Guide - Coursera][coursera-swift-style-guide]

## 〆

SwiftLint は [GitHub の Swift Style Guide][github-swift-style-guide] に従った Lint を行うことができ、設定ファイルにより on/off やオプションを指定できるようになっています。また、執筆時点ではまだ Swift 3 には対応していなかったので、見送りましたが、他にも [Tailor][tailor] (歌手のテイラー・スウィフトと掛けていますね)という名前の静的解析ツールがあり、こちらは Java で作られていてクロスプラットフォームで動作するようです。[Tailor][tailor] が Swift 3 にも対応したら、使ってみたいですね！

Happy Coding!! :blush:

[swiftlint]: https://github.com/realm/SwiftLint
[swiftlang]: https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/
[github-swift-style-guide]: https://github.com/github/swift-style-guide
[rw-swift-style-guide]: https://github.com/raywenderlich/swift-style-guide
[coursera-swift-style-guide]: https://github.com/coursera/swift-style-guide
[tailor]: https://tailor.sh/
