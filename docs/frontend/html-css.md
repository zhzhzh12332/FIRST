# HTML/CSS

前端三件套之二，负责页面的结构和样式表现。

## HTML5

### 语义化标签
使用语义化标签有助于 SEO 和可访问性。

```html
<body>
  <header>    <!-- 页眉 -->
    <nav>导航</nav>
  </header>
  <main>      <!-- 主内容 -->
    <article>  <!-- 独立内容 -->
      <section>章节</section>
    </article>
    <aside>侧边栏</aside>
  </main>
  <footer>页脚</footer>
</body>
```

### 表单增强

```html
<!-- HTML5 表单新特性 -->
<form>
  <input type="email" required placeholder="邮箱">
  <input type="tel" pattern="[0-9]{11}" placeholder="手机号">
  <input type="date" min="2024-01-01">
  <input type="range" min="0" max="100">
  <input type="color">
  <datalist id="browsers">
    <option value="Chrome">
    <option value="Firefox">
  </datalist>
</form>
```

## CSS

### 盒模型
```css
/* 推荐全局设置：border-box 更符合直觉 */
* {
  box-sizing: border-box;
}

/* 盒模型构成 */
.box {
  width: 200px;
  padding: 20px;    /* 内边距 */
  border: 2px solid #333;
  margin: 16px;     /* 外边距 */
}
```

### Flexbox — 一维布局
```css
.container {
  display: flex;
  justify-content: center;     /* 主轴对齐 */
  align-items: center;         /* 交叉轴对齐 */
  flex-wrap: wrap;             /* 换行 */
  gap: 16px;                   /* 间距 */
}

.item {
  flex: 1;                     /* 等分剩余空间 */
  /* 或固定宽度 */
  flex: 0 0 300px;
}
```

::: tip Flexbox 速记
- `justify-content` 控制主轴方向
- `align-items` 控制交叉轴方向
- `flex-wrap: wrap` 允许换行
- `gap` 设置间距（非常方便）
:::

### Grid — 二维布局
```css
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);  /* 3 等分 */
  grid-template-rows: auto 200px;
  gap: 20px;
}

/* 响应式：自动填充 */
.grid-auto {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

/* 定位 */
.item-hero {
  grid-column: 1 / -1;         /* 跨所有列 */
  grid-row: 1 / 3;
}
```

### 响应式设计

```css
/* 移动优先 — 从小屏开始写 */
.grid {
  grid-template-columns: 1fr;
}

/* 平板 */
@media (min-width: 768px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面 */
@media (min-width: 1024px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### CSS 动画与过渡

```css
/* 过渡 */
.button {
  background: #4f6ef7;
  transition: background 0.3s ease, transform 0.2s ease;
}
.button:hover {
  background: #3a56d4;
  transform: translateY(-1px);
}

/* 关键帧动画 */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-in {
  animation: fadeInUp 0.6s ease-out;
}
```

### 常见布局模式

```css
/* 圣杯布局 — 经典三栏 */
.holy-grail {
  display: grid;
  grid-template: auto 1fr auto / 200px 1fr 200px;
  min-height: 100vh;
}
.holy-grail header  { grid-column: 1 / -1; }
.holy-grail footer  { grid-column: 1 / -1; }

/* 居中 */
.centered {
  display: grid;
  place-items: center;    /* 一劳永逸的居中 */
  min-height: 100vh;
}

/* 粘性底部 */
.sticky-footer {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
.sticky-footer main {
  flex: 1;
}
```

---

*持续更新中...*
