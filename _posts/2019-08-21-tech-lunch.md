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
- 

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

[^1]: [React – ３つのref | Solutionware開発ブログ](https://solutionware.jp/blog/2018/07/25/react-%EF%BC%93%E3%81%A4%E3%81%AEref/)

でも、副作用扱うものだからhooksでうまいやり方あるように思ったら、やっぱり`useRef`[^2]があるー

[^2]: [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#useref)


### `document.createElement('div', { is: '' })`

`document.createElement`に2つ目の引数があるのをreactのcode読んでて知りました(^^;

Custom Elements[^3]のためのものなんですね

[^3]: [Using custom elements - Web Components | MDN](https://developer.mozilla.org/ja/docs/Web/Web_Components/Using_custom_elements)

### apollo clientの@defer

[Introducing @defer in Apollo Server - Apollo GraphQL](https://blog.apollographql.com/introducing-defer-in-apollo-server-f6797c4e9d6e)

便利そ～

[Lighthouse-php](https://lighthouse-php.com/)も対応しているようなので[^4]、laravelなprojectでも！

[^4]: [Deferred Fields | Lighthouse](https://lighthouse-php.com/4.1/performance/deferred.html)


---
