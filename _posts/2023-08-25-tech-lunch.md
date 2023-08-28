---
layout: post
title:  'Tech Lunch 2023-08-25'
date:   2023-08-25 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)
### AWSの特定のサービスで作られたSNSは、それ専用じゃない(ことがある)

Amplifyのデプロイ通知をSlackで受けたかったので、Amplify->SNS->Lambdaで構築した。  
Chatbotはうまく連携できなかったので見送り。  

で、Amplifyの通知画面で通知先メアドを追加するとSNSが作られるが、それをLambdaのトリガーにできることを知った。  
そりゃそうよね案件だけど、サービスで作られたSNSはそれからしか呼び出せないと勝手に思い込んでいたのでちょっと感動した(え  
今回はAmplifyが作るSNSのアクセスポリシーがどこからでも呼び出せる設定なのですぐトリガーにできたけど、そうじゃないパターンもあるかもしれないので注意。  


---

## [@MotoiOkuhira](https://github.com/MotoiOkuhira)
### 仮説検証を学ぼう　　〜Startup Weekend 沖縄に向けて〜
・Startup Weekend 沖縄に参加するので、期間中に一番時間を費やすであろう仮説検証について学んでみた
・参考にしたのは東京大学 FoundX ディレクター馬田隆明さんの[仮説思考入門 🗺 スタートアップの仮説思考 (1)](https://review.foundx.jp/entry/hypothesis-slide-1)
・ビジネスにおける仮説の特徴やスタートアップの代表的な仮説、フレームワークなどを学んだ
・[リーンキャンバス](https://www.utokyo-ipc.co.jp/column/lean-canvas/#:~:text=%E3%83%AA%E3%83%BC%E3%83%B3%E3%82%AD%E3%83%A3%E3%83%B3%E3%83%90%E3%82%B9%E3%81%A8%E3%81%AF%E3%80%81%E3%82%B9%E3%82%BF%E3%83%BC%E3%83%88%E3%82%A2%E3%83%83%E3%83%97,%E3%81%AB%E8%A8%AD%E8%A8%88%E3%81%95%E3%82%8C%E3%81%A6%E3%81%84%E3%81%BE%E3%81%99%E3%80%82)
・[バリュープロポジションキャンバス](https://www.profuture.co.jp/mk/column/7431)
・当日はNo Talk, All Actionの精神で頑張ろう！
