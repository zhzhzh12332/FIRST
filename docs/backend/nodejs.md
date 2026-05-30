# Node.js

Node.js 是基于 Chrome V8 引擎的 JavaScript 运行时，让 JS 可以写服务端代码。

## 核心概念

### 事件循环 (Event Loop)

Node.js 的单线程非阻塞 I/O 模型依赖事件循环。

```text
   ┌───────────┐
   │   timers   │ ← setTimeout / setInterval 回调
   └─────┬─────┘
   ┌─────┴─────┐
   │ pending   │ ← 系统操作回调（如 TCP 错误）
   │ callbacks │
   └─────┬─────┘
   ┌─────┴─────┐
   │ idle,     │ ← 内部使用
   │ prepare   │
   └─────┬─────┘
   ┌─────┴─────┐
   │   poll    │ ← I/O 回调（最重要的阶段）
   └─────┬─────┘
   ┌─────┴─────┐
   │  check    │ ← setImmediate 回调
   └─────┬─────┘
   ┌─────┴─────┐
   │  close    │ ← 关闭事件回调
   └───────────┘
```

```javascript
// 不同异步 API 的执行顺序
setTimeout(() => console.log('setTimeout'), 0)
setImmediate(() => console.log('setImmediate'))
process.nextTick(() => console.log('nextTick'))
Promise.resolve().then(() => console.log('Promise'))

// 输出顺序: nextTick → Promise → setTimeout → setImmediate
//（在 I/O 阶段外部，setTimeout 可能先于 setImmediate）
```

::: tip
`process.nextTick` 会在**当前阶段结束后**立即执行，优先级高于微任务。
`setImmediate` 在 `check` 阶段执行。
:::

### 模块系统

```javascript
// CommonJS — Node.js 原生
const fs = require('fs')
const path = require('path')
module.exports = { myFunction }

// ESM — 现代标准（推荐）
import fs from 'fs/promises'
import { resolve } from 'path'
export const myFunction = () => {}
```

### Stream — 处理大文件

```javascript
// 用 Stream 处理大文件，不占内存
import { createReadStream, createWriteStream } from 'fs'
import { Transform } from 'stream'
import { pipeline } from 'stream/promises'

// 创建转换流
const upperCase = new Transform({
  transform(chunk, encoding, callback) {
    callback(null, chunk.toString().toUpperCase())
  }
})

// 管道 — 链式处理
await pipeline(
  createReadStream('input.txt'),   // 读取
  upperCase,                        // 转换
  createWriteStream('output.txt')  // 写入
)
```

## 主流框架

### Express — 最流行的 Node.js 框架

```javascript
import express from 'express'

const app = express()
app.use(express.json())

// 中间件 — 按顺序执行
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()  // 交给下一个中间件
})

// 路由
app.get('/api/users', async (req, res) => {
  const users = await db.findUsers()
  res.json({ data: users })
})

// 错误处理中间件
app.use((err, req, res, next) => {
  console.error(err)
  res.status(500).json({ error: '服务器内部错误' })
})

app.listen(3000)
```

### Koa — 更现代的 Express

```javascript
import Koa from 'koa'
import Router from '@koa/router'

const app = new Koa()
const router = new Router()

// 洋葱模型 — 进入 → 执行 → 退出
app.use(async (ctx, next) => {
  console.time('request')
  await next()                    // 等待后续中间件执行
  console.timeEnd('request')
})

router.get('/api/users', async (ctx) => {
  ctx.body = { data: await db.findUsers() }
})

app.use(router.routes())
app.listen(3000)
```

| 特性 | Express | Koa |
|------|---------|-----|
| 中间件模型 | 线性 | **洋葱模型** |
| 错误处理 | 内置 | 需自行处理 |
| 体积 | 大（内置路由等功能）| 小（极简内核）|
| 异步支持 | 回调/Promise | **async/await 原生** |
| 社区生态 | 最丰富 | 较丰富 |

## 实用技巧

```javascript
// 环境变量管理
import 'dotenv/config'
const { PORT, DB_URL, JWT_SECRET } = process.env

// 文件操作
import fs from 'fs/promises'
const data = await fs.readFile('data.json', 'utf-8')
await fs.writeFile('output.json', JSON.stringify(data, null, 2))

// 子进程
import { exec } from 'child_process'
import { promisify } from 'util'
const execAsync = promisify(exec)
const { stdout } = await execAsync('ls -la')
```

---

*持续更新中...*
