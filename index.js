#!/usr/bin/env node
const figlet   = require('figlet')
const chalk    = require('chalk')
const path     = require('path')
const fs       = require('fs-extra')
const program  = require('commander')
const globby   = require('globby')
const inquirer = require('inquirer')
const debug    = require('debug')
const ejs      = require('ejs')
const argv     = require('minimist')(process.argv.slice(2))
const appPkg   = require('./package.json')
const { basename } = require('path')

const slogan = figlet.textSync('LEMON', {
  font: 'ANSI Shadow',
  horizontalLayout: 'full'
})

async function main () {
  const targetDir = argv._[0] || '.'
  const cwd = process.cwd()
  const root = path.join(cwd, targetDir)
  const renameFiles = {
    _gitignore: '.gitignore'
  }
  let options = { projectName: path.basename(root) }

  console.log()
  console.log(chalk.bold.rgb(62, 175, 124)(slogan))

  console.log(chalk.cyan(`🚀 正在创建工程 ${root}...`))

  // 强制创建项目
  if (argv.f || argv.force) {
    fs.rmdirSync(root, { recursive: true })
  }

  await fs.ensureDir(root)
  const existing = await fs.readdir(root)

  if (existing.length) {
    console.log(chalk.red('错误❎：项目目录已存在！\n'))
    console.log(chalk.yellow(`  rm -rf ${path.relative(cwd, root)}\n`))
    process.exit(1)
  }

  const templateDir = path.join(
    __dirname,
    'preset',
    `template-${argv.t || argv.template || 'vue'}`
  )
  
  // @TODO: 使用 ejs 模板替换
  const writeFile = async (file, options, ejsOptions = {}) => {
    debug('file：', file)
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)

    const content = fs.readFileSync(
      path.join(templateDir, file),
      'utf-8'
    )

    const result = ejs.render(content, options, ejsOptions)
    fs.ensureFileSync(targetPath)
    await fs.writeFile(targetPath, result)
  }

  // 模板配置
  if (fs.existsSync(path.join(templateDir, 'prompts.js'))) {
    const prompts = require(path.join(templateDir, 'prompts.js'))
    options = Object.assign(
      options,
      await inquirer.prompt(prompts || [])
    )
  }

  debug('用户配置：', options)

  // const files = await fs.readdir(templateDir)
  const files = await globby([templateDir + '/**/**'])

  for (const file of files) {
    await writeFile(file.replace(templateDir + '/', ''), options)
  }

  console.log(chalk.green('\n🌈 创建完成 \n'))

  if (root !== cwd) {
    console.log(chalk.yellow(`  cd ${path.relative(cwd, root)}\n`))
  }

  console.log(chalk.magenta(`   npm install (or \`yarn\`)`))
  console.log(chalk.magenta(`   npm run dev (or \`yarn dev\`)`))
  console.log()
}

async function showTemplateList () {
  let paths = await globby(['preset/template-*/package.json'])
  const icons = ['🔴', '🟡', '🟢', '🔵', '🟣']
  debug('预设目录', paths)
  paths.forEach((p, index) => {
    console.log([
      '   ',
      icons[index % icons.length],
      chalk.blue(` ${path.dirname(p)}`)
    ].join(''))
  })
}

program
  .version(`${appPkg.version}`)
  .usage(chalk.bold('yarn create lemon-app <template>'))
  .option('-t, --template <template>', '选择模板创建')
  .option('-l, --list', '显示支持的模板')
  .option('-f, --force', '强制创建项目')
  .on('--help', () => {
    console.log(chalk.green('\n yarn create lemon-app <template> \n'))
  })
  .action((cmd) => {
    debug('cmd：%o', cmd)

    if (cmd.list) {
      showTemplateList()
    } else {
      main().catch((error) => {
        console.log(chalk.red(error))
      })
    }
  })

program.parse(process.argv)
