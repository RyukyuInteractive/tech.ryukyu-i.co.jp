---
layout: post
title:  'Tech Lunch 2022-12-09'
date:   2023-01-13 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---


## [@taichiyam](https://github.com/taichiyam)


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
