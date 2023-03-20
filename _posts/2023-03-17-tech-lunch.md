---
layout: post
title:  'Tech Lunch 2023-03-17'
date:   2023-03-17 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
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

---

## [@ip-san](https://github.com/ip-san)
__カスタマージャーニマップをつくってみた__
- カスタマージャーニーマップ（CJM）とは
- ワークショップを行う時のポイント
- [作成したペルソナ](https://docs.google.com/spreadsheets/d/1VSN1srXJkNxBqEUQ1sdg7IO_I3oT2TdZo8DAxF5uyg4/edit#gid=0)
- [作成したカスタマージャーニーマップ](https://docs.google.com/spreadsheets/d/1VSN1srXJkNxBqEUQ1sdg7IO_I3oT2TdZo8DAxF5uyg4/edit#gid=2025882873)
