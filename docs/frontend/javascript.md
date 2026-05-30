# JavaScript

JavaScript 是 Web 的基石语言，从脚本语言发展成全栈主力。

## 数据类型与类型转换

### 基本类型
| 类型 | 示例 | 特点 |
|------|------|------|
| `string` | `'hello'` | 不可变，支持模板字符串 |
| `number` | `42`, `3.14` | 64 位浮点，`NaN`、`Infinity` |
| `boolean` | `true` / `false` | 逻辑控制 |
| `null` | `null` | 显式的空值 |
| `undefined` | `undefined` | 未定义的值 |
| `symbol` | `Symbol('id')` | 唯一标识符 |
| `bigint` | `9007199254740991n` | 大整数 |

### 类型判断

```javascript
typeof 'hello'          // "string"
typeof 42               // "number"
typeof true             // "boolean"
typeof null             // "object"  ← 历史遗留 bug！
typeof undefined        // "undefined"
typeof Symbol()         // "symbol"
typeof 1n               // "bigint"

// 准确的类型判断
Object.prototype.toString.call([])     // "[object Array]"
Object.prototype.toString.call(null)   // "[object Null]"
Array.isArray([])                       // true
```

::: warning `typeof null`
这是 JS 的**历史遗留 bug**。`null` 是基本类型，但 `typeof null` 返回 `"object"`。用 `=== null` 来判断。
:::

## 作用域与闭包

### 作用域链
```javascript
const globalVar = 'global'

function outer() {
  const outerVar = 'outer'

  function inner() {
    const innerVar = 'inner'
    console.log(innerVar)   // → "inner"
    console.log(outerVar)   // → "outer"
    console.log(globalVar)  // → "global"
  }

  inner()
}
```

### 闭包
**闭包 = 函数 + 词法环境**。即使外部函数已返回，内部函数仍能访问外部函数的变量。

```javascript
// 计数器 — 闭包经典用例
function createCounter() {
  let count = 0
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count,
  }
}

const counter = createCounter()
counter.increment()  // 1
counter.increment()  // 2
counter.decrement()  // 1

// 防抖 — 闭包实际应用
function debounce(fn, delay = 300) {
  let timer = null
  return function (...args) {
    clearTimeout(timer)
    timer = setTimeout(() => fn.apply(this, args), delay)
  }
}

// 节流
function throttle(fn, interval = 300) {
  let lastTime = 0
  return function (...args) {
    const now = Date.now()
    if (now - lastTime >= interval) {
      lastTime = now
      fn.apply(this, args)
    }
  }
}
```

## 原型链与继承

```javascript
// 原型链
const arr = [1, 2, 3]
// arr → Array.prototype → Object.prototype → null

// 基于原型的继承
function Animal(name) {
  this.name = name
}
Animal.prototype.speak = function () {
  console.log(`${this.name} makes a sound.`)
}

function Dog(name, breed) {
  Animal.call(this, name)   // 调用父类构造函数
  this.breed = breed
}

Dog.prototype = Object.create(Animal.prototype)
Dog.prototype.constructor = Dog
Dog.prototype.bark = function () {
  console.log(`${this.name} barks!`)
}

const dog = new Dog('Buddy', 'Golden')
dog.speak()  // "Buddy makes a sound."
dog.bark()   // "Buddy barks!"
```

## 异步编程

### 异步演进史
```
回调函数 → Promise → async/await
```

```javascript
// Promise
function fetchUser(id) {
  return fetch(`https://api.example.com/users/${id}`)
    .then(res => {
      if (!res.ok) throw new Error('请求失败')
      return res.json()
    })
}

// async/await — 最推荐的写法
async function fetchUserData(id) {
  try {
    const user = await fetchUser(id)
    const posts = await fetch(`/users/${user.id}/posts`).then(r => r.json())
    return { user, posts }
  } catch (err) {
    console.error('获取用户数据失败:', err)
    throw err
  }
}
```

### 事件循环 (Event Loop)

```text
执行顺序：
1. 同步代码（调用栈）
2. 微任务队列（Promise.then、MutationObserver、queueMicrotask）
3. 宏任务队列（setTimeout、setInterval、I/O、UI 渲染）
4. 回到步骤 2
```

```javascript
console.log('1')                          // 同步

setTimeout(() => console.log('2'), 0)      // 宏任务

Promise.resolve().then(() => console.log('3'))  // 微任务

queueMicrotask(() => console.log('4'))     // 微任务

console.log('5')                          // 同步

// 输出: 1 → 5 → 3 → 4 → 2
```

## ES6+ 特性速查

| 特性 | 示例 |
|------|------|
| 箭头函数 | `const fn = (x) => x * 2` |
| 解构赋值 | `const { name, age } = obj` |
| 展开运算符 | `[...arr1, ...arr2]` |
| 可选链 | `user?.address?.city` |
| 空值合并 | `name ?? '默认名'` |
| 模板字符串 | `` `Hello, ${name}!` `` |
| 模块导入 | `import { foo } from './bar'` |
| 可选链调用 | `obj?.method?.()` |

---

*持续更新中...*
