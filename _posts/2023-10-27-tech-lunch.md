---
layout: post
title:  'Tech Lunch 2023-10-27'
date:   2023-10-27 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## [@naotty](https://github.com/naotty)
### 社内アプリをhtmxで作り替えたい
ハッカーズチャンプルーで発表されていた [htmx is not a typo \- Speaker Deck](https://speakerdeck.com/kimihito_/htmx-is-not-a-typo) の12ページの図に感銘を受けて、社内アプリをhtmxで作り替えてみようとしている。
公式のドキュメントやexampleが充実しているのと、[</> htmx ~ hx\-indicator Attribute](https://htmx.org/attributes/hx-indicator/) のように実際に使うときに必要なものが準備されているのはとても楽。
で、[</> htmx ~ hx\-push\-url Attribute](https://htmx.org/attributes/hx-push-url/) を使う + Laravelからhtmlを返す際、ルーティングを `routes/api.php` に書くと、リロード時に `api/〜` ってURLになるので、prefixをイジるかhtmxから呼ばれた時のheaderを見てリダイレクトするなどの処理が必要そう。

## Try htmx[@atomita](https://github.com/atomita)

先にhtmxの紹介されてしまったところでしたが、GitHub Pagesでhtmxを試せるものを作成中なので、それを使ってbuttonのデモを少しだけ
[https://atomita.github.io/try-htmx/](https://atomita.github.io/try-htmx/)

## TiDB紹介[@atomita](https://github.com/atomita)

NewSQLと言われるscalabilityの高いDatabeseの1つで、まだ使ってみてはいませんが軽く紹介

- MySQL互換
    - 完全互換ではないそう
    - https://docs.pingcap.com/ja/tidb/stable/mysql-compatibility
- 行指向だけではなく、データウェアハウスのように列指向も組み込まれていてデータ分析もやりやすい
- TiDB Serverlessというサービスもあり、無料枠もあるので始めやすい


## Startup Weekend報告[@MotoiOkuhira](https://github.com/MotoiOkuhira)
- 今回は仮説検証をどう行うかがカギだと思い会場が国際通りが近い立地だということもあり「観光」をテーマに事業を考える
- 初日、2日目の中盤まで在籍していたチームも観光関連だったこともありアンケート収集はスムーズに行うことができた
- 2日目の中盤から新しいチーム、テーマで活動を行うことになったが、会場に「推し活」をしている人が沢山いて、
質の良いインタビューができたことで短時間でも仮説検証を行うことができた。
- そのおかげもあり優勝することができました。
- 実際のビジネスに当て嵌めてもユーザーにアクセスしやすいビジネスであることが早く事業を成長させることが出来るカギなんじゃないかなと思いました。
- 次回機会があればぜひ皆さんにも参加していただきたいと思ったオススメイベントです！

