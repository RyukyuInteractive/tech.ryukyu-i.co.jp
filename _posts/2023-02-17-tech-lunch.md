---
layout: post
title:  'Tech Lunch 2023-02-17'
date:   2023-02-17 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---


## [@naotty](https://github.com/naotty)
### AWS Amplifyがステキ
[AWS Amplify（アプリケーションの構築とデプロイ）\| AWS](https://aws.amazon.com/jp/amplify/)

Next.jsのデプロイ先としてAWS Amplifyを使おうと考えている。  
実際触ってみて、次のステキポイントを紹介した。  

- GitHub連携したらNext.jsってのを自動で判定してデプロイしてくれる
- Basic認証が付いている
- ブランチ毎でサイトを立ち上げることができる
  - CLIでNext.jsと認識させないといけない点は今後に期待
      - [node\.js \- How to solve AWS Amplify error: CustomerError Framework Web not supported \- Stack Overflow](https://stackoverflow.com/questions/74595024/how-to-solve-aws-amplify-error-customererror-framework-web-not-supported)
- Route53と繋げたら独自ドメインの設定やTLS/SSL証明書の発行がとても簡単
- プレビュー機能を使えばプルリク作った時に確認用のサイトが立ち上がる
- お安い

横展開していきたいお気持ち。


---


## [@taichiyam](https://github.com/taichiyam)

個人メモにObsidianを使い始めた話  
気になった人は触ってみてね

```bash
  brew install --cask obsidian
```

## 参考リンク
- [Obsidian](https://obsidian.md/)
- [Obsidianは最高のマークダウン『メモ』アプリである](https://pouhon.net/obsidian-introduction/5666/)
- [Obsidian がすごくいい](https://zenn.dev/usagizmo/articles/beb73159edbe68)

---

## [@MotoiOkuhira](https://github.com/MotoiOkuhira)
__半年前の自分を殴りたくなった話.__  
- 2022年の6月に個人で立ち上げたWEBサービス開発時の話.  
- チャット機能を実装したが、ChromeとSafariで挙動が違っていてそれをどう解決したかを話したかったが、ソースコードを見ても、Githubのコメントを見ても何にもコメントを残っておらず、「ブラウザの挙動の違いをどうにかして解決したという記憶しか残っていない」.  
- 最大の問題点は自分で書いたはずのコードなのにコメントも残っていないためどういう処理の内容なのか理解ができない点.  
- 個人開発とは言え理解しやすいコードを書く事や価値のあるコメントを残す事、作業内容をメモに残す事が大事.  
- 個人開発でも未来の自分と共同で作業している気持ちで開発を進める.  

---

## [@ip-san](https://github.com/ip-san)
AWSのWAF（WebACL）の基本的な使い方について

マネージドルールについてのハマりポイントは、ルールのタイトルではなく"description"の文字で画面検索しないと、選びたいルールを発見できないこと

---

## [@atomita](https://github.com/atomita)

docker composeでdocker-compose.ymlを複数読み込む方法を紹介しました

laradockを利用する際に、laradockのdocker-compose.ymlに手を入れずに別途読み込むことで、laradockを最新にしたりするのが楽になるのでお勧め！
