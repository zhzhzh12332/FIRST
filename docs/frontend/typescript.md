# TypeScript

## 类型基础

### 基本类型注解
```ts
let name: string = 'hello'
let count: number = 42
let isDone: boolean = false
```

### 高级类型
- 联合类型 `string | number`
- 交叉类型 `A & B`
- 类型别名 `type`
- 接口 `interface`

## 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}
```

- 泛型约束
- 条件类型
- 工具类型：`Partial`、`Required`、`Pick`、`Omit`、`Record`

## 类型体操

- `extends` 条件判断
- `infer` 类型推断
- 模板字面量类型

---

*持续更新中...*
