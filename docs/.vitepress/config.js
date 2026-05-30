import { defineConfig } from 'vitepress'

export default defineConfig({
  base: '/FIRST/',
  title: '学习知识库',
  description: '个人学习记录与知识管理 — 数据结构、算法、前后端、数学',
  lang: 'zh-CN',

  lastUpdated: true,
  cleanUrls: true,

  head: [
    ['link', { rel: 'icon', href: '/FIRST/favicon.ico' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: '学习知识库' }],
    ['meta', { property: 'og:description', content: '个人学习记录与知识管理 — 数据结构、算法、前后端、数学' }],
    ['meta', { name: 'theme-color', content: '#3e63dd' }],
  ],

  sitemap: {
    hostname: 'https://zhzhzh12332.github.io/FIRST',
  },

  markdown: {
    lineNumbers: true,
    image: { lazyLoading: true },
    container: {
      tipLabel: '提示',
      warningLabel: '注意',
      dangerLabel: '警告',
      infoLabel: '信息',
      detailsLabel: '详情',
    },
  },

  themeConfig: {
    logo: '📚',
    siteTitle: '学习知识库',

    nav: [
      { text: '首页', link: '/' },
      { text: '计算机基础', link: '/cs/' },
      { text: '前端开发', link: '/frontend/' },
      { text: '后端开发', link: '/backend/' },
      { text: '数学基础', link: '/math/' },
      { text: '随手笔记', link: '/notes/' },
    ],

    sidebar: {
      '/cs/': [
        {
          text: '计算机基础',
          collapsed: false,
          items: [
            { text: '概览', link: '/cs/' },
            { text: '数据结构', link: '/cs/data-structures' },
            { text: '算法', link: '/cs/algorithms' },
            { text: '操作系统', link: '/cs/os' },
            { text: '计算机网络', link: '/cs/networking' },
            { text: '数据库', link: '/cs/database' },
          ],
        },
      ],
      '/frontend/': [
        {
          text: '前端开发',
          collapsed: false,
          items: [
            { text: '概览', link: '/frontend/' },
            { text: 'HTML/CSS', link: '/frontend/html-css' },
            { text: 'JavaScript', link: '/frontend/javascript' },
            { text: 'TypeScript', link: '/frontend/typescript' },
            { text: 'React', link: '/frontend/react' },
            { text: 'Vue', link: '/frontend/vue' },
            { text: '工程化', link: '/frontend/tooling' },
          ],
        },
      ],
      '/backend/': [
        {
          text: '后端开发',
          collapsed: false,
          items: [
            { text: '概览', link: '/backend/' },
            { text: 'Node.js', link: '/backend/nodejs' },
            { text: 'Python', link: '/backend/python' },
            { text: 'API 设计', link: '/backend/api-design' },
            { text: '系统设计', link: '/backend/system-design' },
          ],
        },
      ],
      '/math/': [
        {
          text: '数学基础',
          collapsed: false,
          items: [
            { text: '概览', link: '/math/' },
            { text: '线性代数', link: '/math/linear-algebra' },
            { text: '概率统计', link: '/math/probability' },
            { text: '离散数学', link: '/math/discrete-math' },
          ],
        },
      ],
      '/notes/': [
        {
          text: '随手笔记',
          collapsed: false,
          items: [
            { text: '概览', link: '/notes/' },
            { text: '好文收藏', link: '/notes/articles' },
            { text: '工具推荐', link: '/notes/tools' },
            { text: '踩坑记录', link: '/notes/pitfalls' },
          ],
        },
      ],
    },

    socialLinks: [
      { icon: 'github', link: 'https://github.com/zhzhzh12332/FIRST' },
    ],

    editLink: {
      pattern: 'https://github.com/zhzhzh12332/FIRST/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    search: {
      provider: 'local',
      options: {
        translations: {
          button: {
            buttonText: '搜索',
            buttonAriaLabel: '搜索文档',
          },
          modal: {
            noResultsText: '未找到相关结果',
            resetButtonTitle: '清除搜索',
            footer: {
              selectText: '选择',
              navigateText: '切换',
              closeText: '关闭',
            },
          },
        },
      },
    },

    footer: {
      message: '持续学习，持续成长',
      copyright: 'MIT License © 2024',
    },

    outline: {
      level: [2, 4],
      label: '本页目录',
    },

    docFooter: {
      prev: '上一篇',
      next: '下一篇',
    },

    lastUpdated: {
      text: '最后更新',
    },

    returnToTopLabel: '返回顶部',
    sidebarMenuLabel: '菜单',
    darkModeSwitchLabel: '主题',
    lightModeSwitchTitle: '切换到亮色模式',
    darkModeSwitchTitle: '切换到暗色模式',
  },
})
