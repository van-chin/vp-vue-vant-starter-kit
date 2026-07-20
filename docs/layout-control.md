# Layout Header/Footer 显隐控制方案

> 文档日期：2026-07-18

---

## 背景需求

H5 应用中的部分页面可能：

1. **嵌入到小程序 / APP 的 WebView** — 宿主通过 URL query 控制是否展示 Header/Footer
2. **从应用内部导航进入** — 使用 `definePage` meta 中声明的默认值
3. **受到用户权限影响** — 某些角色不可见 Footer 或 Header

需要一个统一的、可扩展的机制来管理这三种场景。

---

## 整体架构

```
                         ┌─ query 参数（?showHeader=0）— webview 嵌入
                         │
  definePage meta ───────┼─→ useLayoutConfig ──→ layout v-if
   (页面声明默认值)       │
                         └─ permissionCheck — 权限限制，只减不增
```

**优先级（高 → 低）：**

| 层级 | 来源              | 场景         | 特点                              |
| ---- | ----------------- | ------------ | --------------------------------- |
| 1    | URL query         | WebView 嵌入 | 宿主 APP 通过 URL 参数控制        |
| 2    | `definePage meta` | 内部导航     | 页面声明的默认行为                |
| 3    | composable 默认值 | 全局兜底     | `defaultHeader` / `defaultFooter` |
| 4    | permissionCheck   | 权限限制     | **只减不增**，不能越权显示        |

---

## 核心实现

### 1. TypeScript 类型扩展（`env.d.ts`）

```ts
declare module 'vue-router' {
  interface RouteMeta {
    /** 是否展示 layout 头部导航栏（默认 true） */
    showHeader?: boolean;
    /** 是否展示 layout 底部导航栏（默认 true） */
    showFooter?: boolean;
  }
}
```

让 `definePage` 和 `route.meta` 都能获得类型提示。

### 2. Composable（`src/composables/useLayoutConfig.ts`）

```ts
import { computed } from 'vue';
import { useRoute } from 'vue-router';

export interface LayoutConfigOptions {
  defaultHeader?: boolean;
  defaultFooter?: boolean;
  permissionCheck?: (component: 'header' | 'footer') => boolean;
}

export function useLayoutConfig(options: LayoutConfigOptions = {}) {
  const route = useRoute();
  const { defaultHeader = true, defaultFooter = true, permissionCheck } = options;

  // ── 1. definePage meta ──
  const metaShowHeader = computed(() => route.meta.showHeader ?? defaultHeader);
  const metaShowFooter = computed(() => route.meta.showFooter ?? defaultFooter);

  // ── 2. Query 参数覆盖（webview 嵌入场景） ──
  const queryShowHeader = computed<boolean | undefined>(() => {
    if (route.query.showHeader === '1') return true;
    if (route.query.showHeader === '0') return false;
    return undefined;
  });
  const queryShowFooter = computed<boolean | undefined>(() => {
    if (route.query.showFooter === '1') return true;
    if (route.query.showFooter === '0') return false;
    return undefined;
  });

  // ── 3. 合并：query > meta > default ──
  const resolvedShowHeader = computed(() => queryShowHeader.value ?? metaShowHeader.value);
  const resolvedShowFooter = computed(() => queryShowFooter.value ?? metaShowFooter.value);

  // ── 4. 权限限制（只能进一步隐藏） ──
  const showHeader = computed(() => {
    if (!resolvedShowHeader.value) return false;
    if (permissionCheck && !permissionCheck('header')) return false;
    return true;
  });

  const showFooter = computed(() => {
    if (!resolvedShowFooter.value) return false;
    if (permissionCheck && !permissionCheck('footer')) return false;
    return true;
  });

  return { showHeader, showFooter };
}
```

关键设计：

- **所有值都是 `computed`** — 响应式，query 变化时自动重新计算
- **query 参数只有显式传递时才覆盖** — `?showHeader=1` / `?showHeader=0` 有效，不传则走下层
- **permissionCheck 只减不增** — 如果 query 或 meta 已经决定隐藏，权限无法再显示

### 3. Layout 中使用（`src/layouts/default.vue`）

```vue
<template>
  <div class="...">
    <DefaultHeader v-if="showHeader" />
    <main>
      <router-view />
    </main>
    <DefaultFooter v-if="showFooter" />
  </div>
</template>

<script setup lang="ts">
const { showHeader, showFooter } = useLayoutConfig({
  permissionCheck: (component) => {
    // 示例：只有登录用户才显示 Footer
    const authStore = useAuthStore();
    if (component === 'footer') return authStore.isLoggedIn;
    return true;
  },
});
</script>
```

由于 `src/composables/` 已配置为**自动导入**，`useLayoutConfig` 无需手动 `import`。

### 4. 页面声明默认值（`src/pages/good.vue`）

```ts
definePage({
  meta: {
    layout: 'default',
    showHeader: false, // 本页面默认不展示 Header
    showFooter: true, // 本页面默认展示 Footer
  },
});
```

---

## 场景示例

### 场景 A：WebView 嵌入

宿主 APP 通过 iframe/webview 加载 URL：

```
/good?showHeader=0&showFooter=0
```

- query 优先级最高 → Header 和 Footer 均隐藏
- 不影响其他页面的行为

### 场景 B：应用内部导航

用户通过菜单点击进入 `/good`：

- 没有 query 参数 → 走 `definePage meta` → `showHeader: false`, `showFooter: true`
- 行为由页面声明决定

### 场景 C：权限限制

某页面 `definePage` 声明 `showFooter: true`，但当前用户未登录：

- query 未设置 → 走 meta → `showFooter: true`
- `permissionCheck('footer')` 返回 `false` → `showFooter` 最终为 `false`
- Footer 隐藏

### 场景 D：动态控制（非 WebView）

如果页面内有开关控制 Header 显隐，可以通过 `route.query` 的替换实现：

```ts
// 在页面组件中
const updateVisibility = (show: boolean) => {
  router.replace({
    query: {
      ...route.query,
      showHeader: show ? '1' : '0',
    },
  });
};
```

由于 `useLayoutConfig` 响应式依赖 `route.query`，变化后自动生效。

---

## 方案演进对照

| 方案                        | 优点                           | 缺点                                    | 适用场景     |
| --------------------------- | ------------------------------ | --------------------------------------- | ------------ |
| ❌ Layout 直接读 query      | 简单                           | 所有逻辑耦合在 layout 中，难扩展        | 小型项目     |
| ❌ Provide / Inject         | 灵活                           | 每个页面都要 provide，样板代码多        | 页面主动控制 |
| ❌ Router beforeEach        | 居中                           | 侵入路由守卫，query → meta 的转换不直观 | 全局规则     |
| ✅ **Composable（本方案）** | 声明式、响应式、可扩展、可测试 | 无                                      | **推荐**     |

---

## 扩展建议

### 按页面注册权限规则

如果权限规则因页面而异，可以通过 composable 参数传入：

```ts
// src/pages/good.vue
const { showFooter } = useLayoutConfig({
  permissionCheck: (component) => {
    if (component === 'footer') return userStore.hasPagePermission('good.footer');
    return true;
  },
});
```

但注意：这样需要在页面内创建 composable 实例并通过 provide/inject 传递给 layout。如果只有少数几个特例页面，可以在这些页面内 provide，layout 内 inject：

```ts
// 特例页面
provide('layoutPermissionCheck', (component: 'header' | 'footer') => {
  return checkSomeSpecialRule(component);
});

// layout
const injectedCheck = inject<((c: 'header' | 'footer') => boolean) | undefined>(
  'layoutPermissionCheck',
  undefined,
);
const { showHeader, showFooter } = useLayoutConfig({
  permissionCheck: injectedCheck ?? defaultCheck,
});
```

### 扩展更多控制项

`useLayoutConfig` 可以扩展支持更多 layout 配置项，如是否显示导航栏标题、是否透明等：

```ts
interface LayoutConfigOptions {
  showHeader?: boolean;
  showFooter?: boolean;
  transparentHeader?: boolean;
  headerTitle?: string;
  // ...
}
```

---

## 相关文件

| 文件                                 | 说明                                    |
| ------------------------------------ | --------------------------------------- |
| `src/composables/useLayoutConfig.ts` | 核心 composable 实现                    |
| `src/layouts/default.vue`            | 使用 composable 的 layout               |
| `env.d.ts`                           | RouteMeta 类型扩展                      |
| `src/pages/*.vue`                    | 各页面通过 `definePage meta` 声明默认值 |

---

## 自定义 Header / Footer 替换方案

### 需求场景

某些页面不想用 Layout 的默认 Header/Footer，而是用自己的组件：

- 页面 A 隐藏默认 Footer，用一个 `CheckoutFooter`（含结算按钮）
- 页面 B 隐藏默认 Header，用一个 `ArticleHeader`（含返回 + 分享）
- 页面 C 在 **WebView 嵌入**时隐藏所有头部底部，内部导航时又恢复

### 方案：Provide / Inject 组件替换

Layout 通过 `provide` 暴露注册函数，页面通过 `inject` + `useCustomFooter / useCustomHeader` 注册自己的组件。

#### 数据流

```
Layout (default.vue)
  │  provide('layout:register-footer', setCustomFooter)
  │  provide('layout:register-header', setCustomHeader)
  │
  ├── <component :is="activeHeader" />
  ├── <router-view />
  │     │
  │     └── 页面组件
  │           │  useCustomFooter(MyFooter)
  │           │  inject → register(MyFooter)
  │           │  → layout 的 activeFooter 变为 MyFooter
  │           │
  │           └── 页面卸载时自动 register(null) → 恢复默认
  │
  └── <component :is="activeFooter" />
```

#### Layout 端（`src/layouts/default.vue`）

```vue
<template>
  <div class="...">
    <!-- 用 <component :is> 替代直接引用 -->
    <component :is="activeHeader" v-if="activeHeader" />
    <main>
      <router-view />
    </main>
    <component :is="activeFooter" v-if="activeFooter" />
  </div>
</template>

<script setup lang="ts">
import DefaultHeader from './default/components/header.vue';
import DefaultFooter from './default/components/footer.vue';

const { showHeader, showFooter } = useLayoutConfig();

// 暴露自定义能力，返回当前生效的组件
const { activeHeader, activeFooter } = useLayoutProvider(
  DefaultHeader, // 默认 Header
  DefaultFooter, // 默认 Footer
  { showHeader, showFooter },
);
</script>
```

#### 页面端

**替换 Footer（同步组件）：**

```ts
// src/pages/checkout.vue
import MyFooter from './components/MyFooter.vue';

useCustomFooter(MyFooter);
```

**替换 Header（异步 import，自动 code splitting）：**

```ts
// src/pages/article.vue
useCustomHeader(() => import('./components/ArticleHeader.vue'));
```

#### 组合使用

```ts
// 同时替换 Header 和 Footer
useCustomHeader(CustomHeader);
useCustomFooter(CustomFooter);
```

### 和 showFooter 的关系

| 状态                                         | 行为                                                   |
| -------------------------------------------- | ------------------------------------------------------ |
| `showFooter=true` + 未调用 `useCustomFooter` | 显示默认 `DefaultFooter`                               |
| `showFooter=true` + 调用了 `useCustomFooter` | 显示自定义组件                                         |
| `showFooter=false`（query 或 meta）          | **不显示任何内容**（无论是否调用了 `useCustomFooter`） |
| 页面卸载                                     | 自动 `register(null)`，恢复默认 Footer                 |

### 实现原理：`useLayoutProvider` + Provide/Inject

关键代码（`src/composables/useLayoutCustomization.ts`）：

```ts
// Layout 侧：提供注册函数
provide('layout:register-footer', (comp) => {
  customFooter.value = comp;
});

// Layout 侧：计算最终渲染的组件
const activeFooter = computed(() => {
  if (!showFooter.value) return null; // 显隐控制优先
  return customFooter.value ?? DefaultFooter; // 自定义 ?? 默认
});
```

```ts
// 页面侧：注入注册函数，注册组件，卸载时自动清理
function useCustomFooter(component) {
  const register = inject('layout:register-footer');
  if (!register) return;

  register(markRaw(component));
  onUnmounted(() => register(null));
}
```

为什么不用全局状态（Pinia / module-level ref）？

| 方式                      | 问题                                                            |
| ------------------------- | --------------------------------------------------------------- |
| ✅ **Provide / Inject**   | 自动绑定到当前组件树，Layout 恰好是页面的祖先，注入链路天然成立 |
| ❌ Pinia store            | 需要手动清理，多页面并发时状态污染                              |
| ❌ Module-level singleton | 跨路由持久化，必须手动 reset，容易遗漏                          |
| ❌ Route meta             | meta 需要可序列化，不能存组件引用                               |

### 文件

| 文件                                        | 说明                               |
| ------------------------------------------- | ---------------------------------- |
| `src/composables/useLayoutCustomization.ts` | Provide / Inject 替换机制的实现    |
| `src/layouts/default.vue`                   | 使用 `useLayoutProvider` 的 layout |
| `src/pages/*.vue`                           | 使用 `useCustomHeader/Footer`      |
