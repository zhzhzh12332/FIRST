# 踩坑记录

工作中遇到的典型问题和解决方案。

## JavaScript

### `==` vs `===`
- 始终使用 `===`，避免隐式类型转换的坑

### 异步陷阱
- `forEach` 不支持 `async/await`
- 用 `for...of` 或 `Promise.all` 替代

## CSS

### z-index 不生效
- 检查是否创建了层叠上下文（`position` + 非 `static`、`opacity < 1` 等）

## Git

### 误提交敏感信息
- `git filter-branch` 或 BFG Repo-Cleaner 清理历史
- 预防：使用 `.gitignore` 和环境变量

---

*持续更新中...*
