<!--VITE PLUS START-->

# Using Vite+, the Unified Toolchain for the Web

This project is using Vite+, a unified toolchain built on top of Vite, Rolldown, Vitest, tsdown, Oxlint, Oxfmt, and Vite Task. Vite+ wraps runtime management, package management, and frontend tooling in a single global CLI called `vp`. Vite+ is distinct from Vite, and it invokes Vite through `vp dev` and `vp build`. Run `vp help` to print a list of commands and `vp <command> --help` for information about a specific command.

Docs are local at `node_modules/vite-plus/docs` or online at https://viteplus.dev/guide/.

## Review Checklist

- [ ] Run `vp install` after pulling remote changes and before getting started.
- [ ] Run `vp check` and `vp test` to format, lint, type check and test changes.
- [ ] Check if there are `vite.config.ts` tasks or `package.json` scripts necessary for validation, run via `vp run <script>`.
- [ ] If setup, runtime, or package-manager behavior looks wrong, run `vp env doctor` and include its output when asking for help.

<!--VITE PLUS END-->

# vant-starter-kit — 项目开发指南

## 技术栈

- **构建工具**: Vite+ (v0.2.5) — 基于 Vite 的统一工具链
- **框架**: **Vue 3.6 RC** (Composition API, `<script setup>`)
- **UI 库**: Vant 4 (移动端组件库)
- **状态管理**: Pinia
- **路由**: Vue Router 5 + 文件系统路由 + 布局系统
- **HTTP 请求**: Alova + Axios 适配器
- **CSS**: Tailwind CSS v4
- **服务端**: Nitro (全栈 / SSR)
- **日期**: Day.js (中文 locale 配置)
- **包管理**: pnpm 11.x (catalog 协议统一版本)
- **语言**: TypeScript 6.x, 严格模式 (`noUncheckedIndexedAccess`)

## 项目结构

```
├── build/                  # Vite+ 插件组合
│   ├── index.ts           # 插件入口，按环境条件组合插件
│   └── plugins/           # 各功能插件
│       ├── vue.ts         # Vue 核心插件组 (vue/vue-jsx/devtools/auto-import/components/router/layouts)
│       ├── nitro.ts       # Nitro 服务端集成
│       ├── tailwindcss.ts # Tailwind CSS v4
│       └── https-reverse-proxy.ts  # 开发环境 HTTPS 反向代理
├── server/                 # Nitro 服务端 API
│   └── api/               # 接口处理函数 (defineHandler)
├── src/
│   ├── api/               # 客户端 HTTP 请求层 (Alova)
│   │   ├── index.ts       # Alova 实例 (统一错误处理、业务码拦截)
│   │   └── methods/       # API 方法模块 (auth/tabs/im/oss)
│   ├── components/        # 组件
│   │   └── businesses/    # 业务组件
│   ├── composables/       # 组合式函数
│   │   ├── useEnv.ts      # 环境变量类型安全访问
│   │   ├── useLayoutConfig.ts  # 布局头尾显隐控制
│   │   ├── useLayoutCustomization.ts  # 布局组件替换 (provide/inject)
│   │   └── __tests__/     # (预留) 组合式函数测试
│   ├── layouts/           # 布局 (vite-plugin-vue-layouts-next)
│   │   ├── default/       # 移动端默认布局 (粘性头部 + tabbar)
│   │   ├── screen/        # 数据监控大屏布局 (深色主题 + 全屏)
│   │   └── admin/         # 管理后台布局 (可折叠侧边栏 + 导航栏)
│   ├── pages/             # 文件系统路由页面
│   ├── plugins/           # 插件配置
│   │   └── dayjs.ts       # Day.js 配置 (中文 locale、相对时间、UTC/时区)
│   ├── stores/            # Pinia 状态管理
│   │   ├── index.ts       # Pinia 初始化 (SSR 兼容)
│   │   └── auth.ts        # 认证 Store (登录/登出/JWT)
│   └── styles/            # 全局样式
│       └── index.css      # Tailwind CSS v4 入口 + 自定义主题
├── types/                 # 类型定义 (路径别名 #types)
│   ├── index.ts           # 统一导出
│   ├── api/               # API 相关类型 (response/auth/tab-items)
│   └── automatics/        # 自动生成类型 (auto-imports/components/typed-router)
├── vite.config.ts         # Vite+ 配置 (格式化/代码检查/路径别名)
├── nitro.config.ts        # Nitro 配置 (SQLite 数据库)
└── pnpm-workspace.yaml    # pnpm catalog 依赖版本定义
```

## 开发命令

```bash
vp install     # 安装依赖
vp dev          # 启动开发服务器
vp build        # 生产构建 (tsc + vp build)
vp preview      # 预览生产构建
vp check        # 格式化 + 代码检查 + 类型检查
vp test         # 运行测试
vp run <script> # 运行 package.json 中的脚本
vp env doctor   # 诊断环境问题
```

---

## 👀 Vapor Mode 前瞻

Vue 3.6 引入了 **Vapor Mode** — 一种全新的编译模式，移除 Virtual DOM 运行时，通过编译期优化直接操作 DOM，性能对标 Solid / Svelte 5，**逐组件 opt-in**。

### 当前阶段策略

项目已安装 `vue@3.6.0-rc.1`，Vapor 运行时已内置，`@vitejs/plugin-vue@6.0.8` 也已支持 Vapor 编译。**但目前保持 VDOM 标准模式开发**，原因是：

1. **Vue 3.6 仍为 RC 阶段** — 正式版发布前可能有行为调整
2. **UI 组件库尚未就绪** — Vant 4 等 UI 库尚未正式支持 Vapor Mode，Vapor 与 VDOM 互操作虽可行但会引入 VDOM 运行时，抵消体积优势
3. **等待生态成熟** — 待 Vue 3.6 正式版 + 组件库全面支持后再启用

### 代码兼容性准备

坚持以下开发习惯，后续迁移到 Vapor Mode 只需添加 `vapor` 关键字：

| 做法 ✅                              | 原因                                       |
| ------------------------------------ | ------------------------------------------ |
| 使用 Composition API + `<script setup>` | Vapor 的核心 API 子集                  |
| 使用 Pinia 管理状态                  | 与 Vapor 完全兼容                         |
| 使用 `provide/inject` 替代 `globalProperties` | Vapor 不支持 `globalProperties` |
| Vant 组件按需导入（已自动配置）      | Vapor 中可正常使用 Vant 组件（走互操作）  |

### 启用方式（参考，暂不启用）

```vue
<script setup vapor lang="ts">
const count = ref(0);
</script>

<template>
  <button @click="count++">{{ count }}</button>
</template>
```

> ✅ 保持 Composition API + `<script setup>` 风格，未来迁移成本最低。

---

## 🤖 Skills 使用规范（高优先级）

**本项目强调在开发过程中始终使用相关 Skills 获得最佳实践指导。**

### 核心原则

1. **任何任务前必须先检查 Skills** — 即使只有 1% 的可能性，也要调用 Skill 工具
2. **不能以"这只是个简单问题"为由跳过 Skills**
3. **Skills 先于代码探索、先于澄清问题**
4. **多个 Skills 适用时，按流程优先（brainstorming > debugging > implementation）顺序加载**

### 必须使用的 Skills 清单

| Skill 名称                     | 触发场景                                       |
| ------------------------------ | ---------------------------------------------- |
| `vue-best-practices`           | 任何 Vue 组件 / SFC 开发                       |
| `vue-router-best-practices`    | 路由配置、导航守卫、页面参数传递               |
| `pinia`                        | Store 设计、状态管理                           |
| `vue-testing-best-practices`   | 编写测试、测试覆盖、测试 Mock                  |
| `vite`                         | Vite 配置、插件开发、Rolldown 迁移             |
| `vitest`                       | 运行测试、测试配置                             |
| `pnpm`                         | 依赖管理、workspace 配置                       |
| `vueuse-functions`             | 使用 VueUse composables                        |
| `web-design-guidelines`        | UI 审查、可访问性、响应式设计                  |
| `superpowers:brainstorming`    | 新功能、新组件、新页面的需求分析               |
| `superpowers:systematic-debugging` | 任何 Bug、测试失败、意外行为                |
| `superpowers:test-driven-development` | 实现新功能或修复前，先写测试            |
| `superpowers:requesting-code-review` | 完成任务、合并前进行自我审查             |
| `superpowers:verification-before-completion` | 完成任务时，运行验证后再声明完成   |

### 开发工作流

```
用户需求
   │
   ├→ 是否涉及 new feature / 复杂修改? → brainstorming skill
   │
   ├→ 是否涉及 Bug / 意外行为?         → systematic-debugging skill
   │
   ├→ 是否涉及 Vue 组件?               → vue-best-practices skill
   │
   ├→ 是否涉及路由?                     → vue-router-best-practices skill
   │
   ├→ 是否涉及 Store?                   → pinia skill
   │
   └→ 实现完成, 准备提交?               → requesting-code-review + verification-before-completion
```

---

## 关键约定

1. **路径别名**: `@/` → `src/`, `#types` → `types/`
2. **布局使用**: 页面通过 `definePage({ meta: { layout: 'xxx' } })` 指定布局
3. **自动导入**: Vue / Vue Router / Pinia API、Vant 组件、`src/composables/` 自动导入
4. **HTTP 请求**: 统一使用 `src/api/index.ts` 中的 `baseAlova` 实例，自带业务码拦截
5. **API 方法**: 放在 `src/api/methods/` 下，按模块拆分
6. **状态管理**: 使用 Pinia + Composition API 风格 `defineStore('name', () => { ... })`
7. **环境变量**: 通过 `useEnv()` composable 类型安全访问
8. **服务端**: API 使用 Nitro `defineHandler`，类型与服务端/客户端共享
9. **依赖版本**: 使用 pnpm catalog 在 `pnpm-workspace.yaml` 统一管理
10. **Vapor Mode**: 保持 Composition API + `<script setup>` 风格开发，为后续迁移做好准备
