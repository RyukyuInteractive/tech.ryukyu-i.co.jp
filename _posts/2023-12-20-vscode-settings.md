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

括弧を用いて言語ごとにcodeActionsOnSaveなどを設定できます。ここではBiomeをTypeScriptのみに設定しています。

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

CSSではPrettierを使用するなど分けることが出来ます。

```
"[css]": {
  "editor.defaultFormatter": "esbenp.prettier-vscode"
},
```

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

# TypeScript

## preferences.autoImportFileExcludePatterns

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

## preferences.importModuleSpecifier

この設定を追加すると絶対パスでインポートされるようになります。

```json
{
  "typescript.preferences.importModuleSpecifier": "non-relative",
}
```

その場合はtsconfigは例えばこのように設定されていると思います。

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

ただこのtsconfigの設定だけでは自動インポートが相対パスを出力してしまうので、autoImportFileExcludePatternsも設定しています。
これはVSCodeのアップデートで解消されるかもです。

## tsdk

このように設定するとVSCodeがローカルのTypeScriptのバージョンを使用するようになります。

```
"typescript.tsdk": "node_modules/typescript/lib",
```

バージョンによって文法が異なるので、古いバージョンを使用している場合はローカルのバージョンを使用する方が安全です。

# cSpell

この拡張機能を入れるとスペルチェックができます。

https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker

ただ知らない単語があると警告が煩いので設定で無視することができます。

```json
{
  "cSpell.words": ["clsx"],
  "cSpell.ignorePaths": [".vscode"]
}
```

あとvscodeの設定などファイルごと無視したい場合は `ignorePaths` を使用します。

# files.associations

この設定を追加するとsvgファイルでもHTMLとして認識されVSCodeのPrettierでフォーマットしたりできます。

```
"files.associations": {
  "*.xml": "html",
  "*.svg": "html",
  "*.css": "tailwindcss"
},
```

## Unknown at rule @tailwindcss

特にNext.jsの `globals.css` などでTailwindCSSが設定されていると以下のようなエラーが発生します。

```
Unknown at rule @tailwindcss(unknownAtRules)
```

このような表示です。

![img](/images/2024/2024-01-11.png)

VSCodeの設定を追加するとエラーが消えます。

```json
{
  "css.validate": false,
  "tailwindCSS.includeLanguages": {
    "plaintext": "html"
  }
}
```

# 最後に

何か設定が増えたら追記しようと思います。
