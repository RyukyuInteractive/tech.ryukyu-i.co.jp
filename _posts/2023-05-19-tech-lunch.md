---
layout: post
title:  'Tech Lunch 2023-02-17'
date:   2023-05-19 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@MotoiOkuhira](https://github.com/MotoiOkuhira)
### ChatGPTを使ってこんなんやりたいんや！
- 先週のチームMTGでクライアントの課題をより深く知る事を目的としたChatGPTを使ったチャットサービスを作ると提案した。

- しかしテキストのみだった事とあまり内容を固めていなかったのであまり伝わらなかった ﻿

- なので仕様を固める意味も含めスライドを作ってみた

- 内容はChatGPTを使ったチャットサービスをクライアントに提供してクライアントの課題を常に、先に把握することが目的。

- クライアントの課題を把握することで提案の質を高めることができるのでは？

- 使いやすくするためにあらかじめ相談内容の項目があり、フォームに必要内容を入力→バックではあらかじめプロンプトの雛形が入っており、入力したフォームの内容が雛形に入っていくイメージ→質問内容はDBに保存して確認できる様にしたい

- まずは社内ツールとして使えるようにプロトタイプを作りたい
---

## [@taichiyam](https://github.com/taichiyam)
### 

---

## [@atomita](https://github.com/atomita)
### Laravelのテストダブルの使い方とか

> ダブルは代役、影武者を意味する。
> [テストダブル - Wikipedia](https://ja.wikipedia.org/wiki/%E3%83%86%E3%82%B9%E3%83%88%E3%83%80%E3%83%96%E3%83%AB)

- Laravelのdocumentは[モック 9.x Laravel](https://readouble.com/laravel/9.x/ja/mocking.html)や[テストダブル作成:Mockery1.0](https://readouble.com/mockery/1.0/ja/creating_test_doubles.html)
- Laravelがinstance化してくれるもの(DIしているものやFacade、resolve関数使ってinstance化しているものなど)は

    ```php
    $this->instance(
        FooService::class,
        Mockery::mock(FooService::class, function (MockInterface $mock) {
            $mock->shouldReceive('bar')
                 ->once();
        })
    );
    
    // FooService->bar()が1度呼ばれる処理
    ```

    のように書くことでtestできます

- 特定の引数であることもtestするにはwith method、戻り値を指定するにはandReturn methodを利用します

    ```php
    $mock->shouldReceive('bar')
         ->once()
         ->with('baz')
         ->andReturn('barbaz');
    ```

    この例だとbar methodの第1引数に`'bar'`が1度渡されるtestになります  
    その際、bar methodは`'barbaz'`を返します
- 特定の引数がscalarではない場合には、Mockery::on & 無名関数で判定することが可能です

    ```php
    $mock->shouldReceive('bar')
         ->with(Mockery::on(fn ($v) => $v instanceof Model));
    ```

    この例だとbar methodの第1引数に`Model`が渡されるtestになります  

- 引数が複数の場合には、withに複数引数を与えるか、withArgs methodを利用します

    ```php
    $mock->shouldReceive('bar')
         ->with(
             Mockery::on(fn ($arg1) => $arg1 instanceof Model),
             Mockery::on(fn ($arg2) => is_array($arg2)
         );
    ```

    ```php
    $mock->shouldReceive('bar')
         ->withArgs(
             fn ($arg1, $arg2) => $arg1 instanceof Model && is_array($arg2))
         );
    ```

    この例だとbar methodの第1引数に`Model`、第2引数に配列が渡されるtestになります  

- Facadeを利用している場合にはFacade::shouldReceiveなどが実装されているので`$this->instance()`を使わずにtestが記述できます

    ```php
    FooFacade::shouldReceive('bar')->once();
    
    // FooFacade::bar()が1度呼ばれる処理
    ```

- mock以外にもpartialMock、spyが用意されているので、必要に応じて使い分けましょう
    - partialMockは部分的にmockするもの
    - spyはmethod呼び出しを記録しておいてくれる感じのもの

- Myoutdeskllc\LaravelAnalyticsV4\LaravelAnalyticsV4をmock化してAPI呼び出しをしないでtestをしたりなど活用しています！


---

## [@naotty](https://github.com/naotty)
### 

