# Node.js

## 核心概念

### 事件循环
- 6 个阶段：timers → pending callbacks → idle/prepare → poll → check → close
- `process.nextTick` vs `setImmediate`

### 模块系统
- CommonJS vs ESM
- 模块加载机制

### Stream
- Readable、Writable、Transform
- 背压处理
- 管道 `pipe`

## 框架

### Express
- 中间件机制
- 路由、错误处理

### Koa
- 洋葱模型
- `async/await` 中间件

---

*持续更新中...*
