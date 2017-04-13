---
layout: post
title:  "PAC + Docker + Nginx を使って案件別の環境構築を超速で済ませる"
date:   2017-04-14 00:00:00 +0900
comments: true
author: tdkn
typora-root-url: ..
---

## この記事を読むと以下のような効果が得られます

- ホストマシンの `~/www` 配下に案件用ディレクトリ（例えば `/example.com/`）を作ってファイルを置くだけで、[http://example.com.local](http://example.com.local) にアクセスできるようになる。
- Gitリポジトリを `~/www` に clone して、すぐさま開発に取り掛かれる。
- `/etc/hosts` を書き換える手間が省ける。
- ~~モテる~~生産性が上がる。

## たぶん必要な知識

- docker
- docker compose
- nginx

## Proxy auto-config (PAC)の設定

macOS には「自動プロキシ構成」（[通称PAC](https://en.wikipedia.org/wiki/Proxy_auto-config)）という便利な機能があります。（Windows にも同等の機能はあるっぽいです）

システム設定 > ネットワーク > 詳細 > プロキシ から`.pac`ファイルの場所を指定します。僕の場合、`~/.proxy.pac`に置いているので、`file:///Users/tdkn/.proxy.pac`と入力します。

下記は、 `*.local` に来たアクセスを `127.0.0.1` へプロキシする設定例です。設定ファイルは JavaScript のような書き味で記述することができます。

```js
// .proxy.pac

function FindProxyForURL(url, host) {
  if (shExpMatch(host, "*.local")) {
    return "PROXY 127.0.0.1";
  } else {
    return "DIRECT";
  }
}
```

![Screen Shot 2017-04-14 at 0.34.20.png](/images/2017/04/Screen Shot 2017-04-14 at 0.34.20.png)

## Docker

ホストの`80`番ポートを Nginx コンテナの`80`番にバインドします。

下記は、`docker-compose.yml`の設定例です。

```yaml
version: '3'

services:
  proxy:
    container_name: local_proxy
    image: nginx
    env_file: .env
    ports:
      - '80:80'
    volumes:
      - ./images/nginx/conf.d/default.conf:/etc/nginx/conf.d/default.conf
      - ~/sites:/var/www/html
```

## Nginx

Nginx の **Named regular expression** を利用してドメインを変数にキャプチャし、ドキュメントルートを動的にマッピングします。これ、超便利だなと思っています。

```nginx
server {
  server_name ~^(?<domain>.+)\.localhost$;
  root /var/www/html/$domain;
}
```

## Docker Compose

おもむろにターミナルを開いて `docker-compose up` します。

Docker の設定でホストの `~/www` をコンテナにボリュームマウントしているので、下記のようなフォルダを作ってやれば、

```
$ ls -alF ~/www
total 3
drwxr-xr-x    4 tedokon  136  4 11 12:00 foo.com/
drwxr-xr-x    4 tedokon  136  4 11 12:00 bar.com/
drwxr-xr-x   29 tedokon  986  4 13 15:55 baz.com/
```

それぞれ、

> - http://foo.com.local/
> - http://bar.com.local/
> - http://baz.com.local/

でアクセスできるようになります。

## 何が便利なの

- あなたがいままで `/etc/hosts` を都度書き換えてたのであれば、たぶん今日からその作業は不要です。
- リポジトリを git clone してきて、`~/www`に置けば、`http://フォルダ名.local`でブラウザからすぐ見れる状態に。すぐ開発に取り掛かれる。

![](https://media.giphy.com/media/uTuLngvL9p0Xe/giphy.gif)

それでは今日はここまで！:+1:
