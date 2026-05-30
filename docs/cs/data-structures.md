# 数据结构

数据结构是计算机存储、组织数据的方式。选择合适的数据结构可以显著提升算法效率。

::: tip 核心思想
**程序 = 数据结构 + 算法** — 数据结构决定了数据的组织方式，算法决定了处理方式。
:::

## 线性结构

### 数组 (Array)
连续内存空间，支持 **O(1)** 随机访问。

| 操作 | 时间复杂度 |
|------|-----------|
| 随机访问 | **O(1)** |
| 插入（末尾） | **O(1)** |
| 插入（中间/头部） | **O(n)** |
| 删除 | **O(n)** |
| 搜索 | **O(n)** |

```typescript
// 数组常见操作
const arr = [1, 2, 3, 4, 5]
arr.push(6)           // 末尾插入 O(1)
arr.unshift(0)        // 头部插入 O(n)
arr.splice(2, 1)      // 删除索引2 O(n)
arr.includes(3)       // 搜索 O(n)
```

::: warning
数组插入/删除需要移动大量元素。频繁增删的场景应优先考虑链表。
:::

### 链表 (Linked List)
非连续存储，通过指针连接。插入/删除 **O(1)**，查找 **O(n)**。

```c
// 单向链表节点
struct ListNode {
    int val;
    struct ListNode *next;
};
```

**链表变体：**
| 类型 | 特点 | 适用场景 |
|------|------|---------|
| 单向链表 | 每个节点只有一个 next 指针 | 简单队列 |
| 双向链表 | 有 prev 和 next 指针 | LRU 缓存 |
| 循环链表 | 尾节点指向头节点 | 约瑟夫问题、轮询调度 |

### 栈 (Stack)
**后进先出 (LIFO)**。核心操作：`push`、`pop`、`peek`。

```javascript
// 栈的实现
const stack = []
stack.push(1)    // 入栈
stack.push(2)
stack.pop()      // 出栈 → 2
stack.at(-1)     // 查看栈顶 → 1
```

### 队列 (Queue)
**先进先出 (FIFO)**。核心操作：`enqueue`、`dequeue`。

```javascript
// 队列的实现
const queue = []
queue.push(1)     // 入队
queue.push(2)
queue.shift()     // 出队 → 1
```

## 树形结构

### 二叉树
每个节点最多两个子节点（left、right）。

**遍历方式：**
| 方式 | 顺序 | 典型应用 |
|------|------|---------|
| 前序 | 根 → 左 → 右 | 序列化、表达式求值 |
| 中序 | 左 → 根 → 右 | BST 排序输出 |
| 后序 | 左 → 右 → 根 | 删除树、后序遍历 |
| 层序 | 逐层遍历 | BFS、最短路径 |

```typescript
// 二叉树节点
class TreeNode<T> {
  constructor(
    public val: T,
    public left: TreeNode<T> | null = null,
    public right: TreeNode<T> | null = null
  ) {}
}

// 前序遍历 (递归)
function preorder<T>(root: TreeNode<T> | null): T[] {
  if (!root) return []
  return [root.val, ...preorder(root.left), ...preorder(root.right)]
}

// 层序遍历 (BFS)
function levelOrder<T>(root: TreeNode<T> | null): T[][] {
  if (!root) return []
  const result: T[][] = []
  const queue = [root]
  while (queue.length) {
    const level: T[] = []
    const len = queue.length
    for (let i = 0; i < len; i++) {
      const node = queue.shift()!
      level.push(node.val)
      if (node.left) queue.push(node.left)
      if (node.right) queue.push(node.right)
    }
    result.push(level)
  }
  return result
}
```

### 二叉搜索树 (BST)
左子树 < 根节点 < 右子树。

- 查找、插入、删除平均 **O(log n)**
- 最坏情况（退化成链表）**O(n)**
- **解决方案**：平衡二叉树（AVL、红黑树）

```typescript
class BST<T> {
  // 查找
  search(node: TreeNode<T> | null, val: T): boolean {
    if (!node) return false
    if (val === node.val) return true
    return val < node.val
      ? this.search(node.left, val)
      : this.search(node.right, val)
  }

  // 插入
  insert(node: TreeNode<T> | null, val: T): TreeNode<T> {
    if (!node) return new TreeNode(val)
    if (val < node.val) node.left = this.insert(node.left, val)
    else node.right = this.insert(node.right, val)
    return node
  }
}
```

::: tip
Java 的 `TreeMap`、C++ 的 `std::map` 都是红黑树（平衡 BST）实现。Python 的 `dict` 是哈希表，集合操作通常用哈希表。
:::

### 堆 (Heap)
完全二叉树，用于优先队列。

| 类型 | 特点 |
|------|------|
| 大顶堆 | 根节点最大，每个父节点 ≥ 子节点 |
| 小顶堆 | 根节点最小，每个父节点 ≤ 子节点 |

- 插入：**O(log n)**
- 删除堆顶：**O(log n)**
- 获取最值：**O(1)**

```python
import heapq

# 小顶堆
heap = []
heapq.heappush(heap, 3)
heapq.heappush(heap, 1)
heapq.heappush(heap, 2)
heapq.heappop(heap)  # → 1

# 大顶堆 (通过取负数实现)
heap = []
heapq.heappush(heap, -3)
heapq.heappush(heap, -1)
-heapq.heappop(heap)  # → 3
```

## 哈希表

键值映射结构，平均 **O(1)** 的查找、插入、删除。

```javascript
const map = new Map()
map.set('name', 'Alice')
map.get('name')     // "Alice"
map.has('name')     // true
map.delete('name')

const set = new Set([1, 2, 3, 2, 1])
// Set { 1, 2, 3 } — 自动去重
```

**冲突解决：**
| 方法 | 说明 |
|------|------|
| 链地址法 | 每个槽维护一个链表，冲突的元素链在一起 |
| 开放寻址法 | 遇到冲突则寻找下一个空槽 |

::: tip
哈希表的关键是**哈希函数**的设计——好的哈希函数让元素分布均匀，减少冲突。
:::

## 图结构

| 分类 | 说明 |
|------|------|
| 有向图 / 无向图 | 边是否有方向 |
| 加权图 / 无权图 | 边是否有权重 |
| 连通图 / 非连通图 | 任意两点是否有路径 |

**存储方式：**
| 方式 | 空间 | 适用场景 |
|------|------|---------|
| 邻接矩阵 | O(V²) | 稠密图，快速判断边是否存在 |
| 邻接表 | O(V+E) | 稀疏图，遍历相邻节点 |

---

*持续更新中...*
