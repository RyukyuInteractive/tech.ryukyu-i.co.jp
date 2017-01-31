---
layout: post
title:  "Swiftでクラス名をラクに取得する"
date:   2017-01-31 00:00:00 +0900
comments: true
author: tdkn
typora-root-url: ..
---

## 前提

- Swift 3.0.1

## 書き方

ちなみにですが、わざわざ `extension` で書かなくても、`class` に直接書いても良いです。

```swift
import Foundation

class Hoge {}

extension Hoge {
    class var className: String {
        return "\(self)"
    }

    var className: String {
        return type(of: self).className
    }
}

print(Hoge.className) // -> Hoge

let hoge = Hoge()
print(hoge.className) // -> Hoge
```

## 動作確認

- 上記のコードを [IBM Swift Sandbox][swift-sandbox] にコピペして実行してみると良いです。
    - もしくは、[repl.it][swift-replit] でも良いかなと

## どんな時に使う?

個人的には、

> - `UITableView` のセルの登録時 (`register`)
> - `UITableView` 再利用可能なセルの取り出し時 (`dequeueReusableCell`)

などのメソッドで、引数 `identifer` の文字列として `className` を使うと便利かなと思っています。

> **register(_:forCellReuseIdentifier:)**
>
> ```swift
> func register(_ cellClass: AnyClass?, forCellReuseIdentifier identifier: String)
> ```

> **dequeueReusableCell(withIdentifier:for:)**
>
> ```swift
> func dequeueReusableCell(withIdentifier identifier: String, for indexPath: IndexPath) -> UITableViewCell
> ```

## サンプル

そらで書いたので、実際には動かしていませんがサンプルコードを載せておきます。

```swift
extension UITableViewCell {
    class var className: String {
        return "\(self)"
    }

    var className: String {
        return type(of: self).className
    }
}

class ViewController: UIViewController {
    let tableView: UITableView = {
        var tableView = UITableView()
        tableView.dataSource = self
        tableView.register(UITableViewCell.self, forCellReuseIdentifier: UITableViewCell.className) // <- ここ
        return tableView
    }()

    // ...etc
}

extension ViewController: UITableViewDataSource {
    func tableView(_ tableView: UITableView, cellForRowAt indexPath: IndexPath) -> UITableViewCell {
        guard let cell = tableView.dequeueReusableCell(withIdentifier: UITableViewCell.className, /* <- ここ */ for: indexPath) as? UITableViewCell else {
            return UITableViewCell(style: .default, reuseIdentifier: UITableViewCell.className)
        }

        return cell
    }
}
```

[swift-sandbox]: https://swiftlang.ng.bluemix.net/
[swift-replit]: https://repl.it/languages/swift
