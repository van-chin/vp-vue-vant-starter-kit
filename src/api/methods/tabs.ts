import { baseAlova } from '../index';
import type { TabItem } from '#types';

/** 获取标签页列表（静态数据，启用缓存） */
export function tabItemsMethod() {
  return baseAlova.Get<TabItem[]>('/api/tab-items', {
    cacheFor: {
      mode: 'restore',
      expire: 300_000, // 5 分钟
    },
  });
}
