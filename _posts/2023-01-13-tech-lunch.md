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
