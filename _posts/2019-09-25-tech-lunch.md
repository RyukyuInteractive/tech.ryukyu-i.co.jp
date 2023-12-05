---
layout: post
title:  'Tech Lunch 2019-09-25'
date:   2019-09-25 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## [@naotty](https://github.com/naotty)

### 気になった記事紹介
- [GitHub ActionsでPull Requestに自動的にラベルを付与してレビューをしやすくする ｜ DevelopersIO](https://dev.classmethod.jp/tool/github/github-actions-pull-request-labeler/)
    - 今のプロジェクトに入れた。
    - あとは [technote\-space/assign\-author: GitHub Action to assign author to issue or PR](https://github.com/technote-space/assign-author) でPull Requestの作成者をAssigneesにするようにした。
    - とても便利なので、今度はCIをやろうと思う。

### コードレビュー
- if文の条件を複雑にしてたり、よくわかんない関数名つけたりしてるので、改めてコードレビューの輪読会をやらないとと思ってる。
    - 3ヶ月後、読めなくなるよと

----

## [@atomita](https://github.com/atomita)

### 気になった記事紹介

- [デザインシステムを持たない組織のこれまでの取り組みと今後を考える - Speaker Deck](https://speakerdeck.com/featherplain/dezainsisutemuwochi-tanaizu-zhi-falsekoremadefalsequ-rizu-mitojin-hou-wokao-eru?slide=11)
    - "デザインシステム"という言葉をはじめて知りました(^^;
    - "原則"がしっかり共有できていると、プログラマでも意図が読みやすくなり、気持ちよく仕事できそうですね
    - [デザインシステムを正しく理解しよう。作り方・参考事例のまとめ | Web Design Trends](https://webdesign-trends.net/entry/9068)
- [心理的安全性とソフトウェア化する社会/ Psychological Safety and Software-based Society - Speaker Deck](https://speakerdeck.com/hirokidaichi/psychological-safety-and-software-based-society)
    - "エンジニアリング組織論への招待"を読んでいる途中ですが、このスライドだけでもためになることが散りばめられてます
        - エンジニアリング、組織、どちらも不確実性を減らしていくもの
        - 不確実なものへの恐れとその反応のパターン
        - 責任と心理的安全性の4象限
        - 「いきなり将来の話なんかされても困る」
        - などなど
- [「経営目線の理解」がエンジニア人生にもたらすもの　Battle Conference U30 2019 基調講演 Part2 - ログミーTech](https://logmi.jp/tech/articles/321900)
    - > 「自分はプロダクトの方針を決める立場にないから、考えても意味がない」と思ってしまいます
    - これ多いんじゃないかなーと感じてます
    - なので組織として、その状態を改善することを考えていかなきゃなと思いました
- [脆弱な設定のElasticsearchによるエクアドル全国民情報流出の可能性についてまとめてみた - piyolog](https://piyolog.hatenadiary.jp/entry/2019/09/21/063010)
    - 検索エンジンにセンシティブな情報を載せている場合、そのセキュリティもしっかりしないとですね
