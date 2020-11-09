# 模板开发

`create-nice-app` 与 `vue-cli` 中的 `Preset` 相同的对话，我们在模板目录中新建`prompts.js`, 在创建模板时即可调用。对话内部是通过 [inquirer](https://github.com/SBoudrias/Inquirer.js) 实现

例如，直接是问题数组：

```js
// prompts.js

module.exports = [
  {
    type: 'input',
    name: 'locale',
    message: 'The locale of project localization.',
    validate: input => !!input,
    default: 'en'
  }
  // ...
]
```

例如，一个返回问题数组的函数

```js
// prompts.js

// 将 `package.json` 作为参数传入函数
module.exports = pkg => {
  const prompts = [
    {
      type: 'input',
      name: 'locale',
      message: 'The locale of project localization.',
      validate: input => !!input,
      default: 'en'
    }
  ]

  // 添加动态对话
  if ('@vue/cli-plugin-eslint' in (pkg.devDependencies || {})) {
    prompts.push({
      type: 'confirm',
      name: 'useESLintPluginVueI18n',
      message: 'Use ESLint plugin for Vue I18n ?'
    })
  }

  return prompts
}
```

## 动态模板

模板的开发来自于 `ejs` 模块的渲染，通过问题收集的数据对象，动态渲染到项目新文件。

比如 `package.json`：

```js
{
  "name": "<%= projectName %>",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite",
    "build": "typecheck . && vite build"
  },
  "dependencies": {
    "vue": "^3.0.2"
  },
  "devDependencies": {
    "@vue/compiler-sfc": "^3.0.2",
    "@vuedx/typecheck": "^0.2.4-0",
    "@vuedx/typescript-plugin-vue": "^0.2.4-0",
    "typescript": "^4.0.3",
    "vite": "^1.0.0-rc.8"
  }
}
```

### 输出变量

使用 `<%= 变量 %>` 来输出收集的配置，还可以通过 `<% if (变量) {%>` 判断语句进行选择，具体参考[template-vue](https://github.com/tomieric/create-nice-app/preset/template-vue)
