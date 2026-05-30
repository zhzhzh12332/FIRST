# 工具推荐

提升开发效率的工具和技巧。

## 编辑器

### VS Code
| 插件 | 用途 |
|------|------|
| ESLint | 代码规范检查 |
| Prettier | 代码格式化 |
| GitHub Copilot | AI 代码补全 |
| GitLens | Git 历史可视化 |
| Error Lens | 内联错误提示 |

### Neovim
键盘驱动的编辑器，适合愿意投入学习成本的用户。

```vim
" 必备插件
" lazy.nvim — 插件管理器
" telescope.nvim — 模糊搜索
" lsp-zero.nvim — LSP 配置
" treesitter — 语法高亮
" copilot.lua — AI 补全
```

## 终端

| 工具 | 用途 |
|------|------|
| [Warp](https://www.warp.dev/) | 现代化 Rust 终端（macOS/Windows）|
| [Oh My Posh](https://ohmyposh.dev/) | Windows 终端美化（替代 oh-my-zsh）|
| [fzf](https://github.com/junegunn/fzf) | 万能模糊搜索，命令行效率神器 |
| [ripgrep (rg)](https://github.com/BurntSushi/ripgrep) | 比 grep 快 10 倍的代码搜索 |
| [bat](https://github.com/sharkdp/bat) | 带语法高亮的 cat 替代品 |
| [fd](https://github.com/sharkdp/fd) | 比 find 更快的文件查找 |

## 开发效率

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| [Git](https://git-scm.com/) | 版本控制 | 必备技能 |
| [Docker](https://www.docker.com/) | 容器化开发 | 环境一致，秒级部署 |
| [Bruno](https://www.usebruno.com/) | API 调试 | 开源，离线，比 Postman 快 |
| [HTTPie](https://httpie.io/) | 命令行 HTTP 客户端 | 比 curl 更人性化 |
| [jq](https://jqlang.github.io/jq/) | JSON 命令行处理 | `curl ... \| jq .` |
| [tmux](https://github.com/tmux/tmux) | 终端复用器 | 分屏、持久会话 |

## 笔记与知识管理

| 工具 | 特点 |
|------|------|
| [Obsidian](https://obsidian.md/) | 本地 Markdown、双向链接、图谱视图 |
| [Excalidraw](https://excalidraw.com/) | 手绘风格图表，适合画架构图 |
| [Notion](https://www.notion.so/) | 全能笔记，适合团队协作 |
| [tldraw](https://www.tldraw.com/) | 在线白板，画流程图 |

## Git 别名推荐

```bash
# 简化常用命令
git config --global alias.st status
git config --global alias.co checkout
git config --global alias.br branch
git config --global alias.ci commit
git config --global alias.df diff
git config --global alias.last 'log -1 HEAD'
git config --global alias.undo 'reset --soft HEAD~1'
```

---

*持续更新中...*
