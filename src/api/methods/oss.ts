import { baseAlova } from '../index';
import type { STSResponse } from '#types';

/** 获取阿里云 OSS STS 临时凭证 */
export function aliyunOssStsTokenMethod(params: Record<string, string>) {
  return baseAlova.Get<STSResponse>('/oss/sts-token', {
    params,
    cacheFor: null,
  });
}
