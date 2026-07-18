import { createAlova } from 'alova';
import VueHook from 'alova/vue';
import { axiosRequestAdapter } from '@alova/adapter-axios';

import { useEnv } from '@/composables/useEnv';
import type { ApiResponse } from '#types';
import { BizCode } from '#types';

const { apiURL } = useEnv(import.meta.env);

/** Alova 请求实例 */
export const baseAlova = createAlova({
  baseURL: apiURL,
  timeout: 60000,
  statesHook: VueHook,
  requestAdapter: axiosRequestAdapter(),

  beforeRequest: async (method) => {
    method.config.headers['Content-Type'] = 'application/json';
  },

  responded: {
    onSuccess: async (response) => {
      const { status, data: responseData } = response;
      const { code, message, data } = responseData as ApiResponse;

      // HTTP 非 200 状态码处理
      if (status !== 200) {
        throw new Error(`请求失败：HTTP ${status}`);
      }

      switch (code) {
        case BizCode.ERROR:
          // TODO: 替换为实际的 UI 提示组件（如 ElMessage）
          console.error(`[API] 业务错误：${message}`);
          throw new Error(message);

        case BizCode.UNAUTHORIZED:
          // TODO: 替换为实际的路由跳转（如 router.push('/login')）
          console.error('[API] 未授权，请重新登录');
          throw new Error('未授权，请重新登录');

        default:
          return data;
      }
    },

    onError: (error) => {
      console.error('[API] 请求异常：', error);
      throw error;
    },
  },
});
