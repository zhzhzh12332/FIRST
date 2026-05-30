# TypeScript

TypeScript 是 JavaScript 的超集，添加了静态类型系统。它是现代前端项目的事实标准。

## 为什么需要 TypeScript？

| 优势 | 说明 |
|------|------|
| **静态类型检查** | 在编译时发现类型错误，减少运行时 bug |
| **更好的 IDE 支持** | 自动补全、重构、类型提示 |
| **自文档化** | 类型定义即文档 |
| **大型项目友好** | 便于代码理解和协作 |

## 类型基础

### 基本类型注解

```typescript
let name: string = 'hello'
let age: number = 25
let isActive: boolean = false
let data: null = null
let id: undefined = undefined

// 数组
let fruits: string[] = ['apple', 'banana']
let numbers: Array<number> = [1, 2, 3]

// 元组
let pair: [string, number] = ['age', 25]

// 枚举
enum Direction {
  Up,    // 0
  Down,  // 1
  Left,  // 2
  Right  // 3
}
```

### 高级类型

```typescript
// 联合类型
type Status = 'idle' | 'loading' | 'success' | 'error'

// 交叉类型
type Named = { name: string }
type Aged = { age: number }
type Person = Named & Aged  // { name: string; age: number }

// 字面量类型
type ButtonSize = 'sm' | 'md' | 'lg'

// 类型别名
type ID = string | number
type Point = { x: number; y: number }

// 索引签名
type Dictionary<T> = {
  [key: string]: T
}
```

### interface vs type

```typescript
// interface — 声明合并，可扩展
interface User {
  name: string
  email: string
}
interface User {
  age?: number  // ? 表示可选
}
// → User 有 name、email、age 三个属性

// type — 不能重复声明，但能做联合/交叉
type Animal = { name: string }
type Bear = Animal & { honey: boolean }  // 扩展

// 函数类型
interface SearchFn {
  (source: string, sub: string): boolean
}
type SearchFnType = (source: string, sub: string) => boolean
```

::: tip
**interface** 定义对象结构（可自动合并），**type** 做类型组合（联合、交叉、工具类型）更灵活。
:::

## 泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
  return arg
}

// 泛型接口
interface ApiResponse<T> {
  code: number
  data: T
  message: string
}

// 泛型约束
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
getLength('hello')  // 5
getLength([1, 2, 3]) // 3
// getLength(42)     // ❌ number 没有 length

// 泛型类
class Stack<T> {
  private items: T[] = []
  push(item: T) { this.items.push(item) }
  pop(): T | undefined { return this.items.pop() }
}
```

## 类型体操

### 条件类型

```typescript
type IsString<T> = T extends string ? true : false
type A = IsString<'hello'>  // true
type B = IsString<42>       // false

// infer 推断
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never
type FnType = ReturnType<typeof fetchUser>  // Promise<Response>
```

### 工具类型

| 工具类型 | 作用 | 示例 |
|---------|------|------|
| `Partial<T>` | 所有属性变可选 | `Partial<User>` |
| `Required<T>` | 所有属性变必填 | `Required<User>` |
| `Pick<T, K>` | 挑选部分属性 | `Pick<User, 'name' \| 'email'>` |
| `Omit<T, K>` | 排除部分属性 | `Omit<User, 'password'>` |
| `Record<K, V>` | 构造对象类型 | `Record<string, number>` |
| `Readonly<T>` | 所有属性只读 | `Readonly<Config>` |

```typescript
// 实际项目实用类型
type APIResponse<T> = {
  data: T
  error?: string
  loading: boolean
}

type PaginatedResponse<T> = APIResponse<T> & {
  total: number
  page: number
  pageSize: number
}

// 函数重载
function processInput(input: string): string
function processInput(input: number): number
function processInput(input: string | number): string | number {
  if (typeof input === 'string') return input.toUpperCase()
  return input * 2
}
```

## 类型最佳实践

```typescript
// ✅ 用 interface 定义 props
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick: () => void
  children: React.ReactNode
}

// ✅ 用 const 断言定义常量
export const ROLES = ['admin', 'user', 'guest'] as const
type Role = (typeof ROLES)[number]  // 'admin' | 'user' | 'guest'

// ✅ 类型守卫
function isError(err: unknown): err is Error {
  return err instanceof Error
}

// ✅ 使用 satisfies 进行类型验证 (TS 4.9+)
const config = {
  name: 'app',
  port: 3000,
} satisfies Record<string, string | number>
```

---

*持续更新中...*
