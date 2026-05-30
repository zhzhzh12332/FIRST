# API 设计

良好的 API 设计是后端系统的核心。一致的命名、正确的状态码、清晰的文档缺一不可。

## RESTful API

### 设计原则

**资源导向 — 使用名词复数：**

```text
GET    /users          → 获取用户列表
POST   /users          → 创建用户
GET    /users/:id      → 获取单个用户
PUT    /users/:id      → 替换用户
PATCH  /users/:id      → 部分更新用户
DELETE /users/:id      → 删除用户

GET    /users/:id/orders    → 用户的订单列表
GET    /articles/:id/comments → 文章的评论
```

### 状态码正确使用

| 状态码 | 含义 | 使用场景 |
|--------|------|---------|
| **200** OK | 请求成功 | GET、PATCH 成功返回 |
| **201** Created | 创建成功 | POST 创建资源 |
| **204** No Content | 无返回内容 | DELETE 删除成功 |
| **301** Moved Permanently | 永久重定向 | URL 变更 |
| **304** Not Modified | 资源未变 | 缓存协商 |
| **400** Bad Request | 请求参数错误 | 校验失败 |
| **401** Unauthorized | 未认证 | 需要登录 |
| **403** Forbidden | 无权限 | 已登录但没权限 |
| **404** Not Found | 资源不存在 | 路径错误 |
| **409** Conflict | 冲突 | 重复创建 |
| **422** Unprocessable Entity | 语义错误 | 请求体格式错误 |
| **429** Too Many Requests | 限流 | 请求过频繁 |
| **500** Internal Server Error | 服务端错误 | 未捕获异常 |
| **502** Bad Gateway | 网关错误 | 上游服务异常 |
| **503** Service Unavailable | 服务不可用 | 维护/过载 |

### 统一响应格式

```typescript
// 成功响应
{
  "code": 0,
  "message": "success",
  "data": {
    "id": 1,
    "name": "Alice",
    "email": "alice@example.com"
  }
}

// 分页响应
{
  "code": 0,
  "data": [
    { "id": 1, "name": "Alice" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 100,
    "totalPages": 5
  }
}

// 错误响应
{
  "code": 40001,
  "message": "参数校验失败",
  "errors": [
    { "field": "email", "message": "邮箱格式不正确" }
  ]
}
```

### API 版本管理

```text
# URI 版本（最简单，最常用）
/api/v1/users
/api/v2/users

# 请求头版本（更 RESTful）
Accept: application/vnd.myapp.v1+json

# 参数版本
/users?version=1
```

## 认证与授权

| 方案 | 存储位置 | 特点 | 适用场景 |
|------|---------|------|---------|
| **Session** | 服务端 | 有状态，可主动失效 | 传统 Web 应用 |
| **JWT** | 客户端 | 无状态，跨域友好 | SPA、移动端、微服务 |
| **OAuth 2.0** | 第三方 | 授权委托 | 第三方登录（GitHub/Google）|

```typescript
// JWT 认证流程
1. 用户登录 → 服务端验证 → 签发 JWT Token
2. 前端存储 Token（通常存 LocalStorage 或 HttpOnly Cookie）
3. 每次请求携带 Authorization: Bearer <token>
4. 服务端验证 Token 签名和有效期

// JWT 组成
 Header: { "alg": "HS256", "typ": "JWT" }
 Payload: { "sub": "user_id", "iat": 1700000000, "exp": 1700086400 }
 Signature: HMACSHA256(base64(Header) + "." + base64(Payload), secret)
```

::: danger JWT 安全须知
- **不要**在 Payload 中存放敏感信息（它是 Base64 编码，不是加密）
- **必须**使用 HTTPS 防止 Token 被截获
- Access Token 有效期应短（15-30 分钟），配合 Refresh Token 使用
- 服务端无法主动使 JWT 失效，可维护黑名单解决
:::

## GraphQL

```graphql
# Schema 定义
type User {
  id: ID!
  name: String!
  email: String!
  posts: [Post!]!
}

type Post {
  id: ID!
  title: String!
  content: String!
  author: User!
}

type Query {
  user(id: ID!): User
  users(page: Int, limit: Int): [User!]!
}

type Mutation {
  createUser(name: String!, email: String!): User!
}
```

**REST vs GraphQL：**
| 维度 | REST | GraphQL |
|------|------|---------|
| 数据获取 | 固定结构，可能过多或过少 | **按需查询**，精确返回 |
| 端点 | 多个端点（/users、/users/:id/posts）| **单一端点** /graphql |
| 缓存 | HTTP 缓存天然支持 | 需额外配置 |
| 学习成本 | 低 | 中 |
| 工具生态 | 成熟 | 成长中 |

## API 安全最佳实践

1. **HTTPS only** — 所有 API 必须走 HTTPS
2. **限流 (Rate Limiting)** — 防止滥用和 DDoS
3. **输入验证** — 永远不要信任用户输入
4. **CORS 严格配置** — 只允许特定域名
5. **速率限制** — 分级限流（匿名 < 登录 < VIP）
6. **审计日志** — 记录敏感操作

```typescript
// 限流中间件 (Express)
import rateLimit from 'express-rate-limit'

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,  // 15 分钟窗口
  max: 100,                   // 最多 100 次请求
  message: { code: 429, message: '请求过于频繁，请稍后重试' }
})

app.use('/api/', limiter)
```

---

*持续更新中...*
