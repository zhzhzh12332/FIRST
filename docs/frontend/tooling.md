# 前端工程化

前端工程化涵盖从开发到部署的全链路工具和实践。

## 构建工具

### Vite — 新一代构建工具

Vite 利用原生 ESM 实现极速开发体验。

| 特性 | Vite | Webpack |
|------|:----:|:-------:|
| 开发服务器 | **ESM 原生**（无需打包） | 打包后提供 |
| HMR 速度 | **毫秒级**（只更新变化模块） | 秒级（随项目增大变慢） |
| 构建 | Rollup | Webpack |
| 配置复杂度 | 低（开箱即用） | 中高 |

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['vue', 'vue-router', 'pinia'],
        },
      },
    },
  },
})
```

### Webpack 核心概念
```
Entry → Loaders → Plugins → Output
```
- **Entry**：入口文件
- **Loaders**：文件转换（Babel、CSS、图片）
- **Plugins**：扩展功能（HTML 生成、压缩）
- **Output**：输出文件

## 测试体系

### 测试金字塔
```
        ╱╲
       ╱E2E╲          ← 少而慢，覆盖核心流程
      ╱─────╲
     ╱ 集成 ╲         ← 中等数量，组件/API 交互测试
    ╱─────────╲
   ╱  单元测试  ╲      ← 多而快，函数/逻辑测试
```

```typescript
// Vitest 单元测试
import { describe, it, expect } from 'vitest'

describe('utils', () => {
  it('should format date correctly', () => {
    const result = formatDate('2024-01-15')
    expect(result).toBe('2024年1月15日')
  })

  it('should handle edge cases', () => {
    expect(formatDate(null)).toBe('')
    expect(formatDate(undefined)).toBe('')
  })
})

// Testing Library 组件测试
import { render, screen, fireEvent } from '@testing-library/react'

it('should increment counter on click', () => {
  render(<Counter />)
  const button = screen.getByText('+1')
  fireEvent.click(button)
  expect(screen.getByText('1')).toBeInTheDocument()
})
```

## CI/CD

### GitHub Actions 示例
```yaml
name: CI
on: [push, pull_request]

jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npm run lint
      - run: npm run typecheck
      - run: npm test
      - run: npm run build
```

## 性能优化

### 优化清单

| 优化方向 | 具体措施 |
|---------|---------|
| **构建** | 代码分割、Tree Shaking、压缩 |
| **图片** | WebP/AVIF 格式、懒加载、响应式图片 |
| **缓存** | 强缓存（CDN）+ 协商缓存（ETag）|
| **网络** | CDN 加速、HTTP/2 多路复用 |
| **渲染** | 虚拟滚动、减少重排、防抖节流 |

### Core Web Vitals

| 指标 | 含义 | 目标 |
|------|------|:----:|
| **LCP** | 最大内容渲染时间 | < 2.5s |
| **FID** | 首次输入延迟 | < 100ms |
| **CLS** | 累计布局偏移 | < 0.1 |

```javascript
// 性能监控
new PerformanceObserver((list) => {
  for (const entry of list.getEntries()) {
    console.log(`${entry.name}: ${entry.startTime}ms`)
    // 上报到监控平台
  }
}).observe({ type: 'largest-contentful-paint', buffered: true })
```

---

*持续更新中...*
