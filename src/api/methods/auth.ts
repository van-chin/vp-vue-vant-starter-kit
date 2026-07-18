import { baseAlova } from '../index';
import type { LoginResponse, LoginParams } from '#types';

/** 登录（POST 请求，不缓存） */
export function loginMethod(params: LoginParams) {
  return baseAlova.Post<LoginResponse>('/auth/login', params);
}
