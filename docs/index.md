# create-nice-app

按照预设模板快速创建前端项目，参考 [create-vite-app](https://github.com/vitejs/create-vite-app), 整合 `vue-cli` 可配置对话模式。

## 创建项目

```bash
$ yarn create nice-app my-demo
```

或

```bash
$ npm init create-nice-app my-demo
```

### 命令

```bash
$ yarn create nice-app --help

Usage: index yarn create nice-app <template>

Options:
  -V, --version              output the version number
  -t, --template <template>  选择模板创建
  -l, --list                 显示支持的模板
  -f, --force                强制创建项目
  -h, --help                 display help for command

 yarn create nice-app <template> 
```

### 按模板创建项目

```bash
$ yarn create nice-app -t react
```

### 强制覆盖

:::warning 强制覆盖
使用强制可将已存在的项目目录删除再重新创建项目
:::

```bash
$ yarn create nice-app -f my-demo
```
