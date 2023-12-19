---
layout: post
title: 'VSCodeのよく使う設定'
date: 2023-12-20 00:00:00 +0900
comments: true
author: reiwa
typora-root-url: ..
---

このようにリポジトリに設定ファイルを設置することで、VSCodeの設定を共有できます。

```
.vscode/settings.json
```

この設定の中でよく使用する項目を紹介します。

# 言語ごとに設定を適用する

括弧を用いて言語ごとにcodeActionsOnSaveなどを設定できます。ここではBiomeを設定しています。

```json
{
  "editor.formatOnSave": true,
  "[typescript][typescriptreact]": {
    "editor.defaultFormatter": "biomejs.biome",
    "editor.codeActionsOnSave": {
      "quickfix.biome": "explicit",
      "source.organizeImports.biome": "explicit"
    }
  }
}
```

tsxファイルに設定を適用する場合はtypescriptreactを使用します。

# 不要なファイルを除外する

この設定を追加するとファイルの一覧が表示されているExplorerから表示を除外できます。
ちなみにgitignoreで除外してもディレクトリは灰色になるだけです。

```json
{
  "files.exclude": {
    "**/node_modules": true,
    "*.lock": true,
    "*.log": true,
    "*.tsbuildinfo": true,
    ".firebase": true,
    "package-lock.json": true
  }
}
```

検索から除外するにはこのように設定します。
特に `package-lock.json` の中身が検索されて邪魔なので除外しています。

```json
{
  "search.exclude": {
    "yarn.lock": true
  }
}
```

# autoImportFileExcludePatterns

この設定を追加するとTypeScriptの自動インポートの対象から除外できます。

```json
{
  "typescript.preferences.autoImportFileExcludePatterns": [
    "@chakra-ui/**",
    "@emotion/**",
    "@radix-ui/**",
    "react-day-picker",
    "tailwind-merge"
  ]
}
```

例えば `config` と打つと `tailwind-merge` が出てきますが、これを除外することができます。

![img](/images/2023/c274f998-9879-cbe1-c1e6-c5351139027c.png)

このように選択から外れます。

![img](/images/2023/8921fa1f-d007-745c-3a45-5a51ac905975.png)

# importModuleSpecifier

この設定を追加すると絶対パスでインポートされるようになります。

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
}
```

その場合はtsconfigは例えばこのように設定されていると思います。
ただこの設定だけでは自動インポートが相対パスを出力してしまうので、autoImportFileExcludePatternsも設定しています。

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

これはVSCodeのアップデートで解消されるかもです。

# cSpell

この拡張機能を入れるとスペルチェックができます。

https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

ただ知らない単語があると警告が煩いのでライブラリや製品の固有名詞は除外すると幸せになります。

```json
{
  "cSpell.words": ["clsx"],
  "cSpell.ignorePaths": [".vscode"]
}
```
