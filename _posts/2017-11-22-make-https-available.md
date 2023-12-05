---
layout: post
title:  '当ブログの GitHub Pages を CloudFront で HTTPS 化しました'
date:   2017-11-22 16:50:00 +0900
comments: false
author: ameyamashiro
typora-root-url: ..
tags:
  - blog
---

こんにちはこんばんはおはようございます山城です。

今年の 8月頃ですが当ブログを HTTPS 化しました。
当ブログは Github Pages でホスティングしています。Github Pages は独自ドメインを設定できるものの SSL については提供していないのでどうにかして自前で SSL 化する必要があります。
GitHub のサーバー側へ証明書を入れ込むことはできないので Github サーバーまでの経路上で SSL 化をする必要があります。

一般的にその場合は CDN を使うことが多いように思えます。
Cloudflare, Fastly などの選択肢がありましたが、今回は CloudFront を使いました。
理由としては AWS アカウントが既にあって且つネームサーバーの変更が不要という箇所 CloudFront になりました。

<br />

## SSL 化後の構成

はじめに軽く構成についてまとめておきます。
Github Pages でホスティングしていてそれを origin.tech.ryukyu-i.co.jp で公開。origin.tech.ryukyu-i.co.jp を CDN のオリジンとして設定。tech.ryukyu-i.co.jp を CDN で受ける
という構成になりました。

![06DBE641E2ADA9774BB8F384FCC54BC4.png](/images/2017/11/06DBE641E2ADA9774BB8F384FCC54BC4.png)

<br />

## CloudFront Distribution の作成

CloudFront のトップから Create Distribution を選択します。

![2C9BD31FEF0B488A479CFDE2634095CD.png](/images/2017/11/2C9BD31FEF0B488A479CFDE2634095CD.png)

するとコンテンツの配信方法を選択する画面がでてくるので Web の Get Started を選択します。

![56A63B898CB66A998A994C209B2C8027.png](/images/2017/11/56A63B898CB66A998A994C209B2C8027.png)


## Origin Settings

Origin Domain Name に origin.tech.ryukyu-i.co.jp を設定します。

![127AD463D09527A4B2C02FADA2118687.png](/images/2017/11/127AD463D09527A4B2C02FADA2118687.png)

## Default Cache Behavior Settings

添付のように設定します。

![11B2BC2EDA1D30E5069C16BCAD37FBD2.png](/images/2017/11/11B2BC2EDA1D30E5069C16BCAD37FBD2.png)

Viewer Protocol Policy を Redirect HTTP to HTTPS にするとユーザーから HTTP でアクセスされた際に HTTPS へ自動的にリダイレクトされるようになります。
Header の Forward 系は条件によってリダイレクトループを発生させたりしやすいので動的コンテンツを扱う場合は注意して設定しましょう。

## Distribution Settings

Alternate Domain Names へ tech.ryukyu-i.co.jp を指定します。
このアドレス Github のリポジトリ設定、GitHub Pages の画面から確認できます。
SSL 証明書の発行も行います。

![A4DC084885A86D5CF44835109DDD7762.png](/images/2017/11/A4DC084885A86D5CF44835109DDD7762.png)

Request or Import a Certificate with ACM を選択します。
すると別タブで ACM の画面が開くのでドメインを入力して Review and request をします。
注意点ですが、ACM  のgamennha N.Virginia が自動的に選択されています。それを Tokyo にして作成すると CloudFront から見えないので N.Virginia のまま証明書は作成します。

![8F210FB2D4A256F4D08C3A1804E9C863.png](/images/2017/11/8F210FB2D4A256F4D08C3A1804E9C863.png)

この後はリクエストしたドメインの whois にあるメールアドレスや幾つか決まったユーザー名に対してメールが送られます。
メールにある URL をクリックすると認証が完了するので ACM のタブは閉じます。

CloudFront の設定画面へ戻り、リロードボタンを押すと先ほど作成した証明書が選択できるので選択します。

![5CEC627DE58B27FC4A532A5D899A7460.png](/images/2017/11/5CEC627DE58B27FC4A532A5D899A7460.png)

証明書が発行・設定できたので、一番下の Create Distibution ボタンで次に進むと CloudFront の Distribution 一覧へ飛びます。
Status の In Progress が Deployed に変わるまで待ちます。
完了までは結構時間がかかるので気長に待ちます。

![6FA9912AFA12754DB5670E13906EC557.png](/images/2017/11/6FA9912AFA12754DB5670E13906EC557.png)

In Progress が Deployed になれば CDN の設定は完了です。
https でのアクセスが正常に動作するか確認しましょう。

[https://tech.ryukyu-i.co.jp](https://tech.ryukyu-i.co.jp)
