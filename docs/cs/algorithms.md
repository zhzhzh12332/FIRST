# 算法

算法是解决问题的明确步骤。好的算法能显著提升程序效率。

## 排序算法

### 常见排序对比

| 算法 | 平均时间 | 最坏时间 | 最好时间 | 空间 | 稳定 |
|------|---------|---------|---------|------|:----:|
| 冒泡排序 | O(n²) | O(n²) | O(n) | O(1) | ✅ |
| 选择排序 | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| 插入排序 | O(n²) | O(n²) | O(n) | O(1) | ✅ |
| 希尔排序 | O(n log n)~O(n²) | O(n²) | O(n log n) | O(1) | ❌ |
| **快速排序** | **O(n log n)** | **O(n²)** | **O(n log n)** | **O(log n)** | ❌ |
| **归并排序** | **O(n log n)** | **O(n log n)** | **O(n log n)** | **O(n)** | ✅ |
| **堆排序** | **O(n log n)** | **O(n log n)** | **O(n log n)** | **O(1)** | ❌ |
| 计数排序 | O(n+k) | O(n+k) | O(n+k) | O(k) | ✅ |
| 桶排序 | O(n+k) | O(n²) | O(n+k) | O(n) | ✅ |

```python
# 快速排序 — 实际应用中最快的排序
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left   = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right  = [x for x in arr if x > pivot]
    return quick_sort(left) + middle + quick_sort(right)

# 归并排序 — 稳定、时间复杂度稳定
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)

def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    return result + left[i:] + right[j:]
```

::: tip 如何选择排序算法？
- **小规模数据 (n < 50)**：插入排序（简单、常数小）
- **一般情况**：快速排序（实际最快的比较排序）
- **需要稳定排序**：归并排序
- **担心快排最坏情况**：堆排序或随机化快排
- **数据范围有限**：计数排序或桶排序（O(n)）
:::

## 搜索算法

### 二分查找
有序数组中的 **O(log n)** 查找。

```typescript
function binarySearch(nums: number[], target: number): number {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)
    if (nums[mid] === target) return mid
    if (nums[mid] < target) left = mid + 1
    else right = mid - 1
  }
  return -1
}
```

### BFS vs DFS

| 算法 | 数据结构 | 空间 | 适用场景 |
|------|---------|------|---------|
| BFS | 队列 | O(宽度) | 最短路径、层序遍历 |
| DFS | 栈/递归 | O(深度) | 全排列、连通性、回溯 |

```typescript
// BFS 框架
function bfs(start: number, graph: Map<number, number[]>): number {
  const visited = new Set([start])
  const queue = [start]
  let steps = 0

  while (queue.length) {
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!
      // 处理当前节点
      for (const neighbor of graph.get(node) || []) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor)
          queue.push(neighbor)
        }
      }
    }
    steps++
  }
  return steps
}
```

## 算法思想

### 动态规划 (DP)
**核心**：最优子结构 + 重叠子问题

```typescript
// 斐波那契 — 基础 DP
function fib(n: number): number {
  const dp = [0, 1]
  for (let i = 2; i <= n; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[n]
}

// 背包问题 — 经典 DP
function knapsack(weights: number[], values: number[], capacity: number): number {
  const n = weights.length
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let w = 0; w <= capacity; w++) {
      if (weights[i - 1] <= w) {
        dp[i][w] = Math.max(
          values[i - 1] + dp[i - 1][w - weights[i - 1]],
          dp[i - 1][w]
        )
      } else {
        dp[i][w] = dp[i - 1][w]
      }
    }
  }
  return dp[n][capacity]
}
```

### 其他思想

| 思想 | 核心 | 经典问题 |
|------|------|---------|
| **贪心** | 局部最优 → 全局最优 | 活动选择、Huffman 编码 |
| **分治** | 分解 → 解决 → 合并 | 归并排序、快速幂 |
| **回溯** | 试错，不行就回退 | N 皇后、数独、全排列 |
| **双指针** | 两个指针协同遍历 | 两数之和、链表判环 |
| **滑动窗口** | 维护一个窗口区间 | 最长子串、最小覆盖子串 |

```typescript
// 回溯算法框架
function backtrack(path: number[], choices: number[], result: number[][]) {
  if (满足条件) {
    result.push([...path])
    return
  }
  for (const choice of choices) {
    // 做选择
    path.push(choice)
    backtrack(path, choices, result)
    // 撤销选择
    path.pop()
  }
}
```

## 推荐练习平台
- [LeetCode](https://leetcode.cn) — 面试刷题首选
- [Codeforces](https://codeforces.com) — 算法竞赛
- [AtCoder](https://atcoder.jp) — 日系竞赛平台

---

*持续更新中...*
