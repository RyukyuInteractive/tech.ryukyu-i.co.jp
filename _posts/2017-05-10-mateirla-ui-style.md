---
layout: post
title:  'Material-UI - Style'
date:   2017-05-11 00:00:00 +0900
comments: false
author: reiwa
typora-root-url: ..
tags:
  - react
---

# [MuiThemeProvider](https://github.com/callemall/material-ui/blob/next/src/styles/MuiThemeProvider.js)

Material-UIには`MuiThemeProvider`という関数が存在しており,
これがReact-ContextとwithStylesを通して全てのComponentのスタイルに影響している.

ここでは,
Material-UIのStyleに関してまとめる.

# [Material-UI](http://www.material-ui.com)

React Components that Implement Google's Material Design.

[http://www.material-ui.com](http://www.material-ui.com)

![2017-05-09 6.04.53.png](/images/2017/05/スクリーンショット 2017-05-09 6.04.53.png)

## Package

- mateiral-ui@1.0.0-alpha.12
- react@15.5.3
- react-dom@15.5.3

## Docs

```bash
$ git clone -b next git@github.com:callemall/material-ui.git
$ cd material-ui
$ yarn
$ cd docs yarn
$ yarn start
```

# [MuiThemeProvider](https://github.com/callemall/material-ui/blob/next/src/styles/MuiThemeProvider.js)

material-uiは`MuiThemeProvider`関数を用いて,
全てのComponentのスタイルを管理する.

具体的には,
`theme`と`styleManager`をpropsとした`MuiThemeProvider`関数を上層で使用する.

```js
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'

function App () {
  return (
    <MuiThemeProvider theme={theme} styleManager={styleManager}>
      <Layout/>
    </MuiThemeProvider>
  )
}

render(<App/>, document.querySelector('#app'))
```

`theme`と`styleManager`が存在しない場合はデフォルトのスタイルが適用される.

# context

`MuiThemeProvider`は[React-context](https://facebook.github.io/react/docs/context.html)を用いていて,
componentのスタイルはこのcontextから動的に生成される.

```js
class MuiThemeProvider extends Component {
  static childContextTypes = {
    styleManager: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired,
  }

  getChildContext () {
    const { theme, styleManager } = this
    return {
      theme,
      styleManager
    }
  }
}
```

この2つのコンテキストは必須であり,
propsが存在しない場合はcontextが生成されることになる.

```js
class MuiThemeProvider extends Component {
  static createDefaultContext(props = {}) {
    const theme = props.theme || createMuiTheme();
    const styleManager = props.styleManager || createStyleManager({
      theme,
      jss: create(jssPreset()),
    });

    if (!styleManager.sheetOrder) {
      styleManager.setSheetOrder(MUI_SHEET_ORDER);
    }

    return { theme, styleManager };
  }
}
```

# theme

`theme`は`createMuiTheme`関数を用いて生成される.
この`createMuiTheme`の引数に設定される`{palette}`は`createPalette`関数を用いて生成できる.

```js
import { createMuiTheme } from 'material-ui/styles'
import { blue, pink } from 'material-ui/styles/colors'
import createPalette from 'material-ui/styles/palette'

const dark = true

const palette = createPalette({
  primary: blue,
  accent: pink,
  type: dark ? 'dark' : 'light',
});

const theme = createMuiTheme({ palette })
```

この`blue`などはObjectになっていて,
Material Design Guidelinesの[Color palette](https://material.io/guidelines/style/color.html#color-color-tool)と一致している.

```js
const blue = {
  50: '#e3f2fd',
  100: '#bbdefb',
  200: '#90caf9',
  300: '#64b5f6',
  400: '#42a5f5',
  500: '#2196f3',
  600: '#1e88e5',
  700: '#1976d2',
  800: '#1565c0',
  900: '#0d47a1',
  A100: '#82b1ff',
  A200: '#448aff',
  A400: '#2979ff',
  A700: '#2962ff',
  contrastDefaultColor: 'light'
}
```

material-ui@0.18.0では多くのカラーコードを指定する必要があり微調整が面倒だったけど,
@1.0.0では`type`などの値で動的にカラーコードが設定される.

# createMuiTheme

`createMuiTheme`には`palette`以外に`transitions`などが含まれている.

```js
function createMuiTheme(options = {}) {
  const {
    palette = createPalette(),
    breakpoints = createBreakpoints(),
    mixins = createMixins(breakpoints, spacing),
    typography = createTypography(palette),
    ...more
  } = options

  return {
    direction: 'ltr',
    palette,
    typography,
    shadows,
    transitions,
    mixins,
    spacing,
    breakpoints,
    zIndex,
    ...more
  }
}
```

例えば`transitions`は`theme.transitions.create('transform', {})`などのように,
トランジション前とトランジション後のclassNameを生成してくれる.

トランジションさせたいときは,
これを`this.state`などで切り替えて使用する.

# styleManager

`styleManager`は`theme`の更新ができる.

```js
const themeContext = MuiThemeProvider.createDefaultContext({ theme })
const styleManager = themeContext.styleManager
```

また,
`theme`を動的に修正したい場合は`styleManager.updateTheme`関数を用いる.

```
styleManager.updateTheme(theme)
```

# createStyleSheet

`createStyleSheet`関数はStyleを生成しHtml内に展開してくれる.

変数`styleSheet`には関連付けされたClassNameのオブジェクトが返される.

```js
import { createStyleSheet, withStyles } from 'material-ui/styles'

const styleSheet = createStyleSheet('Example', (theme) => {
  return {
    paper: {
      backgroundColor: theme.palette.background.paper,
      maxWidth: 400
    },
    expand: {
      transform: 'rotate(0deg)',
      transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  }
})

class Example extends Component{
  render () {}
}

export default withStyles(styleSheet)(Example)
```

material-ui@0.18.0ではinline-styleだったので,
Jsxの時点では吐き出されるDOMとstyle属性が把握しづらかった.

![2017-05-09 9.17.00.png](/images/2017/05/スクリーンショット 2017-05-09 9.17.00.png)

@1.0.0からは[jss-theme-reactor](https://github.com/nathanmarks/jss-theme-reactor)を用いて,
classNameを生成してComponentsのスタイルを管理することになったのでとても読みやすい.

また,
一般的な乱数からclassNameを生成するタイプではなく,
`createStyleSheet(Example, theme => {})`のように名前を指定できる.

![2017-05-09 9.16.10.png](/images/2017/05/スクリーンショット 2017-05-09 9.16.10.png)

# withStyles

`withStyles`関数は`createStyleSheet`関数が生成するオブジェクトをReact Componentにpropsとして渡してくれる.

```js
class Example {
  render () {
    return <div className={this.props.classes.expand}></div>
  }
}

export default withStyles(styleSheet)(Example)
```

Css-in-Jsでは名前空間の衝突が無いだけでなくStyleをオブジェクトとして管理できるので,
共有化がとても容易になる.

```js
const cardStyle = {}
const paperStyle = {}
const styleSheet = createStyleSheet('Example', (theme) => ({
  ...cardStyle,
  ...paperStyle,
  expand: {}
}))
```

# classnames

`classNames`を使うと複数classNameの管理が楽になる
material-uiのComponentではこれが使われている.

```
import classNames from 'classnames'
```

変数`theme`からは`createPalette`で生成したオブジェクトが扱える.

例えば,
true/falseでトランジションさせたいとき以下のようにStyleを生成する.

```js
const styleSheet = createStyleSheet('Example', (theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  }
}))
```

この場合は`expand`は常にStyleとして存在し,
trueの時だけ`expandOpen`が付加されトランジションする仕組み.

`classnames`を用いて以下のように表現することができる.

```
class Example extends Component {
  render () {
    return <IconButton
      className={classnames(classes.expand, {
        [classes.expandOpen]: this.state.expanded,
      })}
      onClick={this.handleExpandClick}>
  }
}
```
