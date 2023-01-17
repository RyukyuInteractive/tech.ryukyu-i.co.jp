---
layout: post
title:  'Tech Lunch 2022-12-09'
date:   2023-01-13 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---


## [@taichiyam](https://github.com/taichiyam)

### Next.jsでMSW（Mock Service Worker）を利用してみた

- 発表資料
  - [Next.jsでMSW（Mock Service Worker）を利用してみた.pdf](https://github.com/RyukyuInteractive/tech.ryukyu-i.co.jp/files/10421746/Next.js.MSW.Mock.Service.Worker.pdf)
- [前回](https://tech.ryukyu-i.co.jp/2022/12/09/tech-lunch/)準備したMicroCMSのAPIに対するモックをMSWを使って作成
- MSWとは
  - MSW(Mock Service Worker)
    - モックのAPIサーバを
    - サービスワーカーレベルでリクエストをインターセプトしてリクエストを返却する
    - 参考リンク
      - [なぜMock Service Workerなのか。入門編 - Qiita](https://qiita.com/yoshii0110/items/1ddf5cac185558eb362e)
      - [フロントエンドのテストのモックには msw を使うのが最近の流行りらしい](https://zenn.dev/azukiazusa/articles/using-msw-to-mock-frontend-tests)
- 今回はモックに使ったが、ユニットテストでも試しにつかってみたい



----

## [@atomita](https://github.com/atomita)

### Shifterを利用してみて

- Shifter管理ページからWordPressを起動して、起動後にWordPress管理ページに遷移できる
- ShifterのMedia CDNをONにすると、WordPressのメディアライブラリを専用のCDNに保存/配信してくれる
- Webhooksを設定すると、"デプロイする"を押したときなどに、設定したURLにArtifactの情報が送られてくる
    - tgzのURLが含まれているので、それをdownloadして任意のところにdeployするのが主な使い方
- 現状で残念なところ
    - Ownerでないとdomainの設定ができない & Shifter提供以外のCDNを利用する形での設定はCLIからしかできない
        - Ownerがengineerではない場合、設定してもらうのにかなりの説明を要することがあるかも
        - `npx @shifter/cli domain:attach --no-shifter-cdn --domain={DOMAIN} --site-id={SITE_ID} --username={OWNER_USER_NAME}`
    - ShifterからWordPressに遷移した際、WordPress上のユーザーが管理者権限となっている
        - Shifter側の役割と同等な権限にしておいてもらえると良いなぁ



----

## [@naotty](https://github.com/naotty)

### useMemoを勉強中
useMemoをほぼ使ってこなかったので勉強している。  
[React hooksを基礎から理解する \(useMemo編\) \- Qiita](https://qiita.com/seira/items/42576765aecc9fa6b2f8) のサンプルを動かすもレスポンスの違いがわかりにくかった。  
console.logでログを吐くようにしたらと指摘をもらったのでそれで改めて確認する。  
案件で使えそうなとこに入れていき。  


### Chromeのタブを復元したい
Chromeの「設定 > 起動時 > 前回開いていたページを開く」で復元できる。
ただコレ、最後に開いていたウィンドウにのみ適用されるので、メインのウィンドウより後に作業用の別ウィンドウを閉じるとメインのが綺麗サッパリ消えて悲しいことになる。  
↑のuseMemo時にブラウザが固まったのでChromeごと閉じたら別ウィンドウがあって・・orz だったのでみんなに共有した。  
ただ、Macだと「command + shift + t」で復元できると教えてもらったので、次回からはそれでの復元も試そうと思う。  

[Chrome のキーボード ショートカット \- パソコン \- Google Chrome ヘルプ](https://support.google.com/chrome/answer/157179?hl=ja&co=GENIE.Platform%3DDesktop#zippy=%2C%E3%82%BF%E3%83%96%E3%81%A8%E3%82%A6%E3%82%A3%E3%83%B3%E3%83%89%E3%82%A6%E3%81%AE%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88)


