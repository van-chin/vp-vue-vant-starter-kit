# HMR 与布局问题排查记录

> 文档日期：2026-07-18
> 涉及插件：vite-plugin-vue-layouts-next@^2.1.0、vue-router@^5.2.0

---

## 问题现象

1. 修改 `src/pages/` 下的页面文件，保存后布局丢失 (组件内容仍在，但布局包裹消失)
2. 修改 `src/pages/` 下的页面文件，保存后整个页面刷新，而非原地热更新

---

## 排查结论

### 涉及的两套 HMR 机制

每次页面文件保存会同时触发两条路径：

```
                        ┌─ vite-plugin-vue-layouts-next ──→ full-reload
文件保存 → Vite HMR 检测 ┤
                        └─ vue-router/auto-routes ───────→ 路由 HMR
```

### 路径 A：布局插件的 full-reload

`vite-plugin-vue-layouts-next` 在 `configureServer` 中注册了 chokidar watcher：

```js
watcher.on('change', async (path) => {
  updateVirtualModule(path);
});

const updateVirtualModule = (path) => {
  path = normalizePath(path);
  // 同时监听 pagesDirs 和 layoutsDirs！
  if (
    pagesDirs.length === 0 ||
    pagesDirs.some((dir) => path.startsWith(dir)) ||
    layoutsDirs.some((dir) => path.startsWith(dir))
  ) {
    reloadModule(moduleGraph.getModuleById(MODULE_ID_VIRTUAL));
    // → ws.send({ path, type: "full-reload" })
  }
};
```

当 `pagesDirs`（默认 `'src/pages'`）下的文件变化时，布局插件会：

1. 使虚拟模块 `virtual:generated-layouts` 失效
2. 通过 WebSocket 发送 `full-reload` 给浏览器
3. 浏览器整个页面刷新

### 路径 B：Vue Router 5 的路由 HMR

`vue-router/auto-routes`（v5.2.0）在生成的模块中注册了 `import.meta.hot.accept`：

```js
if (import.meta.hot) {
  import.meta.hot.accept((mod) => {
    router.clearRoutes();
    for (const route of mod.routes) {
      router.addRoute(route); // 注意：mod.routes 是原始路由，未经 setupLayouts 包裹
    }
    router_hotUpdateCallback?.(mod.routes);
    router.replace({ ...route, name: undefined, matched: undefined, force: true });
  });
}
```

### 问题一：全量刷新（路径 A 覆盖路径 B）

布局插件的 `full-reload` 优先级更高，直接导致浏览器整体刷新。Vue Router 5 的路由 HMR 虽然也触发了，但来不及生效就被覆盖。

**结论**：`pagesDirs` 的监听是页面全量刷新的直接原因。页面文件变化应由 Vue Router 5 处理，布局插件不需要干涉。

### 问题二：布局丢失（路径 B 无布局包裹）

即使没有被 full-reload 覆盖（极短暂窗口），`handleHotUpdate` 使用的是 `mod.routes`（原始路由），`setupLayouts()` 只在模块初始化时调用了一次，热更新后布局信息丢失。

---

## 修复方案

### 修复一：停止布局插件监听页面文件

将 `pagesDirs` 设为不匹配实际页面的路径：

```ts
// build/plugins/vue.ts
Layouts({
  layoutsDirs: 'src/layouts',
  defaultLayout: 'default',
  pagesDirs: 'src/pages/_nonexistent_', // ← 避免 full-reload
  exclude: ['**/components/**'],
});
```

效果：

| 文件变化            | 布局插件 watcher               | 浏览器行为                       |
| ------------------- | ------------------------------ | -------------------------------- |
| `src/pages/*.vue`   | pagesDirs 不匹配 → 无操作      | Vue Router HMR，原地更新 ✅      |
| `src/layouts/*.vue` | layoutsDirs 匹配 → full-reload | 页面刷新（布局结构变化，合理）✅ |

### 修复二：HMR 时重新包裹布局

在 `handleHotUpdate` 回调中重新应用 `setupLayouts`：

```ts
// src/router/index.ts
if (import.meta.hot) {
  handleHotUpdate(router, (newRoutes: RouteRecordRaw[]) => {
    router.clearRoutes();
    for (const route of setupLayouts(newRoutes)) {
      router.addRoute(route);
    }
  });
}
```

---

## v3 路线图（未发布）

### 背景

GitHub README 中描述的功能对应的是尚未发布的 **v3** 版本（npm 最新版仍是 v2.1.0）。

### 相关变更

| 变更项           | v2.1.0                                                        | v3（未发布）                                          |
| ---------------- | ------------------------------------------------------------- | ----------------------------------------------------- |
| `pagesDirs` 选项 | 存在，默认 `'src/pages'`                                      | **移除**                                              |
| 页面发现与 HMR   | 布局插件通过 `pagesDirs` 监听页面的变化                       | 完全由 Vue Router 5 负责                              |
| 布局名归一化     | 不支持。key 是原始路径：`screen/index.vue` → `'screen/index'` | 支持 Nuxt 兼容归一化：`screen/index.vue` → `'screen'` |
| 布局插件职责     | 监听页面 + 布局文件变化                                       | **仅**监听和解析布局                                  |

### 与我们的修复的关系

| 我们的修复                                    | v3 原生行为                                       |
| --------------------------------------------- | ------------------------------------------------- |
| `pagesDirs: 'src/pages/_nonexistent_'`        | `pagesDirs` 选项被移除，不复存在                  |
| 布局文件 `screen.vue` / `admin.vue`（根层级） | 内置 Nuxt 归一化，`screen/index.vue` → `'screen'` |
| `handleHotUpdate` 回调重新包裹布局            | 页面 HMR 交 Vue Router 5 管理，插件不干涉         |

### 升级到 v3 时的注意事项

1. **移除 `pagesDirs` 配置**：v3 已无此选项
2. **布局文件结构**：目前的 `screen.vue` / `admin.vue` / `default.vue` 根层级结构在 v3 中完全兼容；如果用回 `screen/index.vue` 结构，v3 也会自动归一化到 `'screen'`
3. **`handleHotUpdate` 回调**：继续有效，Vue Router 5 的 HMR 接口不变
4. **`exclude: ['**/components/**']`**：继续有效，仍是必要配置

---

## 配置演进对照

```
v2.1.0 (当前)                           v3 (未发布)
──────────────────                      ──────────────────
Layouts({                               Layouts({
  layoutsDirs: 'src/layouts',              layoutsDirs: 'src/layouts',
  defaultLayout: 'default',                defaultLayout: 'default',
  pagesDirs: 'src/pages/_nonexistent_',  ← 移除
  exclude: ['**/components/**'],           exclude: ['**/components/**'],
})                                      })
```

---

## 参考

- [vite-plugin-vue-layouts-next GitHub](https://github.com/loicduong/vite-plugin-vue-layouts-next)
- [vue-router 5 自动路由](https://router.vuejs.org/guide/advanced/auto-routes.html)
- 插件源码：`node_modules/vite-plugin-vue-layouts-next/dist/index.mjs`
- Vue Router 源码：`node_modules/vue-router/dist/unplugin-D63tPTIf.mjs`
