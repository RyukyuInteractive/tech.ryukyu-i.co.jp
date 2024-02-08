---
layout: post
title:  'Tech Lunch 2024-01-26'
date:   2024-01-26 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## 小ネタ[@MotoiOkuhira](https://github.com/MotoiOkuhira)
Studioに埋め込んだTableauのフィルターをStudioに設置したチェックボックスやラジオボタンで操作する
Tableauのデータを操作するにはフィルターで絞り込む方法とパラメータを変更する方法がある
フィルターで絞り込む場合・・・applyFilterAsyncを使用
パラメータを変更する場合・・・changeParameterValueAsyncを使用
最初データを操作する方法が2種類あることを知らず実装に時間がかかってしまったので
埋め込んだTableauのダッシュボードをサイト側から操作する機会があった時はぜひ参考にしてください
---

## 小ネタ[@naotty](https://github.com/naotty)
新年一発目なのに何も準備できずorz  
今さらながら、iPhone+SafariのURL入力にテキスト認識を使用した。    
[iPhoneのカメラでテキスト認識表示を使用する \- Apple サポート \(日本\)](https://support.apple.com/ja-jp/guide/iphone/iphcf0b71b0e/ios)  
検証環境のURLやID/パスワードの入力が手間だったけどこれで楽に。  
1点、手ブレで読み取りがうまくいかなかったりするのがツラい(^^;  
普段はPC側のBluetoothをoffってるからユニバーサルクリップボード使えなかったのか・・(後で知った  

---

## スマホからSlackに写真アップすると、PC側で一緒に文章編集して投稿できるよって話[@ip-san](https://github.com/ip-san)


---

## 小ネタ[@jhonyspicy](https://github.com/jhonyspicy)
Macのスクリーンショットを撮影した際に画面の隅に表示されるサムネイルから、撮影した画像を編集できます。
線、矢印、四角、テキストなどが簡単に追加できるので便利です。

---


## SKK紹介[@atomita](https://github.com/atomita)

- 海上クレーンメーカーではなく日本語入力のやつです
- [SKK - Wikipedia](https://ja.wikipedia.org/wiki/SKK)
- Emacs向けに作られたものですが、LinuxではOSのImput Methodとしても導入できます
- 以前導入を試みたときは、fcitxを頻繁に再起動しなければならない状態に陥り、導入を断念していました
- 入力は特徴的で、漢字やカタカナの入力の最初をShiftを使って入力始めると変換対象となります
- この文はSKKで書きました
- 慣れれば滑らかに入力できそうな気がします、慣れれば...


## PHP 8.1, 8.2 New Features[@atomita](https://github.com/atomita)


- [PHP: PHP 8.1.0 Release Announcement](https://www.php.net/releases/8.1/ja.php)
    - ENUM型
        - 限定された文字列値のところに使っていくと、IDEの恩恵が高まりそうですね
    - 読み取り専用プロパティ
        - getterを定義しなくてよくなるの助かります
    - 第一級callable
        - 関数やMethodをClosure化するのが簡潔に書けていいです!
    - 引数デフォルト値にNew
        - アトリビュートを多用している場合に便利になりますね
    - 交差型
        - 交差型とUNION型の混在はできないけど、十分便利
    - Never型
        - redirectの場合もneverを返すと定義するんですね
    - Finalクラス定数
        - 上書きできないクラス定数、待ってました！
    - 8進数表記
        - Webではあまり使われなさそう？
    - Fiber
        - WebSocket Frameworkが多様してそうですね
    - 文字列キー配列のアンパック
        - 連想配列もmergeも楽に！
- [PHP: PHP 8.2.0 Release Announcement](https://www.php.net/releases/8.2/ja.php)
    - 読み取り専用クラス
        - DDDの値オブジェクトで活用されますね
    - DNF(Disjunctive Normal Form)型
        - 交差型とUNION型の混在が可能に！
    - null, false, true が、独立した型に
        - trueしか返さない関数とか結構ありますもんね
    - "Random" 拡張モジュール
        - 私が恩恵にあずかることは無いか、も...
    - トレイトで定数
        - Traitで定数定義できないの地味に不便だったんですよねー
    - 動的なプロパティが非推奨に
        - よりbugり難く！
