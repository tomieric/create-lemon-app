module.exports = [
  {
    name: 'cssPreprocessor',
    type: 'list',
    message: '请选择预处理器',
    default: 'less',
    choices: [
      {
        name: 'Less',
        value: 'less'
      },
      {
        name: 'Sass/Scss',
        value: 'sass'
      },
      {
        name: 'Postcss',
        value: 'postcss'
      }
    ]
  },
  {
    name: 'framework',
    type: 'list',
    message: '选择 UI 框架',
    choices: [
      {
        name: 'iView',
        value: 'iView'
      },
      {
        name: 'Element UI',
        value: 'element-ui'
      },
      {
        name: 'Ant Design Vue',
        value: 'ant-design-vue'
      }
    ]
  },
  {
    name: 'serverPort',
    type: 'input',
    message: '服务端口号(默认：8080)',
    default: '8080',
    validate: function (n) {
      return !isNaN(n)
    }
  }
]