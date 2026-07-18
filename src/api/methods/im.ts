import { baseAlova } from '../index';
import type { GetUserSigResponse, UserSigParams } from '#types';

/** 获取腾讯云 IM 用户签名（缓存 30 天，避免重复请求） */
export function userSigMethod(params: UserSigParams) {
  return baseAlova.Get<GetUserSigResponse>('/app/im/getUserSig', {
    params,
    cacheFor: {
      mode: 'restore',
      expire: 2_592_000_000, // 30 天
    },
  });
}
