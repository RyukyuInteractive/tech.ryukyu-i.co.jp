---
layout: post
title:  'Tech Lunch 2019-12-11'
date:   2019-12-11 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)

### GCPと紐付けたFirebaseを削除するとGCP側も消えるのか？
[本番環境でやらかしちゃった人 Advent Calendar 2019 \- Qiita](https://qiita.com/advent-calendar/2019/yarakashi-production) にあった [GCP Projectを消しちゃった話 \- 839の日記](https://839.hateblo.jp/entry/2019/12/07/000000) を読んだ。  
  
で、追記のところの  

> 既存のGCP ProjectにFirebaseを追加し、その際にFirebaseのリージョンをミスったのでFirebase側を消そうとした形です。  

を試しみたくなったのでみんなの前で実験した。  
結果はもちろんGCPのProjectも消えた(^^;  
  
既存のGCP Projectがあって、Firebaseをお試しで〜 & 使わないから削除〜 ってのは普通にありそうなので、実験したことを忘れないようにしたい。  
ま、FirebaseでProject作る時には注意書きをしっかり読むってのを徹底する方がいいかもね(^^;;   

![Screenshot](/images/2019/12/screenshot_2019-12-11_11_56_01.png)

----

## [@TatsuyaUshioda](https://github.com/TatsuyaUshioda)

### 読解力が下がっている話
先週から各所でPISA（国際学習到達度調査）の「読解力」で日本の順位が急落したので「読解力ブーム」みたいにどこもかしこもどうやったら上がるかってやっていた。
RST(リーディングスキルテスト)も話題に上がっている。

[教育のための科学研究所](https://www.s4e.jp/)

「AI vs.教科書が読めない子どもたち」を読んだ中で最終的に「文章が読めるかどうか」に行き着いたのは興味深い。

### OSSで公開した文章要約の話とデモ
[PHPで使える文章要約](https://github.com/TatsuyaUshioda/php-text-summarization)

事前にテキストからモデル生成する必要があるが、長いテキストから重要な文章を計算して要約として出してくれる。

要約対象のテキストと要約割合(パーセント)を入力すると要約結果を返却する。

記事のタイトルを読んでも面白そうな内容が書いてあるかわからない。まずは要約結果を見て面白そうだったら読むということができる。
