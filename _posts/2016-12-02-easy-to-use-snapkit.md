---
layout: post
title:  "SnapKit を使いこなして楽チン AutoLayout"
date:   2016-12-02 00:00:00 +0900
comments: true
author: tdkn
tags:
  - ios
---

こんにちは。テクノロジーチームの @tdkn (てどこん) です。
最近は iOS アプリの開発を担当させてもらっていて Swift 3 を書きまくる日々を過ごしています。
ネイティブアプリの開発スキルが上昇中。ありがたいことです！

さて、今回は iOS のアプリを開発して行く上で、
「レイアウトもコードベースで書きたい派」のあなたに超絶便利かもしれない
SnapKit の使い方を紹介したいと思います。

[Interface Builder][interface-builder]:question:何それ、美味しいの:question::satisfied:

## SnapKit って何?

皆さんは iOS のユーザーインターフェースをどのように構築していますか?
View の `frame` に対して、寸法や位置を頑張って計算して直接値を設定していますか?

AutoLayout を使えば、View 階層に属する各 View について、
それぞれに課された制約 (Constraint) を満たすよう、寸法や位置を動的に計算します。
これらの寸法や位置の調整などは制約にもとづいてシステムが**自動的に**行います。

> AutoLayout については、Apple の公式日本語ドキュメント「[Auto Layout ガイド][auto-layout]」が詳しいのでぜひそちらをご覧になってみてください。

[SnapKit][snapkit] は AutoLayout の [DSL][dsl] です。
Interface Builder を使わずに AutoLayout をコードで実現しようとすると、
`NSLayoutConstraint` を使う必要があるわけですが、普通に `NSLayoutConstraint` を書こうとすると
引数たっぷりのコンストラクタを使わなければならず、その冗長さが非常につらい...。

> たとえば、縦横中央揃えに `100pt×100pt` のラベルを置きたい場合
> [![screenshot-00][screenshot-00]][screenshot-00]{:.no-border target="_blank"}

| NSLayoutConstraint | SnapKit|
|:------:|:-------------------------------:|
| {% gist 97f11e23dff03586b933c93e4d9b422f %} | {% gist 1276bde3dfa4c1094b52c3ec59a56179 %}  |
{: .gist }

見て下さいこの記述量の差！！
`NSLayoutConstraint` の煩わしさを解決するために、
SnapKit は「シンプルで拡張性のある記法」・「メソッドチェーン」・「補完によるタイプセーフコーディング」をコンセプトに設計されています。
そんなこんなで、使わない手は無いというわけです！

## 使い方

基本を押さえれば、なんてことはないです！

慣れてくると、「こう書けばあんな風に配置されるよな」というのが頭の中でイメージ出来るようになってきます。
習うより慣れろということで、さっそく手を動かしてみましょう！

まずはこのスクリーンショットのような画面を作成してみることにします。

> Sample-01
>
> [![Sample-01][screenshot-01]][screenshot-01]{:.no-border target="_blank"}

なんか `UILabel` がたくさんありますね。どうやって配置しているのか1つずつ見ていきましょう。

1. View を生成する: `let label = UILabel()`
2. 親の View に追加する: `addSubView(label)`
3. 制約を付加する: `label.snp.makeConstraints()`

1 と 2 は iOS 開発をしていくうえで基本中の基本なので説明を省略しますが、
記事の最後の方でサンプルコードへのリンクを掲載していますので見てみて下さい。
今回重要なのは 3 なのでこちらをメインに解説していきます！

### Center

```swift
labelCenter.snp.makeConstraints({ (make) in
    make.width.equalTo(100)
    make.height.equalTo(100)
    make.centerX.equalToSuperview()
    make.centerY.equalToSuperview()
})
```

- 幅 `width` を `100pt` にする
- 高さ `height` を `100pt` にする
- X軸方向の中心位置 `centerX` を `superview` と揃える
- Y軸方向の中心位置 `centerY` を `superview` と揃える

> **ポイント**
>
> - ここで言う `superview` は、`UIViewController` がもともと持っている `view` のことを指しており、
> `UILabel` などは全てそこに `.addSubview()` している状態です

### Top

```swift
labelTop.snp.makeConstraints({ (make) in
    make.width.height.equalTo(100)
    make.bottom.equalTo(labelCenter.snp.top).offset(-10)
    make.centerX.equalToSuperview()
})
```

- 幅と高さ `width.height` を `100pt` にする
- 下端 `bottom` を labelCenter の 上端 `top` と揃えて、`-10pt` ずらす
- X軸方向の中心位置 `centerX` を `superview` と揃える

> **ポイント**
>
> - labelCenter では個別に指定していた `width` と `height` はチェインによりまとめて指定することができる
> - `.equalTo()` メソッドには ViewAttribute を指定することができる (`.snp.top`, `.snp.right`, `.snp.bottom`, `.snp.left` など)

### Right

```swift
labelRight.snp.makeConstraints({ (make) in
    make.size.equalTo(100)
    make.top.equalTo(labelCenter)
    make.left.equalTo(labelCenter.snp.right).offset(10)
})
```

- 大きさ `size` を `100pt` × `100pt` にする
- 上端 `top` を labelCenter と揃える
- 左端 `left` を labelCenter の左端 `right` と揃えて `10pt` ずらす

> **ポイント**
>
> - `width` と `height` は `size` と省略することができる
> - 下の書き方は意味的には同じ
>   - `make.top.equalTo(labelCenter.snp.top)`
>   - `make.top.equalTo(labelCenter)`

### Bottom

```swift
labelBottom.snp.makeConstraints({ (make) in
    make.size.equalTo(labelCenter)
    make.top.equalTo(labelCenter.snp.bottom).offset(10)
    make.centerX.equalToSuperview()
})
```

- 大きさ `size` を labelCenter と揃える
- 上端 `top` を labelCenter の下端 `bottom` と揃えて `10pt` ずらす
- X軸方向の中心位置 `centerX` を `superview` と揃える

### Left

```swift
labelLeft.snp.makeConstraints({ (make) in
    make.size.equalTo(labelCenter)
    make.top.equalTo(labelCenter)
    make.right.equalTo(labelCenter.snp.left).offset(-10)
})
```

- 大きさ `size` を labelCenter と揃える
- 上端 `top` を labelCenter と揃える
- 右端 `right` を labelCenter の左端 `left` と揃えて `-10pt` ずらす

### ふぅ...

コードを見てなんとなくコツが分かってきたのではないでしょうか?
基本的には 「A と B の幅を同じにする」とか「C の左端と D の右端をくっ付ける」などのように、
View 同士の関係性を記述していくような使い方をします。

## SnapKit の便利なメソッド
では、ここらで SnapKit に用意されている便利なメソッドを紹介していこうかと思います :relaxed:

```swift
public func multipliedBy(_ amount: ConstraintMultiplierTarget) -> SnapKit.ConstraintMakerEditable
public func dividedBy(_ amount: ConstraintMultiplierTarget) -> SnapKit.ConstraintMakerEditable
public func offset(_ amount: ConstraintOffsetTarget) -> SnapKit.ConstraintMakerEditable
public func inset(_ amount: ConstraintInsetTarget) -> SnapKit.ConstraintMakerEditable
```

- `multipliedBy`
  - 倍数を指定して掛け合わせます。半分なら `multipliedBy(0.5)`、倍なら `multipliedBy(2.0)` など。
- `dividedBy`
  - 指定した数値で割ります。半分なら `dividedBy(2)` など。
- `offset`
  - 最初のサンプルで出てきたのでお分かりかと思いますが、位置をずらすことができます。
- `inset`
  - 内側の余白を開けることができます。CSS で例えると `padding` のような感覚でしょうか。

Constraints は内部で連立一次方程式として扱われていることを知っておくとさらに理解が深まると思います。

> View Formula
>
> [![view-formula][view-formula]][view-formula]{:.no-border target="_blank"}

そして、これらの便利メソッドを駆使して作った画面がこちら！

> Sample-02
>
> [![Sample-02][screenshot-02]][screenshot-02]{:.no-border target="_blank"}
>
> 謎にハイカラだけど気にしなくておk。

白い部分は `inset` を使って各辺に `30pt` の余白を作りました。
その他の色付きの部分は `multipliedBy` や `dividedBy` で比率を指定して配置しています。
本記事の最後にサンプルコード用の GitHub Repository を掲載していますので、Clone してぜひ配置方法を読み解いてみてください！

## レイアウトのデバッグ方法

Xcode には **`View UI Hierarchy`** という機能があります。
これを使うと、View に対してどのような Constraints が適用されているかを見ることができたり（左ペイン）、
実際に描画されているサイズや、使用されているフォントを調べることができたりします（右ペイン）。

> View UI Hierarchy
>
> [![View UI Hierarchy][screenshot-03]][screenshot-03]{:.no-border target="_blank"}

AutoLayout を使ってコードでレイアウトをして行く中で、
シミュレーターや実機でうまく配置ができずに行き詰まった場合は、
まずこの `View UI Hierarchy` を使って原因を探りましょう。

> Layout Issues
>
> [![Layout Issues][screenshot-04]][screenshot-04]{:.no-border target="_blank"}

上のスクリーンショットは
`Holizontal position is ambiguous for UILabel` (ラベルの水平位置が曖昧です) と怒られている例です。
`50%` のラベルが枠外にはみ出ていたり、なんだかサイズも色々おかしいですね。
このように、AutoLayout の制約に問題があってうまく配置できない場合は `Layout Issues` として警告を出してくれるのです。

## サンプルコード

- 記事中で使用したサンプルのソースコードはこちら

> - [tdkn/EasyToUseSnapKit - GitHub][easy-to-use-snapkit]{:.no-border target="_blank"}
>
> `$ git clone git@github.com:tdkn/EasyToUseSnapKit.git`

## 〆

今回は、コーディングでレイアウトをするときに便利な SnapKit の使い方と、ちょっとしたデバッグの Tips をまとめました。
慣れるとスラスラ書けるようになるのでぜひマスターして爆速コーディングできるようになってみてはいかがでしょうか。

最後まで読んでいただきありがとうございました！

[interface-builder]: https://developer.apple.com/xcode/interface-builder/
[snapkit]: https://github.com/SnapKit/SnapKit
[auto-layout]: https://developer.apple.com/jp/documentation/UserExperience/Conceptual/AutolayoutPG/
[dsl]: https://ja.wikipedia.org/wiki/ドメイン固有言語
[easy-to-use-snapkit]: https://github.com/tdkn/EasyToUseSnapKit

[screenshot-00]: /images/2016/12/Screen Shot 2016-11-20 at 22.33.39.png
[screenshot-01]: /images/2016/12/Screen Shot 2016-11-14 at 00.13.48.png
[screenshot-02]: /images/2016/12/Screen Shot 2016-11-18 at 01.35.33.png
[screenshot-03]: /images/2016/12/Screen Shot 2016-11-18 at 01.47.13.png
[screenshot-04]: /images/2016/12/Screen Shot 2016-11-18 at 01.59.34.png
[view-formula]: /images/2016/12/Screen Shot 2016-11-21 at 00.07.11.png
