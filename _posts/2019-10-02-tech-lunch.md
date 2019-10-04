---
layout: post
title:  'Tech Lunch 2019-10-02'
date:   2019-09-25 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)

### 気になった記事紹介
- [現在時刻が関わるユニットテストから、テスト容易性設計を学ぶ \- t\-wadaのブログ](https://t-wada.hatenablog.jp/entry/design-for-testability)
    - いろんなアプローチとそれに対してのメリット・デメリットが書いてあって、とても勉強になる記事。
    - `アサーションルーレット` はみんな一度は通る道じゃないかな(^^;;
    - 先月作ったテストを `パラメータ化テスト` で作り直したいorz
- [Firestore だけで Algolia を使わず全文検索 \- Qiita](https://qiita.com/oukayuka/items/d3cee72501a55e8be44a)
    - 要件に合うならだけど、Algolia使わなくてできるのはいいなー
- [「スキル不足で職場に居場所がないおじさん」の救済プロジェクトに関わった時の話 \| Books&Apps](https://blog.tinect.jp/?p=62002)
    - 1つのプロジェクトに〜ってのはほぼ無いけど、ずっと同じことをやってるのは良くないと思っているので、流動性を高めたいと考えている。
    - もちろん、本人が希望するならいいんだけど・・


### CloudFront + WAF + S3 のSPAでIP制限する
S3に置いたSPAなので、403や404などのエラー周りもindex.htmlにリダイレクトさせる必要がある。  
そのためにCFのError Pagesでその設定を入れた。    
   
一方、WAFのIP制限に引っかかると403を返す。
ただCFのError Pagesを上記のようにするとIP制限に引っかかってもindex.htmlが表示される・・
  
[S3 CloudFront Route 53 でReactで作ったSPAを配信する \- Qiita](https://qiita.com/keitakn/items/35ae8cc56f5c0a4766b4) のコメントにある通り、  
CFのError Pageで403はindex.htmlにリダイレクトさせず、  
S3のバケット自体をpublicにすることで、SPAも正常に動作しつつIP制限がかかるようにはなった。  
ただ、S3のオブジェクト URLではアクセスできるのでどうしようかなと・・orz

----

## [@reiwa](https://github.com/reiwa)

### 気になった記事紹介

- [３Dプリンターで家をつくる時代に！ 日本での導入は？](https://www.excite.co.jp/news/article/Suumo_166958/)
- [Detect dark mode using JavaScript](https://stackoverflow.com/questions/56393880/detect-dark-mode-using-javascript)

----

## [@atomita](https://github.com/atomita)

### 気になった記事紹介

- [アマゾンの謎の通信規格｢Sidewalk｣が秘めた新戦略 ── これは｢異例中の異例｣だ | BUSINESS INSIDER JAPAN](https://www.businessinsider.jp/post-199491)
  - これはIoTで多用されていく予感
  - Bluetoothで接続できる鍵とか、もう少し距離おいても操作できると便利だと思います
- [タチの悪い凄腕エンジニア｜フロイド｜note](https://note.mu/floyd0/n/n1db7854ca2e2)
  - あ、俺、アリスだわ
- [1on1.md](https://gist.github.com/noto/26592e3d9f417064bb7b76891fe13f97)
  - 普段から双方が"本音で話せる関係性を作る"って気持ちをもって望むようにしたらもっと良くなるのかなーと思いました

