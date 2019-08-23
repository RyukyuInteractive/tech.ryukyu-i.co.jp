---
layout: post
title:  'Tech Lunch 2019-08-21'
date:   2019-08-21 13:00:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)

### 気になった記事紹介
- [2019年のAmazon Prime Day。AWS上の42万6000台相当のサーバや1900個のデータベースインスタンスなどで乗り切る － Publickey](https://www.publickey1.jp/blog/19/2019amazon_prime_dayaws4260001900.html)
    - 桁が違いすぎるw
    - どうやってデプロイしたのか気になる
- [【イラストで覚える】初心者のためのGitとGitHub用語集 \| ずくろぐ](https://zukulog098r.com/git/)
- [脱PHP初心者！インターフェイスを理解しよう \- Qiita](https://qiita.com/KNJ/items/210b0b119d45927eca1e)
    - イラストがあるとわかりやすい
    - 特にGitの方はゆるい感じがあってとても良い
  
### BelongsToManyでリレーションしている中間テーブルの `created_at` を取得したかった
Laravel 5.8 + Lighthouse 4.1  
いろいろ試して、asメソッドで別名をつけると取得できた。  

```
class Post extends Model
{
  public function tags(): BelongsToMany
  {
    return $this->belongsToMany('App\Tag')
                  ->as('post_tag')
                  ->withTimestamps();
  }
}
```

```
type Post {
  id: ID!
  post_tag: pivotTable
}

type pivotTable {
  created_at
}
```

```
query {
  post {
    id
    created_at
    tags {
      data {
        id
        post_tag {
          created_at
        }  
      }
    }
  }
}
```

ただ、もっとシンプルにhasManyから取得できるようにしたので使わないことになったけど、  
やり方が分かったってことでいいかな(^^;


----

## [@atomita](https://github.com/atomita)

### reactのref

projectで↓のようなcodeを見かけ

```jsx
export const Foo: FunctionComponent<Props> = (props) => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false)

  const ref = createRef<HTMLDivElement>()

  useEffect(() => {
    if (ref.current === null) return
    const observer = new IntersectionObserver((entries) => {
      if (entries.length === 0) return
      const [entry] = entries
      setIsIntersecting(entry.isIntersecting)
    })
    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div>
      <div ref={ref}>
        ...
      </div>
    </div>
  )
}
```

`createRef`の中身を知らなかったので、最初、`createRef`って重くないのかな...
callback refs[^1]を使ったほうが良いんじゃ...
とか思ったんですが、reactのcodeを読んでみたら`{ current: null }`を返すってだけだったので、とりあえず安心しました

[^1]: React – ３つのref | Solutionware開発ブログ https://solutionware.jp/blog/2018/07/25/react-%EF%BC%93%E3%81%A4%E3%81%AEref/

でも、副作用扱うものだからhooksでうまいやり方あるように思ったら、やっぱり[`useRef`](https://ja.reactjs.org/docs/hooks-reference.html#useref)があるー


### `document.createElement('div', { is: '' })`

`document.createElement`に2つ目の引数があるのをreactのcode読んでて知りました(^^;

[Custom Elements](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements)のためのものなんですね


### apollo clientの@defer

[Introducing @defer in Apollo Server - Apollo GraphQL](https://blog.apollographql.com/introducing-defer-in-apollo-server-f6797c4e9d6e)

便利そ～

[Lighthouse-php](https://lighthouse-php.com/)も対応しているようなので、laravelなprojectでも！  
[Deferred Fields | Lighthouse](https://lighthouse-php.com/4.1/performance/deferred.html)


---
