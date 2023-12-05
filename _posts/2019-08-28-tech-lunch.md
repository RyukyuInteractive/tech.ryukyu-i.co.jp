---
layout: post
title:  'Tech Lunch 2019-08-28'
date:   2019-08-28 13:00:00 +0900
comments: true
author: atomita
typora-root-url: ..
tags:
  - tech-lunch
---

## [@naotty](https://github.com/naotty)

### Lighthouse(GraphQL Server)のテストでエラーになる
テスト内でMutationを2回連続で呼び出そうとしたら、2回目がエラーになった。
エラーはこんな感じ。

```php
Failed asserting that Array &0 (
  'debugMessage' => 'Undefined offset: 2'
  'message' => 'Internal server error'
  'extensions' => Array &1 (
      'category' => 'internal'
  )
```

初回のqueryの値を保持しているのが原因らしいので、 `$this->refreshApplication()` をやろうとするもデータもごっそり消えるので使えず。
あと、 `$this->app->forgetInstance(\Nuwave\Lighthouse\Execution\GraphQLRequest::class);` を試してみても解消せず。

初回のはデータを作りたかっただけなので、model使って作ることで回避した。
渡す値を変えずに複数回呼び出すのであれば、下記のように呼び出すのがいいのかもしれない。
(参照元: https://github.com/nuwave/lighthouse/blob/6eacda84457d9e699f9beb26dff955551660bfad/tests/Integration/Execution/DataLoader/BatchLoaderTest.php#L50)

```php
$this->postGraphQL([
  [
      'query' => $query,
      'variables' => [
          'id' => $users[0]->getKey(),
      ],
  ],
  [
      'query' => $query,
      'variables' => [
          'id' => $users[1]->getKey(),
      ],
  ],
])
```

----

## [@atomita](https://github.com/atomita)

### Emacsのpackages(表示部)

@jhonyspicy がVim(keybind)にチャレンジ中とのことなので、対抗して私が使っているEmacsのpackageの紹介をｗ

![Screenshot](/images/2019/08/Screenshot%20from%202019-08-28%2013-31-05.png)

- doom-themes
  - [Spacemacs](http://spacemacs.org/)で使われているtheme集
  - doom-draculaを使わせてもらってます
- neotree
  - 左にあるfile tree
  - お供にprojectile
- minimap
  - 右のminimap
  - emacsのscrollbarを格好良くする方法が見つからなくて...
- popwin
  - magit-statusなど、たまに見るだけのものを表示するのに使ってます

