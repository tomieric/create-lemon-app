#!/usr/bin/env node
const figlet = require('figlet')
const chalk = require('chalk')
const path = require('path')
const fs = require('fs-extra')
const program = require('commander')
const globby = require('globby')
const inquirer = require('inquirer')
const argv = require('minimist')(process.argv.slice(2))
const appPkg = require('./package.json')

const slogan = figlet.textSync('NIKE', {
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

  console.log()
  console.log(chalk.bold.rgb(255, 0, 23)(slogan))

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
    `template-${argv.t || argv.template || 'vue'}`
  )
  
  // @TODO: 使用 ejs 模板替换
  const write = async (file, content) => {
    const targetPath = renameFiles[file]
      ? path.join(root, renameFiles[file])
      : path.join(root, file)

    if (content) {
      await fs.writeFile(targetPath, content)
    } else {
      await fs.copy(path.join(templateDir, file), targetPath)
    }
  }

  // 模板配置
  if (fs.existsSync(path.join(templateDir, 'prompts.js'))) {
    const prompts = require(path.join(templateDir, 'prompts.js'))
    const options = await inquirer.prompt(prompts || [])
    console.log(options)
  }

  const files = await fs.readdir(templateDir)

  for (const file of files.filter(f => f !== 'package.json')) {
    await write(file)
  }

  const pkg = require(path.join(templateDir, 'package.json'))
  pkg.name = path.basename(root)
  await write('package.json', JSON.stringify(pkg, null, 2))

  console.log(chalk.green('\n🌈 创建完成 \n'))

  if (root !== cwd) {
    console.log(chalk.yellow(`  cd ${path.relative(cwd, root)}\n`))
  }

  console.log(chalk.magenta(`   npm install (or \`yarn\`)`))
  console.log(chalk.magenta(`   npm run dev (or \`yarn dev\`)`))
  console.log()
}

async function showTemplateList () {
  const paths = await globby(['template-*/**'])
  const icons = ['🔴', '🟡', '🟢', '🔵', '🟣']
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
  .usage(chalk.bold('yarn create nike-app <template>'))
  .option('-t, --template <template>', '选择模板创建')
  .option('-l, --list', '显示支持的模板')
  .option('-f, --force', '强制创建项目')
  .on('--help', () => {
    console.log(chalk.green('\n yarn create nike-app <template> \n'))
  })
  .action((cmd) => {
    if (cmd.args[0] && cmd.args[0] === 'list') {
      showTemplateList()
    } else {
      main().catch((error) => {
        console.log(chalk.red(error))
      })
    }
  })

program.parse(process.argv)