# vant-starter-kit

基于 **Vite+** 工具链的现代化移动端 H5 应用快速启动模板。集成 Vue 3.6、Vant 4、Tailwind CSS v4、Pinia、Alova、Nitro 全栈能力，开箱即用。

> 👀 **Vue 3.6 RC** — 已升级至 `3.6.0-rc.1`，Vapor Mode（下一代无 Virtual DOM 编译模式）作为前瞻特性可用，等待正式版发布和生态成熟后全面启用。

## ✨ 特性

- ⚡ **Vite+ 工具链** — 基于 Vite+ 的统一工具链，内置 oxlint/oxfmt 代码检查与格式化、Vitest 测试、tsdown 构建
- 🎯 **Vue 3.6** — Composition API + `<script setup>`，已升级至 RC 版本，为 Vapor Mode 做好准备
- 📱 **Vant 4** — 移动端 UI 组件库，自动导入组件
- 🎨 **Tailwind CSS v4** — 原子化 CSS，自定义主题配置
- 🗂️ **文件系统路由** — `vue-router/auto-routes` + `vite-plugin-vue-layouts-next` 布局系统
- 📡 **Alova 请求策略** — 基于 Alova 的 HTTP 客户端，统一业务码拦截、缓存策略
- 🏪 **Pinia 状态管理** — Composition API 风格的 Store
- 🌐 **Nitro 全栈** — 内置 Nitro 服务端，支持 SQLite 数据库开发 API
- 📅 **Day.js** — 国际化日期处理，预配中文 locale 和常用格式化
- 🔐 **认证体系** — 登录/登出、JWT Token 管理、未授权拦截
- 📐 **三种布局** — 移动端默认布局、数据大屏布局、管理后台布局
- 🔧 **TypeScript 严格模式** — `noUncheckedIndexedAccess` 增强安全性

## 👀 Vapor Mode 前瞻（Vue 3.6）

[Vapor Mode](https://vuejs.org/guide/extras/vapor-mode) 是 Vue 3.6 引入的全新编译模式，**逐组件 opt-in**，通过编译期优化直接操作 DOM，移除 Virtual DOM 运行时。在第三方基准测试中已达到与 Solid / Svelte 5 同级的性能表现。

### 当前状态

| 状态             | 说明                                              |
| ---------------- | ------------------------------------------------- |
| Vue 版本         | `3.6.0-rc.1`（RC 阶段，正在向正式版推进）         |
| Vapor 运行时     | ✅ 已内置，源码附带 `vue.runtime-with-vapor`       |
| `@vitejs/plugin-vue` | ✅ `6.0.8` 已支持 `features.vapor` 和 `<script setup vapor>` |
| 构建工具链       | ✅ 已就绪，无需额外配置                            |
| **UI 组件库**    | ⏳ **Vant 4 尚未正式支持 Vapor Mode，等待生态跟进** |

### 策略建议

当前阶段 **保持 VDOM 模式开发**，后续逐步观望：

1. **等待 Vue 3.6 正式版发布** — RC 到正式版可能有行为调整
2. **等待 UI 组件库（Vant）全面支持** — Vapor 与 VDOM 互操作可行，但会引入 VDOM 运行时，抵消体积优势
3. **保持代码风格兼容** — 坚持 Composition API + `<script setup>`，这是 Vapor 支持的子集，未来迁移成本最低
4. **关注进展** — 了解 Vapor Mode 概念和 API，时机成熟时可先在纯展示组件中试点

> 💡 保持 Composition API + `<script setup>` 风格开发，后续迁移到 Vapor Mode 只需添加 `vapor` 关键字，改造成本极低。

### 启用方式（参考）

当条件成熟时，在组件上添加 `vapor` 关键字即可启用：

```vue
<script setup vapor lang="ts">
const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

## 🤖 AI 辅助开发（Skills）

本项目推荐使用 **ZCode / Claude Code / Copilot CLI** 等 AI 编程助手进行开发，并在开发过程中充分调用相关 **Skills** 以获得最佳实践指导。

开发前务必调用相关 Skill：

| 场景               | 推荐 Skill                     | 作用                             |
| ------------------ | ------------------------------ | -------------------------------- |
| Vue 组件开发       | `vue-best-practices`           | Composition API、SFC 规范        |
| Vue 路由           | `vue-router-best-practices`    | 路由守卫、参数传递、布局集成     |
| 状态管理           | `pinia`                        | Store 设计、SSR 兼容             |
| 组件测试           | `vue-testing-best-practices`   | Vitest + Vue Test Utils 模式     |
| 构建配置           | `vite`                         | Vite+ / Rolldown 配置            |
| 测试运行           | `vitest`                       | 编写和运行测试                   |
| 包管理             | `pnpm`                         | workspace / catalog 协议         |
| 设计审核           | `web-design-guidelines`        | UI 可访问性、响应式、UX 审查     |

详细开发约定请查看 [`AGENTS.md`](./AGENTS.md)。

## 技术栈

| 类别          | 技术                                                                |
| ------------- | ------------------------------------------------------------------- |
| 构建工具      | [Vite+](https://viteplus.dev/) (v0.2.5)                             |
| 框架          | [Vue 3.6 RC](https://vuejs.org/)（Composition API, `<script setup>`）|
| 编译模式      | VDOM（标准）— [Vapor Mode](https://vuejs.org/guide/extras/vapor-mode) 已就绪，等待生态成熟后启用 |
| UI 库         | [Vant 4](https://vant-ui.github.io/)                                |
| 状态管理      | [Pinia](https://pinia.vuejs.org/)                                   |
| 路由          | [Vue Router 5](https://router.vuejs.org/) + 文件系统路由            |
| HTTP 请求     | [Alova](https://alova.js.org/) + Axios 适配器                       |
| CSS           | [Tailwind CSS v4](https://tailwindcss.com/)                         |
| 服务端        | [Nitro](https://nitro.unjs.io/) (全栈/SSR)                          |
| 日期处理      | [Day.js](https://day.js.org/)                                       |
| 语言          | [TypeScript](https://www.typescriptlang.org/) 6.x                   |
| 包管理        | [pnpm](https://pnpm.io/) 11.x                                       |

## 快速开始

### 前置要求

- Node.js >= 24.18.0
- pnpm >= 11.14.0

### 安装与启动

```bash
# 克隆项目
git clone <repo-url> vant-starter-kit
cd vant-starter-kit

# 安装依赖（使用 Vite+ 统一 CLI）
vp install

# 复制环境变量文件
cp .env.example .env

# 启动开发服务器
vp dev

# 访问 http://localhost:5173
```

### 生产构建

```bash
vp build
vp preview
```

## 项目结构

```
├── build/                      # Vite+ 插件组合
│   ├── index.ts               # 插件入口，条件组合
│   └── plugins/
│       ├── vue.ts             # Vue 生态插件组
│       ├── nitro.ts           # Nitro 服务端集成
│       ├── tailwindcss.ts     # Tailwind CSS v4
│       └── https-reverse-proxy.ts  # HTTPS 反向代理
├── server/                     # Nitro 服务端 API
│   └── api/                   # 接口文件 (defineHandler)
├── src/
│   ├── api/                   # HTTP 请求层
│   │   ├── index.ts           # Alova 实例
│   │   └── methods/           # API 方法模块
│   ├── components/            # 组件
│   ├── composables/           # 组合式函数
│   ├── layouts/               # 布局系统
│   │   ├── default/           # 移动端默认布局
│   │   ├── screen/            # 数据大屏布局
│   │   └── admin/             # 管理后台布局
│   ├── pages/                 # 路由页面
│   ├── plugins/               # 插件配置
│   │   └── dayjs.ts           # Day.js 配置
│   ├── stores/                # 状态管理
│   │   ├── index.ts           # Pinia 初始化
│   │   └── auth.ts            # 认证 Store
│   └── styles/                # 全局样式
│       └── index.css          # Tailwind CSS 入口
├── types/                     # 类型定义 (#types)
│   ├── api/                   # API 类型
│   └── automatics/            # 自动生成类型
├── vite.config.ts             # Vite+ 配置
└── nitro.config.ts            # Nitro 配置
```

## 可用命令

项目使用 **Vite+** 工具链，所有操作通过 `vp` CLI 统一管理：

| 命令           | 说明                                     |
| -------------- | ---------------------------------------- |
| `vp dev`       | 启动开发服务器                           |
| `vp build`     | 生产构建（`tsc && vp build`）            |
| `vp preview`   | 预览生产构建                             |
| `vp check`     | 格式化 + 代码检查 + 类型检查             |
| `vp test`      | 运行测试                                 |
| `vp install`   | 安装依赖                                 |
| `vp run <script>` | 运行 `package.json` 中的脚本         |
| `vp env doctor`   | 诊断环境问题                         |

> `package.json` 中同时保留了 `pnpm dev/build/preview` 等脚本，通过 `pnpm` 运行本质也是调用 `vp` 命令。

## 布局系统

项目包含三种布局，通过 `definePage` 指定：

```vue
<script setup lang="ts">
definePage({
  meta: {
    layout: 'admin/index', // 或 'default/index', 'screen/index'
  },
});
</script>
```

| 布局     | 路径                   | 说明                                       |
| -------- | ---------------------- | ------------------------------------------ |
| 默认布局 | `src/layouts/default/` | 移动端 H5 风格，含粘性导航栏和底部 Tabbar  |
| 大屏布局 | `src/layouts/screen/`  | 数据监控大屏，深色主题，支持全屏和实时时钟 |
| 管理后台 | `src/layouts/admin/`   | 管理后台，含可折叠侧边栏和顶部导航栏       |

## 环境变量

参见 `.env.example` 和 `.env.development`。

| 变量                | 说明               | 默认值        |
| ------------------- | ------------------ | ------------- |
| `VITE_API_BASE_URL` | API 基础路径       | `/api`        |
| `VITE_TCC_APP_ID`   | 腾讯云 IM 应用 ID  | —             |
| `VITE_ALLOWED_HOST` | 允许的 Host 域名   | —             |
| `VITE_PROXY_TARGET` | HTTPS 反向代理目标 | —             |
| `VITE_PUBLIC_PATH`  | 应用基础路径       | `/`           |
| `VITE_ENV_NAME`     | 环境名称           | `development` |

## 服务端 API

项目使用 [Nitro](https://nitro.unjs.io/) 提供服务端能力，API 文件放在 `server/api/` 目录下：

```typescript
// server/api/users.ts
import { defineHandler } from 'nitro';
import { useDatabase } from 'nitro/database';

export default defineHandler(async () => {
  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM users`;
  return { code: 0, message: 'success!', data: rows };
});
```

内置 SQLite 数据库支持，无需额外配置即可开发 API。

## 许可证

[MIT](LICENSE)
