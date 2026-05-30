# 踩坑记录

实际开发中遇到的问题和解决方案，持续更新。

## JavaScript / TypeScript

### 异步陷阱

```javascript
// ❌ forEach 不支持 async/await
[1, 2, 3].forEach(async (n) => {
  await delay(n)
})

// ✅ 用 for...of 或 Promise.all
for (const n of [1, 2, 3]) {
  await delay(n)
}
// 或
await Promise.all([1, 2, 3].map(n => delay(n)))
```

### 浮点数精度

```javascript
0.1 + 0.2  // 0.30000000000000004

// 解决方案
// 1. 四舍五入
Math.round((0.1 + 0.2) * 100) / 100  // 0.3

// 2. 使用 toFixed（注意返回字符串）
+(0.1 + 0.2).toFixed(2)

// 3. 金额计算用分（整数）
const priceInCents = 1990  // ¥19.90
```

## React

```jsx
// ❌ 直接修改 state（不触发重新渲染）
const [user, setUser] = useState({ name: 'Alice', age: 25 })
user.age = 26  // 不生效！

// ✅ 创建新对象
setUser(prev => ({ ...prev, age: 26 }))

// ❌ useEffect 缺少依赖
useEffect(() => {
  fetchData(userId)  // ESLint 会警告缺少 userId
}, [])  // userId 变化时不会重新请求

// ✅ 正确声明依赖
useEffect(() => {
  fetchData(userId)
}, [userId])
```

## CSS

### z-index 不生效

```css
/* z-index 不生效的常见原因 */
.element {
  position: relative;
  z-index: 999;
  /* 但父元素是个层叠上下文，限制了这个 z-index */
}

/* 排查步骤 */
1. 确认 position 不是 static
2. 检查父元素是否创建了层叠上下文（opacity < 1、transform 等）
3. 对比同一层叠上下文中的兄弟元素
```

### 元素隐藏方式对比

```css
/* 最常用的三种隐藏方式 */
.hidden-disp { display: none; }        /* 完全消失，不占位，不触发事件 */
.hidden-vis { visibility: hidden; }    /* 不可见但占位，不触发事件 */
.hidden-opa { opacity: 0; }            /* 不可见但占位，可触发事件 */

/* 可访问性的隐藏（对屏幕阅读器可见） */
.sr-only {
  position: absolute;
  width: 1px; height: 1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
}
```

## Git

### 误提交的"后悔药"

```bash
# 1. 刚提交但还没 push — 撤销提交但保留改动
git reset --soft HEAD~1

# 2. 刚提交但想完全放弃改动
git reset --hard HEAD~1

# 3. 已经 push 了 — 用 revert（安全，不修改历史）
git revert HEAD
git push

# 4. 只想修改最近一次提交的 message
git commit --amend -m "新提交信息"

# 5. 后悔把文件加到暂存区了
git reset HEAD filename
```

### 分支管理

```bash
# 删除本地分支
git branch -d feature/old-branch

# 删除远程分支
git push origin --delete feature/old-branch

# 交互式变基 — 整理提交历史
git rebase -i HEAD~3
# pick → squash = 合并提交
# pick → reword = 修改提交信息
# drop = 删除提交
```

::: danger 变基 (rebase) 警告
永远不要对**已经推送并被其他人拉取**的分支执行 rebase。这会导致历史不一致，团队成员会恨你。
只在你个人的、尚未推送的分支上使用 rebase。
:::

## 常见错误信息

| 错误 | 原因 | 解决 |
|------|------|------|
| `port 3000 already in use` | 端口被占用 | `lsof -i:3000` 查进程，kill 掉 |
| `Module not found` | 依赖缺失或路径错误 | 检查 import 路径，运行 `npm install` |
| `Cannot read property of undefined` | 访问了 undefined 的属性 | 使用可选链 `?.` 或默认值 |
| `ERR_CONNECTION_REFUSED` | 服务未运行 | 启动后端服务 |

---

*持续更新中...*
