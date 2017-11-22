# RyukyuInteractive Tech Blog
[![ri-tech](https://img.shields.io/badge/team-technology-blue.svg?style=flat)](http://tech.ryukyu-i.co.jp)
[![syntax](https://img.shields.io/badge/syntax-enabled-ff69b4.svg?style=flat)](http://rouge.jneen.net/)
[![emoji](https://img.shields.io/badge/emoji-available-brightgreen.svg?style=flat)](http://emoji-cheat-sheet.com/)
[![es6](https://img.shields.io/badge/es6-ready-f5da55.svg?style=flat)](https://babeljs.io/)
[![jekyll](https://img.shields.io/badge/jekyll-3.2.1-red.svg?style=flat)](http://jekyllrb.com/)
[![gh-pages](https://img.shields.io/badge/powered%20by-github%20pages-000000.svg?style=flat)](https://pages.github.com/)

## Requirements
- Ruby (RubyGems)
- Node.js
- [Yarn](https://yarnpkg.com/)

## Install dependencies
1. `$ gem install bundler`
2. `$ bundle install`
3. `$ yarn install`

## Build & Preview
- `$ gulp`

## [npm-scripts](https://docs.npmjs.com/misc/scripts)

For example, if you want to run `ncu -u`, you can run like this.
```
$ npm run -- -u
```

## Notice
- Filename: `_posts/:year/:month/YYYY-MM-DD-TITLE.md`
- Directory structure:

  ```
  _posts
  `-- 2016
      |-- 08
      `-- 09
          |-- 2016-09-11-first-post.md
          `-- 2016-09-12-second-post.md
  ```

- Permalink: `http://tech.ryukyu-i.co.jp/:year/:month/:day/:title/`

## Features
- Emoji is available 😄
  - [Emoji cheat sheet for GitHub, Basecamp and other services](http://www.webpagefx.com/tools/emoji-cheat-sheet/)
- Syntax hilight.
  - [Rouge](http://rouge.jneen.net/)
  - [List of supported languages and lexers · jneen/rouge Wiki](https://github.com/jneen/rouge/wiki/List-of-supported-languages-and-lexers)

## TODO
- [x] avatar
- [x] google analytics
- [x] disqus
- [ ] super cool design
- [ ] tags & categories
- [x] https
