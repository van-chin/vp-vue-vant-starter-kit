/**
 * 环境变量类型安全的访问 composable
 *
 * 集中管理所有环境变量，提供类型推断和默认值
 */
export function useEnv(env: ImportMetaEnv) {
  return {
    /** API 基础路径 */
    apiURL: env.VITE_API_BASE_URL || '/api',
    /** 腾讯云 IM 应用 ID */
    tccAppId: Number(env.VITE_TCC_APP_ID) || 0,
    /** 允许的 Host */
    allowedHost: env.VITE_ALLOWED_HOST || '',
    /** HTTPS 反向代理目标 */
    proxyTarget: env.VITE_PROXY_TARGET || '',
    /** 应用基础路径 */
    publicPath: env.VITE_PUBLIC_PATH || '/',
    /** 环境名称 */
    envName: env.VITE_ENV_NAME || 'development',
  } as const;
}

/** 环境变量返回类型，便于其他模块引用 */
export type EnvConfig = ReturnType<typeof useEnv>;
