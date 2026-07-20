# Layout 布局架构

> 文档日期：2026-07-20

---

## 一、整体结构

```
┌─────────────────────────────────────┐
│  <component :is="activeHeader" />   │  ← 固定顶部
│    useCustomHeader 可替换            │     不滚动
├─────────────────────────────────────┤
│                                     │
│  <main class="flex-1                 │  ← 内部滚动
│         overflow-y-auto">           │     overflow-y: auto
│    <router-view />                  │
│                                     │
├─────────────────────────────────────┤
│  <component :is="activeFooter" />   │  ← 固定底部
│    useCustomFooter 可替换            │     不滚动
└─────────────────────────────────────┘

        容器：h-screen flex-col overflow-hidden
```

核心：**容器固定视口高度，main 内部滚动，header/footer 自然排列不滚动。**

---

## 二、布局演进

### 阶段 1：文档流滚动（最初）

```html
<div class="min-h-screen flex-col">
  <header />
  <main class="flex-1" />
  <footer><van-tabbar fixed /></footer>
</div>
```

问题：

- 整个文档滚动，header 会滚走（sticky 勉强弥补）
- `van-tabbar` 默认 `position: fixed`，脱离 flex 流
- 需要硬编码 `padding-bottom: var(--van-tabbar-height)` 补偿

### 阶段 2：内部滚动 + fixed padding-bottom

```html
<div class="h-screen flex-col overflow-hidden">
  <header />
  <main class="flex-1 overflow-y-auto pb-tabbar" />
  <footer><van-tabbar fixed /></footer>
</div>
```

改进：

- `h-screen` 固定视口，只有 main 滚动
- header/footer 始终可见

问题：

- `van-tabbar` 仍然是 `position: fixed`，仍需 `padding-bottom` 补偿
- 自定义 Footer 高度不同时，`padding-bottom` 不匹配

### 阶段 3：内部滚动 + flex 自然流（当前✅）

```html
<div class="h-screen flex-col overflow-hidden">
  <component :is="activeHeader" v-if="activeHeader" />
  <main class="flex-1 overflow-y-auto" />
  <component :is="activeFooter" v-if="activeFooter" />
  <!-- van-tabbar :fixed="false"，回归自然流 -->
</div>
```

```
DefaultFooter (van-tabbar, 高 50px)
    h-screen
    ├── header    高 46px
    ├── main      高 calc(100vh - 46px - 50px)  ← flex-1 自动计算
    └── footer    高 50px                         ← 自然流占位

CustomFooter (TestFooter, 高 80px)
    h-screen
    ├── header    高 46px
    ├── main      高 calc(100vh - 46px - 80px)  ← flex-1 自动适配
    └── footer    高 80px                         ← 自然流占位

showFooter=false
    h-screen
    ├── header    高 46px
    └── main      高 calc(100vh - 46px)          ← footer DOM 移除
```

**核心变化**：`van-tabbar :fixed="false"` → 回归正常文档流 → flex `flex-1` 自动分配剩余空间 → 不再需要任何 `padding-bottom` hack。

---

## 三、显隐控制：`useLayoutConfig`

### 优先级

```
URL query (?showHeader=0&showFooter=0)    ← 最高，WebView 嵌入
    ↓ 优先
definePage meta ({ showHeader: false })   ← 页面声明默认值
    ↓ 降级
composable 参数 ({ defaultHeader: true })  ← 全局兜底
    ↓ 限制
permissionCheck                            ← 只减不增
```

### Layout 中使用

```ts
// src/layouts/default.vue
const { showHeader, showFooter } = useLayoutConfig({
  permissionCheck: (component) => {
    const auth = useAuthStore();
    if (component === 'footer') return auth.isLoggedIn;
    return true;
  },
});
```

由于 `src/composables/` 已配置自动导入，无需手动 `import`。

### 页面声明默认值

```ts
// src/pages/good.vue
definePage({
  meta: {
    layout: 'default',
    showHeader: false,
    showFooter: true,
  },
});
```

### WebView 嵌入

```
/good?showHeader=0&showFooter=0
```

宿主 APP 通过 query 参数控制，layout 自动响应。

---

## 四、组件替换：`useLayoutCustomization`

### 数据流

```
Layout (default.vue)
  provide('layout:register-footer', setCustomFooter)  ← 暴露注册函数
  provide('layout:register-header', setCustomHeader)
  │
  ├── <component :is="activeHeader" />   ← 渲染当前 Header
  ├── <router-view />
  │     └── Page
  │           useCustomFooter(MyFooter)  ← 页面注册自定义组件
  │           → inject 获取 register
  │           → register(markRaw(MyFooter))
  │           → layout 的 activeFooter 变为 MyFooter
  │           → 页面卸载时自动 register(null) → 恢复默认
  │
  └── <component :is="activeFooter" />   ← 渲染当前 Footer
```

### 页面使用

**同步组件：**

```ts
import MyFooter from './components/MyFooter.vue';
useCustomFooter(MyFooter);
```

**异步 import（自动 code splitting）：**

```ts
useCustomHeader(() => import('./components/ArticleHeader.vue'));
```

**同时替换：**

```ts
useCustomHeader(CustomHeader);
useCustomFooter(CustomFooter);
```

### 替换 + 显隐的交互

| 状态                                         | 行为                                   |
| -------------------------------------------- | -------------------------------------- |
| `showFooter=true` + 未调用 `useCustomFooter` | 显示默认 `DefaultFooter`               |
| `showFooter=true` + 调用了 `useCustomFooter` | 显示自定义组件                         |
| `showFooter=false`（query 或 meta）          | **不显示任何内容**                     |
| 页面卸载                                     | 自动 `register(null)`，恢复默认 Footer |

---

## 五、Layout 完整代码

```vue
<!-- src/layouts/default.vue -->
<template>
  <div class="layout-default flex h-screen flex-col overflow-hidden bg-gray-50">
    <component :is="activeHeader" v-if="activeHeader" />
    <main class="flex-1 overflow-y-auto px-2">
      <router-view />
    </main>
    <component :is="activeFooter" v-if="activeFooter" />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from './default/components/header.vue';
import DefaultFooter from './default/components/footer.vue';

defineOptions({ name: 'LayoutDefault' });

const { showHeader, showFooter } = useLayoutConfig();
const { activeHeader, activeFooter } = useLayoutProvider(DefaultHeader, DefaultFooter, {
  showHeader,
  showFooter,
});
</script>
```

```vue
<!-- src/layouts/default/components/footer.vue -->
<template>
  <footer>
    <van-tabbar v-model="active" :fixed="false">
      <van-tabbar-item icon="home-o">首页</van-tabbar-item>
      <van-tabbar-item icon="list-switching">分类</van-tabbar-item>
      <van-tabbar-item icon="fire-o" badge="5">种草</van-tabbar-item>
      <van-tabbar-item icon="cart-o" badge="20">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact-o" badge="6">我的</van-tabbar-item>
    </van-tabbar>
  </footer>
</template>
```

`van-tabbar :fixed="false"` 是关键——利用 `h-screen flex-col` 布局保证其自然固定在视口底部，同时高度由 flex 自动处理。

---

## 六、测试

访问 `/test` 页面：

- Header 已被 `TestHeader` 替换（白底、返回按钮、清晰文字）
- Footer 已被 `TestFooter` 替换（含三个操作按钮）
- 点击 Footer 中的切换按钮，动态修改 `?showHeader=` 和 `?showFooter=` 参数
- 地址栏输入 `/test?showHeader=0&showFooter=0` 测试 WebView 嵌入场景
- 修改 TestFooter 的高度，main 区域自动适配，无需改任何代码

---

## 七、相关文件

| 文件                                        | 作用                                        |
| ------------------------------------------- | ------------------------------------------- |
| `src/layouts/default.vue`                   | 默认布局，容器 + 滚动 + 动态组件            |
| `src/layouts/default/components/header.vue` | 默认 Header（van-nav-bar）                  |
| `src/layouts/default/components/footer.vue` | 默认 Footer（van-tabbar，`:fixed="false"`） |
| `src/composables/useLayoutConfig.ts`        | 显隐控制 composable                         |
| `src/composables/useLayoutCustomization.ts` | 组件替换 composable（provide/inject）       |
| `env.d.ts`                                  | RouteMeta 类型扩展                          |
| `src/pages/test.vue`                        | 测试页面                                    |
| `src/pages/test/components/TestHeader.vue`  | 测试用自定义 Header                         |
| `src/pages/test/components/TestFooter.vue`  | 测试用自定义 Footer                         |
| `docs/layout-control.md`                    | 显隐控制详细文档                            |
