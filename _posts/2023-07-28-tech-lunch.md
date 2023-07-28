---
layout: post
title:  'Tech Lunch 2023-07-28'
date:   2023-07-28 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@MotoiOkuhira](https://github.com/MotoiOkuhira)
### 



---

## [@jhonyspicy](https://github.com/jhonyspicy)
### Type Challenge
TypeScriptの「型」をクイズ形式（？）で勉強することができます。
初めは考えてもわからないと思うので、問題を理解したらすぐに答えを見た方がいいと思います。
おそらく、いきなり自力で答えは出せないんじゃないとか。。。

https://github.com/type-challenges/type-challenges/blob/main/README.ja.md



---

## [@atomita](https://github.com/atomita)
### CSSでtypographyなdesign
先日、Web FontとCSSを使って、ノベルティのdesignをしてみたので、それに使ったCSSの紹介をしました

1つ目は[Handjet](https://fonts.google.com/specimen/Handjet)をgradationにしたもの  
backgroundをgradationにし、[background-clip](https://developer.mozilla.org/ja/docs/Web/CSS/background-clip)`:text`でbackgroundを文字に合わせて切り取り、文字色を透過色にする手法  
text-shadowを適用するとtext-shadowの色になってしまうので、縁取りしたかったら[-webkit-text-stroke](https://developer.mozilla.org/ja/docs/Web/CSS/-webkit-text-stroke)を使うしかなさそう

2つ目は[Indie Flower](https://fonts.google.com/specimen/Indie+Flower)をpath上に配置したもの  
[offset-path](https://developer.mozilla.org/ja/docs/Web/CSS/offset-path)と[offset-distance](https://developer.mozilla.org/ja/docs/Web/CSS/offset-distance)を使ってpath上に配置する手法  
(popな感じに仕上がりました)

ついでに[CSS の nth-child と variable で、要素の順番に応じた変化をつける方法 - Qiita](https://qiita.com/ksksoft/items/8a4a9b809dca3d0820b5)も紹介
