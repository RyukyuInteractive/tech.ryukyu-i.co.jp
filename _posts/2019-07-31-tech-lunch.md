---
layout: post
title:  'Tech Lunch 2019-07-31'
date:   2019-07-31 13:00:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## [@naotty](https://github.com/naotty)

### 気になった記事紹介
- [あなたのチームは「関係性の罠」にはまっていませんか？：日本全国に広がっている「関係の質牧場」にご用心！ \| 立教大学 経営学部 中原淳研究室 \- 大人の学びを科学する \| NAKAHARA\-LAB\.net](http://www.nakahara-lab.net/blog/archive/10562)
    - チーム内のコミュニケーションを改善しようと考えた矢先に見た記事
    - 「メンバー間の同調圧力」 には注意しながら進めないといけないなと考えている
- [OKR を支える CFR \- Taka Umada \- Medium](https://medium.com/@tumada/okr-and-cfr-de62e7757ff9)
    - CFRは知らなかったので勉強になった
    - 表になっていてわかりやすいので、別の部署の人達にも見てほしい
- [AWS Chatbot \- Amazon Web Services](https://aws.amazon.com/jp/chatbot/)
    - コレを使って今月でどうにかSlackへの通知をやりたい
    - グラフも出してくれそうなのですごく期待
- [【CV内田真礼】Webセキュリティ入門編1:ウェブサイトの攻撃手法と対策の実践のチャプター一覧 \| プログラミング学習サービス【paizaラーニング】](https://paiza.jp/works/security/primer/beginner-security1)
    - セキュリティって勉強する気が湧かないなーって人はコレ見たらいいんじゃないかな

----

## [@atomita](https://github.com/atomita)

### 気になった記事紹介

- [gitignore に書くべきでないものは gitignore_global へ - Qiita](https://qiita.com/elzup/items/4c92a2abdab56db3fb4e)
  - globalのgitignoreにprojectで必要なものが混入しててcommitできてないってトラブルを同僚がやってたので
  - globalのgitignoreを設定していなくても不自由感じてなかったけど、試しに設定してみた
    - magitを使っているとfileを選んでindexに入れるのが楽なので`.project`とかあってもindexに入れることはないんだよね
- [ngrokよりserveoがすごい。０秒で localhostを固定URLで公開 - Qiita](https://qiita.com/kaba/items/53b297e2bfb5b4f20a48)
  - 私自身はngrokを最後に使ったのがもう何年前だろうって感じだけど、たまにlocalhostのを外部から見たいなんて相談受けるときがあるので、そのときのために覚えておく
- [Kazuho's Weblog: HTTP のプライオリティが大きく変わろうとしている話（その他 IETF 105 雑感）](http://blog.kazuhooku.com/2019/07/http-ietf-105.html)
  - もうHTTP/3の話しっすかー
  - 全く追えていない(^^;
  - > 感想：つかれた。
  - 恩恵を授かってる身として本当に頭が下がりますm(_ _ )m
- [ndenv から nodenv に乗り換える - Qiita](https://qiita.com/yurakawa/items/508df9fdf2ea35661aa5)
  - ndenv、deprecatedになっちゃってたんですね...
  - 早めに乗り換えます
- [@babel/polyfill と core-js](http://var.blog.jp/archives/79457227.html)
  - @babel/polyfillもdeprecatedに
- [エンジニアが知っておきたい色についてのお話 - Qiita](https://qiita.com/megumu-u/items/554f3e9f8950ddddb03a)
  - アクセシビリティのお供にContrast ratio
  - 基準を線で表示してくれるのもわかりやすくて良いです
  - 記事中のlinkの色で見てみたところ、白地に緑はけっこう黒っぽくしないとAAA基準に達さないみたい
- [GoogleChrome/dialog-polyfill: Polyfill for the HTML dialog element](https://github.com/GoogleChrome/dialog-polyfill)
  - dialogタグなんてあったんですね、知らなかった
  - 少し残念なのは、modalでなければopen属性つければ表示してくれるのに、modalはjsで`element.showModal()`しないとなところ
