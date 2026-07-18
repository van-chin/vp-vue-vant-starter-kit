/// <reference types="vite-plus/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';
  const component: DefineComponent<{}, {}, unknown>;
  export default component;
}

declare module 'vue-router' {
  interface RouteMeta {
    /** 是否展示 layout 头部导航栏（默认 true） */
    showHeader?: boolean;
    /** 是否展示 layout 底部导航栏（默认 true） */
    showFooter?: boolean;
  }
}

export {};

interface ImportMetaEnv {
  /** API 基础路径 */
  readonly VITE_API_BASE_URL: string;
  /** 腾讯云 IM 应用 ID */
  readonly VITE_TCC_APP_ID: string;
  /** 允许的 Host 域名 */
  readonly VITE_ALLOWED_HOST: string;
  /** HTTPS 反向代理目标域名 */
  readonly VITE_PROXY_TARGET: string;
  /** 应用基础路径 */
  readonly VITE_PUBLIC_PATH: string;
  /** 环境名称 */
  readonly VITE_ENV_NAME: string;
  /** 应用预览模式 */
  readonly VITE_APP_PREVIEW: string;
  /** Tauri 开发主机 */
  readonly VITE_TAURI_DEV_HOST: string;
  /** Dev Server 主机地址 */
  readonly VITE_DEV_SERVER_HOST: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
