---
layout: post
title: 'Errorをthrowせずにreturnするのはどうですか？'
date: 2023-10-27 13:30:00 +0900
comments: true
author: reiwa
typora-root-url: ..
---

プログラミングの世界ではエラーハンドリングは重要な要素です。
ここでは、throwの代わりにreturnを使うことで、この問題を上手に解決する方法を探ってみます。

具体的にはこのような常にErrorまたは値、つまり `T | Error` を返す関数を定義するということです。

```ts
const findUser = (): Error | null => {
  try {
    // Errorがthrowされるかもしれない処理
    const user = await database.users.findUnique()
    return user
  } catch (e) {
    return new Error('何か問題が発生した');
  }
}

const user = findUser();

if (user instanceof Error) {
  // エラーが発生した
}

console.log(user.name)
```

# Try-catchのネストが発生する

このコードではtry-catchの中に複数の危険な処理が発生しています。

決済処理で例外が失敗が発生した時に返金処理を実行したいですが、この場合はcatchの中でそれを判定するのが難しいです。

```ts
try {
  // 決済
  // ポイント付与
  // 通知
} catch (error) {
  // 返金するべき？
}
```

このようにCatchの中で条件分岐することができますが、処理を忘れる危険性があります。

```ts
try {
} catch (error) {
  if (error instanceof PaymentError) {
    // 返金する
  }
  if (error instanceof NotificationError) {
    // 返金する
  }
}
```

そこでtry-catchの処理をネストさせるとこのようになってしまいます。

```ts
let user;
let subscription;
let payment;
let result;

try {
  user = await getUser();
  if (user === null) {
    throw new Error('ユーザーが見つからない');
  }

  try {
    subscription = await getSubscription(user.id);
    if (subscription === null) {
      throw new Error('サブスクリプションが見つからない');
    }

    try {
      payment = await captureSubscription(subscription.id);
    } catch (paymentError) {
      // 支払い情報取得のエラー処理
      try {
        result = await createRefund(payment.id);
        if (result instanceof Error) {
          throw result;
        }
      } catch (refundError) {
        // 返金処理のエラー処理
      }
    }
  } catch (subscriptionError) {
    // サブスクリプション取得のエラー処理
  }
} catch (userError) {
  // ユーザー取得のエラー処理
}
```

ここで関数が例外をthrowせずにErrorをreturnしたとしたらこのように書けます。

```ts
const user = await getUser()

if (user instanceof Error) {
  // エラー処理
}

if (user === null) {
  // エラー処理
}

const subscription = await getSubscription(user.id)

if (user instanceof Error) {
  // エラー処理
}

if (user === null) {
  // エラー処理
}

const payment await captureSubscription(subscription.id)

if (payment instanceof Error) {
  const result = await createRefund(payment.id)
  if (result instanceof Error) {
    // エラー処理
  }
}
```

## 常に T | Error を返す

例えば、リポジトリではこのように常にtry-catchを使用できます。データベースの接続は常に失敗する可能性があります。

あとついでにSentryにエラーを送信しています。

```ts
class UserRepository {
  getUser() {
    try {
      // データベースに接続
    } catch (error) {
      captureException(error) // Sentry
      if (error instanceof Error) {
        return error
      }
      return new Error()
    }
  }
}
```

ここでcatchされたerrorはErrorであるとは限らず型はunknownなので注意です。

```ts
if (error instanceof Error) {
  return error
}
```

TypeScriptでもMaybeのような実装は可能ですがライブラリに依存したり複雑になります。
でも T | Error という型は簡単に定義できます。

# IF文を使う

例えばデータベースからユーザのデータを取得する場合は2つのエラーが考えられます。

- データベースの接続に失敗した
- ユーザが見つからない

そのようなエラーのパターンがコードを見るとすぐにわかるようになります。

```ts
const userEntity = await this.userRepository.findUser(props.userId)

if (userEntity instanceof Error) {
  // データベースの接続でエラーが発生した！
  return
}

if (userEntity === null) {
  // ユーザが見つからない！
  return
}

console.log(userEntity.name) // OK
```

以下のように間違えてIF文を省略することはありません。
この時点ではuserEntityの型は `User | Error | null` なので、プロパティにアクセスすることが出来ずエラーが発生するからです。

```ts
const userEntity = await this.userRepository.findUser(props.userId)

console.log(userEntity.name) // ERROR
```

必ずエラーを処理してreturnして関数を抜けます。

```ts
if (userEntity instanceof Error) {
  return
}
```

# おまけ

ZodではsafeParseを使うとErrorがthrowされるのを防ぐことができます。

ここにコード