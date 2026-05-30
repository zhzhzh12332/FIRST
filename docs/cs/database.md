# 数据库

数据库是存储、管理和检索数据的系统。关系型数据库是主流，NoSQL 是重要补充。

## 关系型数据库 (SQL)

### SQL 分类

| 分类 | 用途 | 命令举例 |
|------|------|---------|
| DDL (数据定义) | 定义数据结构 | `CREATE`、`ALTER`、`DROP` |
| DML (数据操作) | 增删改查 | `SELECT`、`INSERT`、`UPDATE`、`DELETE` |
| DCL (数据控制) | 权限管理 | `GRANT`、`REVOKE` |
| TCL (事务控制) | 事务管理 | `BEGIN`、`COMMIT`、`ROLLBACK` |

```sql
-- 表创建
CREATE TABLE users (
    id      BIGINT PRIMARY KEY AUTO_INCREMENT,
    name    VARCHAR(100) NOT NULL,
    email   VARCHAR(255) UNIQUE NOT NULL,
    age     INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 查询
SELECT u.name, o.total
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.total > 100
  AND u.age >= 18
ORDER BY o.total DESC
LIMIT 10;

-- 聚合查询
SELECT u.name, COUNT(o.id) as order_count, SUM(o.total) as total_amount
FROM users u
LEFT JOIN orders o ON u.id = o.user_id
GROUP BY u.id, u.name
HAVING COUNT(o.id) > 5;
```

### 索引

| 索引类型 | 特点 | 适用场景 |
|---------|------|---------|
| B+ 树索引 | 有序、支持范围查询 | 大多数场景 |
| 哈希索引 | O(1) 精确匹配 | 等值查询，如缓存 |
| 全文索引 | 关键词搜索 | 搜索引擎 |
| 空间索引 | GIS 数据 | 地理位置查询 |
| 位图索引 | 枚举值少的列 | 数据仓库、性别/状态 |

**索引优化原则：**
1. 选择性高的列优先建索引（区分度大）
2. 避免在索引列上使用函数或运算
3. 联合索引注意最左匹配原则
4. 覆盖索引可避免回表，性能最佳
5. 索引不是越多越好（影响写入性能）

### 事务与 ACID

| 特性 | 含义 | 实现方式 |
|------|------|---------|
| **A**tomicity (原子性) | 要么全做，要么全不做 | Undo Log |
| **C**onsistency (一致性) | 数据始终满足约束 | 应用 + 数据库约束 |
| **I**solation (隔离性) | 并发事务互不干扰 | 锁 + MVCC |
| **D**urability (持久性) | 提交后不会丢失 | Redo Log |

**隔离级别对比：**

| 级别 | 脏读 | 不可重复读 | 幻读 | 实现 |
|------|:----:|:---------:|:----:|------|
| 读未提交 | ✅ **可能** | ✅ | ✅ | 无锁 |
| 读已提交 | ❌ | ✅ | ✅ | 行锁 (读不加锁) |
| 可重复读 | ❌ | ❌ | ✅ **可能** | MVCC + 间隙锁 |
| 串行化 | ❌ | ❌ | ❌ | 表级锁/谓词锁 |

::: tip MySQL InnoDB 默认隔离级别是**可重复读**，通过 MVCC 实现非锁定读，结合间隙锁防止幻读。
:::

### 三大范式

| 范式 | 要求 |
|------|------|
| 1NF | 列不可再分（原子性）|
| 2NF | 非主键列完全依赖于主键（消除部分依赖）|
| 3NF | 非主键列不依赖于其他非主键列（消除传递依赖）|

::: warning
不要盲目追求高范式，在实际项目中适当**反范式化**（冗余字段、预聚合）可以提高查询性能。
:::

## NoSQL

| 类型 | 代表 | 数据模型 | 适用场景 |
|------|------|---------|---------|
| 键值 (Key-Value) | **Redis** | 键值对 | 缓存、会话、计数器 |
| 文档 (Document) | **MongoDB** | JSON 文档 | 灵活 Schema、日志 |
| 列族 (Column-Family) | **Cassandra** | 列族 | 时序数据、大数据写 |
| 图 (Graph) | **Neo4j** | 节点 + 边 | 社交网络、推荐 |

```bash
# Redis 常用命令
SET user:1 '{"name":"Alice"}'
GET user:1
EXPIRE session:abc 3600    # 设置过期时间
LPUSH queue task1          # 列表操作
SADD tags:js "javascript"   # 集合操作
```

## 数据库优化策略

### 读写分离
```
主库 (Master) — 处理写入
    ↓ 异步复制
从库 (Slave) — 处理读取（多个从库分散读压力）
```

### 慢查询优化流程
1. 开启慢查询日志（`slow_query_log`）
2. 使用 `EXPLAIN` 分析查询计划
3. 关注 `type`（ALL 全表扫描要优化）、`rows`（扫描行数）
4. 添加合适的索引
5. 考虑 SQL 改写或分表

### 分库分表
当单表数据量过大（建议 MySQL 不超过 500万-1000万行），考虑：
- **水平拆分**：按 ID 范围/哈希分表（如 user_0 ~ user_15）
- **垂直拆分**：按业务分库（用户库、订单库、商品库）

---

*持续更新中...*
