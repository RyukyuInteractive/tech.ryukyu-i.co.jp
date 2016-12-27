---
layout: post
title:  "iOSアプリ開発で役に立つ資料まとめ"
date:   2016-12-28 00:00:00 +0900
comments: true
author: tdkn
---

こんにちは。テクノロジーチームの @tdkn (てどこん) です。
今日は、僕が iOS アプリの開発を進める上で役に立ったな〜と思う資料を紹介したいと思います。
なお、メモ書きのような感じなので気が向いたら追記することもあるかも。

## ヒューマン・インタフェースガイドライン

- [iOS Human Interface Guidelines][apple-guildline]
  - 何はともあれ心得るべきヒューマンインタフェースガイドライン。
  リジェクトを食らって泣かないために、実装をするエンジニアだけでなく、
  アプリのUI/UXを設計するデザイナーにも一度は読んで欲しい資料。

## リファレンス

- [日本語ドキュメント - Apple Developer][apple-documents-jp]
  - アップルの公式ドキュメントの日本語版。英語は無理だ―ってひとはこちらを。でも英語版の方が最新だったりするので、僕は英語ドキュメントの方を積極的に読むようにしています。
- [UIKit \| Apple Developer Documentation][apple-uikit]
  - UIKitの各クラスの詳細を知りたいときに。これは、Xcode からも参照出来る情報ではありますが、やっぱり Web から見るほうが何かとラクなので。メソッドやプロパティ、継承元クラスなどが分かるので重宝します。
- [iOSアプリケーション：プログラミングガイド][ios-programing-guide-jp]
  - アプリケーションのライフサイクルのあたりが図解されていて分かりやすいです。

## Repl

- [IBM Swift Sandbox][ibm-swift-sandbox]
  - サクッと Swift を書いて試してみたいときにお世話になってます。Xcode の Playground でも良いですが、Webからサクッと書けるっていうのがやはり良いのです。

## 画像や画面のサイズ

- [The Ultimate Guide To iPhone Resolutions][paintcode-screen-size]
  - 種類豊富で僕らの頭を悩ませる iPhone の各端末のスクリーンサイズを色々知りたいときに。英語ですが、図が分かりやすいので要チェックです。

- [iOSヒューマンインターフェイスガイドライン: アイコンや画像の大きさ][apple-image-size]
  - 各種アイコンや画像の「適正サイズ」を知りたいときに。

## インスピレーション

- [Dribbble][dribbble-tags-ios]
  - デザインのインスピレーションを得たいときに。Dribbble は見ているだけでも楽しいですよね。
  世界でもトップレベルのデザイナーがこぞって作品を投稿したりしているのでウォッチする価値はあるのではないでしょうか。
- [Pttrns][pttrns]
  - 「ログイン画面」や「タイムライン」など、カテゴリ別にUIのパターンを一覧で眺めることができます。「ここはどういうUIにするのがベストなんだろう?」「他のアプリはどう作ってるの?」って思ったときに参考にするのが良いです。

## デザインテンプレート/プロトタイピングツール

プロトタイピング用のテンプレート集。とはいえ、最近は [Adobe XD](http://www.adobe.com/products/experience-design.html) や Facebook 発の [Origami Studio](http://origami.design/) など、プロトタイピング専用ツールも充実してきているのでそちらも要チェック！

- [TETHR – The Most Beautiful iOS Design Kit Ever Made – by InVision](https://www.invisionapp.com/tethr)
- [Oz Pinhas - iOS 10 UI (GUI) kit for Sketch and Photoshop](http://ozzik.co/freebies/ios10kit)
- [iOS 10 GUI (iPhone) — Facebook Design](http://facebook.design/ios10)


## マテリアル

アイコンが必要なときに。僕のイチオシは ionicons です。MIT ライセンスなオープンソース。そしてシンプルでかっこいい。

- [Ionicons: The premium icon font for Ionic Framework](http://ionicons.com/)
- [35,600 Free Icons - The Largest Icon Pack Ever](https://icons8.com/)
- [iconmonstr - Free simple icons for your next project](http://iconmonstr.com/)
- [Free vector icons - SVG, PSD, PNG, EPS & Icon Font - Thousands of free icons](http://www.flaticon.com/)
- [Noun Project - Icons for Everything](https://thenounproject.com/)

## 〆

今回は、iOS アプリ開発をする上で一度は目にしておきたい資料や、素材集などをまとめてみました。
何か1つでも役に立ちそうなものがあったなら幸いです:relaxed:

[apple-documents-jp]: https://developer.apple.com/jp/documentation/
[apple-guildline]: https://developer.apple.com/ios/human-interface-guidelines/
[apple-image-size]: https://developer.apple.com/jp/documentation/UserExperience/Conceptual/MobileHIG/IconMatrix/IconMatrix.html
[apple-uikit]: https://developer.apple.com/reference/uikit/
[paintcode-screen-size]: https://www.paintcodeapp.com/news/ultimate-guide-to-iphone-resolutions
[pttrns]: http://pttrns.com/
[dribbble-tags-ios]: https://dribbble.com/tags/ios
[ios-programing-guide-jp]: https://developer.apple.com/jp/documentation/iPhoneAppProgrammingGuide.pdf
[ibm-swift-sandbox]: https://swiftlang.ng.bluemix.net/#/repl
