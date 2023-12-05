---
layout: post
title:  'Tech Lunch 2023-03-17'
date:   2023-03-17 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---


## [@naotty](https://github.com/naotty)
### LaravelのStaging環境を楽運用 + お安くしたい
Staging環境を作るにあたり、EC2 + RDSだとちょっともったいない、EC2にLaravelとMySQL乗せると構築・運用が大変なので、Lightsail + RDSを使うことにした。
Lightsailは$5のプラン・SSL/TLS 証明書はLet’s Encrypt、デプロイは [30分でできる！CodePipelineを利用してAmazon Lightsailに継続的にデプロイする方法 \- ABIST\_AI](https://blog.abist-ai.com/entry/codepipeline-lightsail) を参考にGitHub連携するようにした。
RDSは [【5分で簡単！】Amazon EventBridge SchedulerでRDSの自動定期停止を実装してみた \| DevelopersIO](https://dev.classmethod.jp/articles/amazon-eventbridge-scheduler-rds-stop/) を参考にスケジュール起動・停止をして必要な分だけ使うようにした。
これで$20/月ぐらい + 楽に運用できるはず(^^


---

## [@MotoiOkuhira](https://github.com/MotoiOkuhira)
__令和４年度沖縄型オープンイノベーション創出促進事業に採択された話.__
- 3月3日に成果報告会を終えたので半年間の事業期間の振り返り.
- 初期のコンセプトとメインターゲットが３人×２回のメンタリングを受けてどう変わったか
- 補助金を使って行なった施策の効果.
- いきなりサービスを作ってはいけない（プロダクトアウト）ターゲットの解像度を高めることの重要性.
- 今年も補助事業やるらしいので興味がある方はぜひ！報告書や領収書、契約書のルールはものすごい細かいですが・・・.
---

## [@taichiyam](https://github.com/taichiyam)
### 社内読書会をやったよという話
有志3人(ディレクター1人/開発者2人)で
『[プロジェクトマネジメントの基本が全部わかる本](https://www.amazon.co.jp/%E3%83%97%E3%83%AD%E3%82%B8%E3%82%A7%E3%82%AF%E3%83%88%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E3%81%AE%E5%9F%BA%E6%9C%AC%E3%81%8C%E5%85%A8%E9%83%A8%E3%82%8F%E3%81%8B%E3%82%8B%E6%9C%AC-%E4%BA%A4%E6%B8%89%E3%83%BB%E3%82%BF%E3%82%B9%E3%82%AF%E3%83%9E%E3%83%8D%E3%82%B8%E3%83%A1%E3%83%B3%E3%83%88%E3%83%BB%E8%A8%88%E7%94%BB%E7%AB%8B%E6%A1%88%E3%81%8B%E3%82%89%E8%A6%8B%E7%A9%8D%E3%82%8A%E3%83%BB%E5%A5%91%E7%B4%84%E3%83%BB%E8%A6%81%E4%BB%B6%E5%AE%9A%E7%BE%A9%E3%83%BB%E8%A8%AD%E8%A8%88%E3%83%BB%E3%83%86%E3%82%B9%E3%83%88%E3%83%BB%E4%BF%9D%E5%AE%88%E6%94%B9%E5%96%84%E3%81%BE%E3%81%A7-%E6%A9%8B%E6%9C%AC-%E5%B0%86%E5%8A%9F/dp/4798177415)』を読み分担して要約し、ディスカッションを行ったという話をしました。


---

## [@ip-san](https://github.com/ip-san)
__カスタマージャーニマップをつくってみた__
- [読んだ書籍](https://www.amazon.co.jp/dp/B07GBWMFMK/)
- カスタマージャーニーマップ（CJM）とは
- ワークショップを行う時のポイント
- 作成したペルソナ
- 作成したカスタマージャーニーマップ
