# Taro_MiniPrograms_TS

基于`Taro`和`TypeScript`的小程序多端编译框架,自我学习

官方文档 <https://nervjs.github.io/taro/docs/GETTING-STARTED.html>

## 运行方式

```bash
#安装本地工具
npm install -g @tarojs/cli

#升级本地工具
taro update self

#升级依赖
taro update project

#安装本地包
npm install

#默认配置微信小程序打包编译
npm run start
npm run build

#微信小程序
npm run dev:weapp
npm run build:weapp

#百度小程序
npm run dev:swan
npm run build:swan

#支付宝小程序
npm run dev:alipay
npm run build:alipay

#字节跳动小程序
npm run dev:tt
npm run build:tt

#H5
npm run dev:h5
npm run build:h5

```

### VSCode 插件

- ESlint

美化辅助插件

- Prettier

### settings.json 设置

```json
{
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "eslint.autoFixOnSave": true,
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[scss]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    {
      "language": "typescript",
      "autoFix": true
    },
    {
      "language": "typescriptreact",
      "autoFix": true
    },
    {
      "language": "vue",
      "autoFix": true
    }
  ]
}
```

## 脚手架定制化

- 支持编译 css 以及 scss

## 异步编程

Taro 支持使用 async functions 来让开发者获得不错的异步编程体验，开启 async functions 支持需要安装包 babel-plugin-transform-runtime 和 babel-runtime。

```
$ yarn add babel-plugin-transform-runtime --dev
$ yarn add babel-runtime
```

随后修改项目 babel 配置，增加插件 babel-plugin-transform-runtime。

```
babel: {
  sourceMap: true,
  presets: [
    [
      'env',
      {
        modules: false
      }
    ]
  ],
  plugins: [
    'transform-decorators-legacy',
    'transform-class-properties',
    'transform-object-rest-spread',
    ['transform-runtime', {
      "helpers": false,
      "polyfill": false,
      "regenerator": true,
      "moduleName": 'babel-runtime'
    }]
  ]
}
```

## 状态管理和页面通信

Mobx

文档地址
<https://cn.mobx.js.org/>

## 演示 demo

## 客户端本地存储

## 数据请求方法

## 实用工具库

Lodash

文档地址
<https://www.lodashjs.com/>

引用官方推荐命名

```js
import _ from "lodash";
import _ from "lodash/core";
import fp from "lodash/fp";
import array from "lodash/array";
import object from "lodash/fp/object";
import at from "lodash/at";
import curryN from "lodash/fp/curryN";
```

## 额外注意事项

`不支持在 render 生命周期之外编写 jsx`

`如果代码效果无法出现,请重新执行 npm start`

## 生命周期对应表

| 小程序            |          taro          |
| ----------------- | :--------------------: |
| Page.onLoad       |   componentWillMount   |
| onShow            |    componentDidShow    |
| onHide            |    componentDidHide    |
| onReady           |   componentDidMount    |
| onUnload          |  componentWillUnmount  |
| onError           | componentDidCatchError |
| App.onLaunch      |   componentWillMount   |
| Component.created |   componentWillMount   |
| attached          |   componentDidMount    |
| ready             |   componentDidMount    |
| detached          |  componentWillUnmount  |
| moved             |          保留          |

## js 模块引用的路径别名配置 `Webpack alias`

建议别名使用 @/ 开头而非仅用 @ 开头，因为有小概率会与某些 scoped 形式的 npm 包（如：@babel/core）产生命名冲突。

```js

  '@': path.resolve(__dirname, '..', 'src'),

```

> css 暂不支持`alias` , 在 app.js 中使用的样式会自动生效于全局(函数无法全局生效)

## 注意事项

mobx 切勿升级
