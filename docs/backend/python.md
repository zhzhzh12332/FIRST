# Python

Python 以简洁优雅的语法和强大的生态，成为最受欢迎的编程语言之一。

## 语言特性

### 核心数据结构

```python
# 列表 — 有序可变
fruits = ['apple', 'banana', 'cherry']
fruits.append('date')
fruits[0]       # 'apple'
fruits[-1]      # 'date'（负数索引）

# 元组 — 有序不可变
point = (3, 4)
x, y = point    # 解构

# 字典 — 键值对
user = {'name': 'Alice', 'age': 25}
user.get('email', 'N/A')        # 安全取值
user.setdefault('role', 'user')  # 默认值

# 集合 — 无序唯一
tags = {'python', 'js', 'go'}
tags.add('rust')
```

### 推导式与生成器

```python
# 列表推导式 — Python 特色之一
squares = [x**2 for x in range(10)]
# [0, 1, 4, 9, 16, 25, 36, 49, 64, 81]

# 带条件
evens = [x for x in range(20) if x % 2 == 0]

# 字典推导式
square_map = {x: x**2 for x in range(5)}
# {0: 0, 1: 1, 2: 4, 3: 9, 4: 16}

# 生成器 — 惰性求值，省内存
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

fib = fibonacci()
[next(fib) for _ in range(10)]
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]
```

### 装饰器

```python
from functools import wraps
import time

# 计时装饰器
def timer(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        elapsed = time.perf_counter() - start
        print(f'{func.__name__} 耗时: {elapsed:.3f}s')
        return result
    return wrapper

@timer
def slow_function():
    time.sleep(1)
    return 'done'

# 带参数的装饰器
def retry(max_attempts=3):
    def decorator(func):
        @wraps(func)
        def wrapper(*args, **kwargs):
            for i in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if i == max_attempts - 1:
                        raise
                    print(f'重试 {i+1}/{max_attempts}: {e}')
            return None
        return wrapper
    return decorator

@retry(max_attempts=3)
def unstable_api_call():
    pass
```

## Web 框架

### FastAPI — 现代高性能 API

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional

app = FastAPI(title='My API')

# Pydantic 模型 — 自动校验和文档
class User(BaseModel):
    name: str
    email: str
    age: Optional[int] = None

@app.get('/api/users')
async def list_users(page: int = 1, size: int = 10):
    users = await db.find_users(skip=(page-1)*size, limit=size)
    return {'data': users, 'total': await db.count_users()}

@app.post('/api/users', status_code=201)
async def create_user(user: User):
    id = await db.insert_user(user)
    return {'id': id, **user.model_dump()}

@app.get('/api/users/{user_id}')
async def get_user(user_id: int):
    user = await db.find_user(user_id)
    if not user:
        raise HTTPException(status_code=404, detail='用户不存在')
    return user
```

| 特性 | FastAPI | Django | Flask |
|------|---------|--------|-------|
| 性能 | **极快**（Starlette） | 中等 | 慢 |
| 异步支持 | **原生** | 部分（ASGI） | 需插件 |
| 自动文档 | ✅ OpenAPI | 需 DRF | 需插件 |
| ORM | 无（可选 SQLAlchemy） | **内置 ORM** | 无 |
| 适用场景 | API 服务、微服务 | 大而全的 Web 应用 | 简单应用 |

### Django

```python
# models.py
from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    author = models.ForeignKey('auth.User', on_delete=models.CASCADE)

# views.py
from rest_framework import viewsets
from .models import Article
from .serializers import ArticleSerializer

class ArticleViewSet(viewsets.ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer
```

## 数据处理

```python
import pandas as pd
import numpy as np

# 读取数据
df = pd.read_csv('data.csv')

# 数据概览
df.head()           # 前 5 行
df.describe()       # 统计描述
df.info()           # 数据类型和缺失值

# 数据清洗
df.dropna()                         # 删除缺失值
df.fillna(df.mean())                # 填充均值
df[df['age'] > 0]                   # 过滤

# 分组聚合
result = df.groupby('category').agg({
    'sales': ['sum', 'mean'],
    'count': 'sum'
})

# 可视化
import matplotlib.pyplot as plt
df.plot(kind='bar', x='month', y='revenue')
plt.show()
```

---

*持续更新中...*
