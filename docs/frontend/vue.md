# Vue

Vue 是一个渐进式前端框架，以**易上手、灵活、高性能**闻名。

## 核心概念

### 响应式系统

Vue 3 使用 **Proxy** 实现响应式，性能更好且没有 Vue 2 的局限性。

```vue
<script setup>
import { ref, reactive, computed, watch } from 'vue'

// ref — 基本类型响应式
const count = ref(0)
console.log(count.value)  // 0

// reactive — 对象响应式
const user = reactive({
  name: 'Alice',
  age: 25
})

// computed — 计算属性
const double = computed(() => count.value * 2)

// watch — 监听变化
watch(count, (newVal, oldVal) => {
  console.log(`count 从 ${oldVal} 变为 ${newVal}`)
})

// watchEffect — 自动追踪依赖
watchEffect(() => {
  console.log(`count 是: ${count.value}`)
})
</script>

<template>
  <div>
    <p>{{ count }} × 2 = {{ double }}</p>
    <button @click="count++">增加</button>
    <p>用户: {{ user.name }}, {{ user.age }}岁</p>
  </div>
</template>
```

### ref vs reactive

| 特性 | `ref` | `reactive` |
|------|:----:|:----------:|
| 支持类型 | 任意类型（包括基本类型） | 仅对象/数组 |
| 访问方式 | `.value`（模板中自动解包） | 直接访问 |
| 解构 | 解构后仍为响应式 | 解构后失去响应式（需 `toRefs`）|
| 适用场景 | 简单值、从函数返回 | 复杂对象、表单数据 |

### 组合式 API (Composition API)

```vue
<!-- useCounter.js — 逻辑复用 -->
import { ref, computed } from 'vue'

export function useCounter(initialValue = 0) {
  const count = ref(initialValue)
  const double = computed(() => count.value * 2)

  function increment() { count.value++ }
  function decrement() { count.value-- }
  function reset() { count.value = initialValue }

  return { count, double, increment, decrement, reset }
}
```

### 模板语法

```vue
<template>
  <!-- 条件渲染 -->
  <div v-if="status === 'loading'">加载中...</div>
  <div v-else-if="status === 'error'">出错了</div>
  <div v-else>数据加载完成</div>

  <!-- 列表渲染 — 必须加 key -->
  <li v-for="(item, index) in items" :key="item.id">
    {{ index }}: {{ item.name }}
  </li>

  <!-- 双向绑定 -->
  <input v-model="username" type="text">
  <input v-model.number="age" type="number">    <!-- v-model 修饰符 -->
  <input v-model.trim="email" type="email">

  <!-- 事件处理 -->
  <button @click="handleSubmit">提交</button>
  <button @click.once="handleOnce">只触发一次</button>
  <button @click.stop="handleClick">阻止冒泡</button>

  <!-- 插槽 -->
  <Card>
    <template #title>卡片标题</template>
    <template #default>卡片内容</template>
  </Card>
</template>
```

### 组件通信

| 方式 | 方向 | 适用场景 |
|------|:----:|---------|
| `defineProps` | 父 → 子 | 基础数据传递 |
| `defineEmits` | 子 → 父 | 事件通知 |
| `v-model` | 双向 | 表单组件 |
| `slot` | 父 → 子 | 内容分发 |
| `provide/inject` | 祖先 → 后代 | 深层传递 |
| Pinia | 任意 | 全局状态 |

```vue
<!-- 父组件 -->
<script setup>
import ChildComp from './ChildComp.vue'
import { ref } from 'vue'

const message = ref('Hello')
const count = ref(0)
const handleChildEvent = (data) => {
  console.log('收到子组件事件:', data)
}
</script>

<template>
  <ChildComp
    :message="message"
    :count="count"
    @reply="handleChildEvent"
  >
    <template #footer>插槽内容</template>
  </ChildComp>
</template>
```

## 状态管理 — Pinia

```javascript
// stores/counter.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const double = computed(() => count.value * 2)

  function increment() { count.value++ }
  async function fetchAndSet() {
    const data = await api.getCount()
    count.value = data
  }

  return { count, double, increment, fetchAndSet }
})
```

## 推荐生态

| 工具 | 用途 | 推荐理由 |
|------|------|---------|
| **Vite** | 构建工具 | 极速 HMR，Vue 官方推荐 |
| **Pinia** | 状态管理 | 替代 Vuex，TypeScript 友好 |
| **Vue Router** | 路由管理 | SPA 路由、导航守卫 |
| **Nuxt** | 全栈框架 | SSR/SSG，约定式路由 |
| **VueUse** | 工具函数库 | 200+ 常用组合式函数 |

::: tip 学习路线
Vue 3 + Vite + Pinia + Vue Router 是当前推荐的技术栈。有 SSR 需求再上 Nuxt。
:::

---

*持续更新中...*
