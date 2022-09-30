# kinda脚手架

考虑到前端工作多数情况下重复的概率比较高，为了减少重复配置开发链路，并且归拢技术栈，特地做了这个脚手架，眼见的将来会进行持续的开发和维护，欢迎star。同时如果你有相应的思路的话，可以pull下来进行修改然后提交pr，当然，也可以通过邮件联系我。

**注意，本工具使用的是esm，所以必须保证node版本>18。**

## 规划

- [x] 支持cli创建模版项目
- [x] 支持cli本地开发服务器
- [x] 支持热更新
- [x] 支持cli构建打包
- [ ] 支持kinda.config.js配置文件
- [x] 支持webpack
- [ ] 支持vite
- [ ] 支持组件模版
- [ ] 支持web模版
- [ ] 支持小程序模版（优先级较低，请减少期望）

## 使用

### 下载kinda脚手架

```shell
npm i -g @kinda/cli
```

### 新建项目

```shell
kinda create <app-name> [options]
```

#### options

- `-f`
- `-force`

如果本地已经有同名文件夹了，是否覆盖本地创建。（**此步不可撤销**）

- `-s`
- `-structure`

选择底层框架，暂时只提供`webpack`方式。

### 本地跑项目

```shell
kinda server [options]
```

- `-p`
- `-port`

选择本地服务器端口。

### 打包

```shell
kinda build [options]
```

- `-w`
- `-watch`

是否监听文件变化，开启的话，文件一旦发生变化则重新打包。
**注意，这不是热更新（HMR），是重新打包！**

### 获取帮助

**善用这个命令能够极大的帮助你使用本工具。**

```shell
kinda -h
```

## 开发者

```shell
git clone https://github.com/Alndaly/kinda-cli
cd create-kinda
yarn
```
