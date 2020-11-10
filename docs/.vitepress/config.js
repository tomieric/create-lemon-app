const isProd = process.env.NODE_ENV === 'production'
module.exports = {
  title: "create-soda-app",
  description: "前端项目脚手架模板",
  base: isProd ? '/create-soda-app' : '',
  assetsDir: '',
  themeConfig: {
    repo: 'tomieric/create-soda-app',
    logo: '/images/logo.png',
    docsDir: 'docs',
    search: true,

    nav: [
      {
        text: '起步',
        link: '/'
      },
      {
        text: '模板',
        link: '/templates/'
      },
      {
        text: 'Release Notes',
        link: 'https://github.com/tomieric/create-soda-app/releases'
      }
    ],

    sidebar: {
      '/': [
        {
          text: '起步',
          link: '/',
          // children: [
          //   { text: 'Index', link: '/guide/' },
          //   { text: 'Getting Started', link: '/guide/getting-started' },
          //   { text: 'Guide Content', link: '/guide/guide-content' },
          //   { text: 'Content', link: '/guide/content' },
          // ]
        }
      ],
      '/templates/': [
        {
          text: '模板',
          link: '/templates',
          children: [
            { text: '模板开发', link: '/templates/development' },
            { text: '列表', link: '/templates/list' },
          ]
        }
      ]
    },
    
    locales: {
      '/en/': {
        nav: [
          {
            text: 'Get Started',
            link: '/en/'
          },
          {
            text: 'Templates',
            link: '/en/templates/'
          },
          {
            text: 'Release Notes',
            link: 'https://github.com/tomieric/create-soda-app/blob/master/CHANGELOG.md'
          }
        ],
        sidebar: {
          '/en/': [
            {
              text: 'Get Started',
              link: '/en/',
              // children: [
              //   { text: 'Index', link: '/en/guide/' },
              //   { text: 'Getting Started', link: '/en/guide/getting-started' },
              //   { text: 'Guide Content', link: '/en/guide/guide-content' },
              //   { text: 'Content', link: '/en/guide/content' },
              // ]
            }
          ],
          '/en/templates/': [
            {
              text: 'Templates',
              link: '/en/templates',
              children: [
                { text: 'Template Development', link: '/en/templates/development' },
                { text: 'Template List', link: '/en/templates/list' },
              ]
            }
          ]
        }
      }
    },

    prevLink:true,
    nextLink:true
  },

  plugins: [
    ['container', {
      type: 'tip',
      before: title => `<div class="tip custom-block"><p class="title">${title}</p>`,
      after: '</div>'
    }],
    ['container', {
      type: 'waning',
      before: title => `<div class="warning custom-block"><p class="title">${title}</p>`,
      after: '</div>'
    }],
    ['container', {
      type: 'danger',
      before: title => `<div class="danger custom-block"><p class="title">${title}</p>`,
      after: '</div>'
    }]
  ],

  markdown: {
    // 代码显示行号
    lineNumbers: true
  },

  locales: {
    '/': {
      lang: 'zh-CN',
      title: 'create-soda-app',
      description: '快速创建前端项目'
    },
    '/en/': {
      lang: 'en-US',
      title: 'create-soda-app',
      description: 'Quick to create an app'
    }
  }
}
