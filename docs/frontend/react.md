# React

React 是用于构建用户界面的 JavaScript 库。组件化、声明式、数据驱动。

## 核心概念

### 组件

```jsx
// 函数组件 — 现代 React 推荐写法
function Greeting({ name }) {
  return <h1>你好, {name}!</h1>
}

// 等价于箭头函数
const Greeting: React.FC<{ name: string }> = ({ name }) => {
  return <h1>你好, {name}!</h1>
}
```

### JSX 规则
1. **只能返回一个根元素**（或使用 Fragment `<>...</>`）
2. **所有标签必须闭合**（`<img />`、`<br />`）
3. **使用 camelCase 命名**：`onClick`、`className`、`tabIndex`
4. **`{}` 内写 JavaScript 表达式**

### Props
```jsx
// Props 传递
<UserProfile
  name="Alice"
  age={25}
  isAdmin={true}
  onUpdate={(data) => console.log(data)}
  style={{ color: 'blue' }}
/>
```

## Hooks

### useState

```jsx
function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>计数: {count}</p>
      <button onClick={() => setCount(c => c + 1)}>+1</button>
    </div>
  )
}
```

::: tip 状态更新原则
- 直接修改状态不会触发热更新（要用 `setState`）
- 状态更新是**异步**的
- 多次 setState 会**批量合并**
- 引用类型要创建新对象（不可变更新）
:::

### useEffect

```jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null)

  // 组件挂载 & 依赖变化时执行
  useEffect(() => {
    fetchUser(userId).then(setUser)

    // 清理函数：组件卸载或重新执行前调用
    return () => console.log('清理副作用')
  }, [userId])  // 依赖数组

  // 空依赖 → 只在挂载时执行一次
  useEffect(() => {
    document.title = '个人主页'
  }, [])

  return <div>{user?.name}</div>
}
```

| 依赖数组 | 执行时机 |
|---------|---------|
| 不传 | 每次渲染后执行 |
| `[]` | 只在挂载时执行一次 |
| `[a, b]` | a 或 b 变化时执行 |

### 其他常用 Hooks

```jsx
// useRef — 引用 DOM / 保存可变值
function AutoFocus() {
  const inputRef = useRef(null)
  useEffect(() => { inputRef.current?.focus() }, [])
  return <input ref={inputRef} />
}

// useMemo — 缓存计算结果
const sortedList = useMemo(
  () => items.sort((a, b) => a.name.localeCompare(b.name)),
  [items]
)

// useCallback — 缓存函数引用
const handleClick = useCallback(
  () => console.log('点击', id),
  [id]
)

// useContext — 跨层级传数据
const ThemeContext = createContext('light')
const theme = useContext(ThemeContext)
```

### 自定义 Hooks
```jsx
// 自定义 Hook：管理表单状态
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues)

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    setValues(prev => ({ ...prev, [name]: value }))
  }, [])

  const reset = useCallback(() => setValues(initialValues), [initialValues])

  return { values, handleChange, reset }
}

// 使用
function LoginForm() {
  const { values, handleChange, reset } = useForm({
    email: '',
    password: ''
  })
  // ...
}
```

## 状态管理方案

| 方案 | 适用场景 | 学习成本 |
|------|---------|---------|
| React Context | 主题、语言等简单全局状态 | 低 |
| **Zustand** | 中小型应用，API 极简 | 低 |
| **Redux Toolkit** | 大型应用，复杂状态逻辑 | 中 |
| Jotai / Recoil | 原子化状态管理 | 中 |

```jsx
// Zustand 示例 — 简洁的全局状态
import { create } from 'zustand'

const useStore = create((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
  reset: () => set({ count: 0 }),
}))

function Counter() {
  const { count, increment, reset } = useStore()
  return (
    <div>
      <p>{count}</p>
      <button onClick={increment}>+</button>
      <button onClick={reset}>重置</button>
    </div>
  )
}
```

## 渲染机制

### Virtual DOM 工作流程
```
状态变化 → 生成新 Virtual DOM → Diff 对比 → 计算最小更新 → 实际 DOM 更新
```

### 性能优化原则
1. **减少不必要的渲染**：`React.memo`、`useMemo`、`useCallback`
2. **列表渲染加 key**：稳定且唯一的 key
3. **状态提升**：把共享状态放到最近的共同祖先
4. **代码分割**：`React.lazy` + `Suspense`

```jsx
// React.memo — 只有 props 变化才重新渲染
const ExpensiveList = React.memo(({ items }) => {
  return items.map(item => <ListItem key={item.id} item={item} />)
})

// 代码分割
const LazyPage = React.lazy(() => import('./HeavyPage'))

function App() {
  return (
    <Suspense fallback={<Loading />}>
      <LazyPage />
    </Suspense>
  )
}
```

## React 19 新特性

- **Actions** — 自动管理表单提交状态
- **use()** — 在 render 中加载异步数据
- **Server Components** — 稳定版（Next.js App Router）
- **新 Hook**：`useActionState`、`useFormStatus`

---

*持续更新中...*
