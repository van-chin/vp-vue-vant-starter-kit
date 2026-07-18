import type { LoginParams, LoginResponse } from '#types';
import { loginMethod } from '@/api/methods/auth';

/** 认证状态 Store */
export const useAuthStore = defineStore('auth', () => {
  // ─── State ───
  const accessToken = ref<string>(localStorage.getItem('accessToken') ?? '');
  const refreshToken = ref<string>(localStorage.getItem('refreshToken') ?? '');
  const userInfo = ref<string>(localStorage.getItem('user') ?? '');

  // ─── Getters ───
  const isLoggedIn = computed(() => !!accessToken.value);

  // ─── Actions ───

  /** 登录 */
  async function login(params: LoginParams) {
    const data = await loginMethod(params);
    setAuth(data);
    return data;
  }

  /** 设置认证信息（登录成功 / token 刷新后调用） */
  function setAuth(data: LoginResponse) {
    accessToken.value = data.accessToken;
    refreshToken.value = data.refreshToken;
    userInfo.value = data.user;

    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    localStorage.setItem('user', data.user);
  }

  /** 登出 */
  function logout() {
    accessToken.value = '';
    refreshToken.value = '';
    userInfo.value = '';

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  }

  return {
    accessToken,
    refreshToken,
    userInfo,
    isLoggedIn,
    login,
    setAuth,
    logout,
  };
});
