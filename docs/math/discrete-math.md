# 离散数学

离散数学是计算机科学特有的数学基础，研究**离散**而非连续的结构。

## 集合论

### 基本运算

| 运算 | 符号 | Python 代码 |
|------|:----:|------------|
| 并集 | $A \cup B$ | `A \| B` |
| 交集 | $A \cap B$ | `A & B` |
| 差集 | $A - B$ | `A - B` |
| 对称差 | $A \triangle B$ | `A ^ B` |
| 子集 | $A \subseteq B$ | `A <= B` |

```python
A = {1, 2, 3, 4}
B = {3, 4, 5, 6}

A | B   # {1, 2, 3, 4, 5, 6}
A & B   # {3, 4}
A - B   # {1, 2}
A ^ B   # {1, 2, 5, 6}
```

### 笛卡尔积
$$A \times B = \{(a,b) \mid a \in A, b \in B\}$$

```python
from itertools import product
list(product([1, 2], ['a', 'b']))
# [(1, 'a'), (1, 'b'), (2, 'a'), (2, 'b')]
```

## 图论

### 基本概念

**图的表示：**
| 方式 | 空间复杂度 | 查询边 | 遍历邻接点 |
|------|:---------:|:------:|:---------:|
| 邻接矩阵 | $O(V^2)$ | $O(1)$ | $O(V)$ |
| 邻接表 | $O(V+E)$ | $O(deg(v))$ | $O(deg(v))$ |

**图的分类：**
- 无向图 / 有向图
- 加权图 / 无权图
- 连通图 / 非连通图
- 完全图：任意两点之间都有边
- 二分图：顶点可分成两组，边只跨组不组内

### 树

**树的性质：**
- 无环连通图
- $|E| = |V| - 1$
- 任意两点间有唯一路径

**生成树：** 连通图的一个子图，包含所有顶点且是一棵树

**最小生成树 (MST)：** 权重和最小的生成树

```python
import heapq

# Prim 算法 — 最小生成树
def prim(graph, start):
    visited = {start}
    edges = [(weight, start, to) for to, weight in graph[start]]
    heapq.heapify(edges)
    mst = []

    while edges and len(visited) < len(graph):
        weight, frm, to = heapq.heappop(edges)
        if to not in visited:
            visited.add(to)
            mst.append((frm, to, weight))
            for next_to, w in graph[to]:
                if next_to not in visited:
                    heapq.heappush(edges, (w, to, next_to))
    return mst
```

### 最短路径

| 算法 | 适用场景 | 时间复杂度 |
|------|---------|:---------:|
| **Dijkstra** | 无负权边的单源最短路径 | $O(V \log V + E)$ |
| **Bellman-Ford** | 有负权边的单源最短路径 | $O(VE)$ |
| **Floyd-Warshall** | 所有节点对的最短路径 | $O(V^3)$ |
| **A\*** | 带启发式的最短路径 | $O(E)$（实际）|

## 数理逻辑

### 命题逻辑

| 连接词 | 符号 | 含义 |
|:------:|:----:|:----:|
| 非 | $\neg$ | 否定 |
| 且 | $\land$ | 合取 |
| 或 | $\lor$ | 析取 |
| 蕴含 | $\to$ | 如果...那么... |
| 等价 | $\leftrightarrow$ | 当且仅当 |

**常用推理规则：**
```
假言推理：  P → Q, P  ⇒  Q
拒取式：    P → Q, ¬Q  ⇒  ¬P
三段论：    P → Q, Q → R  ⇒  P → R
```

## 组合数学

| 概念 | 公式 | 说明 |
|:----:|------|------|
| 排列 | $P(n,k) = \frac{n!}{(n-k)!}$ | 从 n 个中选 k 个排列 |
| 组合 | $C(n,k) = \frac{n!}{k!(n-k)!}$ | 从 n 个中选 k 个组合 |
| 鸽巢原理 | $n$ 个物品放入 $m$ 个盒子，若 $n > m$，则至少有一个盒子有 2+ 个物品 |

::: tip
鸽巢原理看似简单，但有很多巧妙应用。如：367 人中至少 2 人生日相同。
:::

---

*持续更新中...*
