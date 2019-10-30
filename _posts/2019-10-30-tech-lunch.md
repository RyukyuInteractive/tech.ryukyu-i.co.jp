---
layout: post
title:  'Tech Lunch 2019-10-30'
date:   2019-10-30 13:30:00 +0900
comments: true
author: atomita
typora-root-url: ..
---

## [@naotty](https://github.com/naotty)

### 

----

## [@atomita](https://github.com/atomita)

### [Okinawa Frontend meetup #5](https://okinawa-frontend.doorkeeper.jp/events/98291)でもくもくしたやつでhandson

先週土曜日にOkinawa Frontend meetup #5に参加して、もくもくreactしてきたので、その成果物(https://github.com/atomita/okinawa-frontend-meetup5)を使ってhandsonしてみました  

step01 branchをcheckoutして、そこからcommitを辿っていく感じで進行

- まずはreactで描画するだけ
  - `git checkout step01; yarn; yarn serve`
- 次に`useState`を使ってみる
[9efb497](https://github.com/atomita/okinawa-frontend-meetup5/commit/9efb497bd185f4b81f84ad7db4c5ca655b9f578a)
  - [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#usestate)
- `useCallback`も使ってみる
[18f289e](https://github.com/atomita/okinawa-frontend-meetup5/commit/18f289e31306bb9a9fc18915bbb5e7d478e2faab)
  - deps引数を指定してないじゃん orz
  - [フック API リファレンス – React](https://ja.reactjs.org/docs/hooks-reference.html#usecallback)
- rxjs-hooks & rxjsで`map`してみる
[8767a50](https://github.com/atomita/okinawa-frontend-meetup5/commit/8767a507468a1d42b7c7fd3446fc509d6f913c05)
  - Okinawa Frontend meetup #5でangularの話しになった影響でrxjs-hooksを試してみたくて
  - [LeetCode-OpenSource/rxjs-hooks: React hooks for RxJS](https://github.com/LeetCode-OpenSource/rxjs-hooks)
  - [RxJS - map](https://rxjs-dev.firebaseapp.com/api/operators/map)
- rxjsの`audit`を使ってみる
[181633d](https://github.com/atomita/okinawa-frontend-meetup5/commit/181633da52d7075bca5dd163365ca7e89e77dfdc#diff-19158d46383cce13d12a722303997200)
  - [RxJS - audit](https://rxjs-dev.firebaseapp.com/api/operators/audit)
