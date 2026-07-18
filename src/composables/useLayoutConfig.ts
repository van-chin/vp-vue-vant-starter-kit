import { computed } from 'vue';
import { useRoute } from 'vue-router';

/**
 * Layout 配置选项
 */
export interface LayoutConfigOptions {
  /** 兜底默认值：是否展示 header（仅在 definePage meta 和 query 都未设置时生效） */
  defaultHeader?: boolean;
  /** 兜底默认值：是否展示 footer */
  defaultFooter?: boolean;
  /**
   * 权限检查函数。
   * 返回 false 则对应组件强制隐藏（只能在已有结果上进一步限制，不能越权显示）。
   * @example
   * ```ts
   * permissionCheck: (component) => {
   *   if (component === 'footer') return hasPermission('layout.footer');
   *   return true;
   * }
   * ```
   */
  permissionCheck?: (component: 'header' | 'footer') => boolean;
}

/**
 * Layout 头部/底部显隐控制 composable
 *
 * 优先级（从高到低）：
 *   1. Query 参数（?showHeader=0&showFooter=1）— webview 嵌入时由宿主 APP 控制
 *   2. definePage meta（showHeader / showFooter）— 页面声明的默认行为
 *   3. defaultHeader / defaultFooter（composable 参数）— 兜底默认值
 *   4. permissionCheck（composable 参数）— 权限限制，只减不增
 */
export function useLayoutConfig(options: LayoutConfigOptions = {}) {
  const route = useRoute();

  const { defaultHeader = true, defaultFooter = true, permissionCheck } = options;

  // ── 1. definePage meta ──
  const metaShowHeader = computed(() => route.meta.showHeader ?? defaultHeader);
  const metaShowFooter = computed(() => route.meta.showFooter ?? defaultFooter);

  // ── 2. Query 参数覆盖（webview 嵌入场景） ──
  const queryShowHeader = computed<boolean | undefined>(() => {
    if (route.query.showHeader === '1') return true;
    if (route.query.showHeader === '0') return false;
    return undefined;
  });
  const queryShowFooter = computed<boolean | undefined>(() => {
    if (route.query.showFooter === '1') return true;
    if (route.query.showFooter === '0') return false;
    return undefined;
  });

  // ── 3. 合并：query > meta > default ──
  const resolvedShowHeader = computed(() => queryShowHeader.value ?? metaShowHeader.value);
  const resolvedShowFooter = computed(() => queryShowFooter.value ?? metaShowFooter.value);

  // ── 4. 权限限制（只能进一步隐藏） ──
  const showHeader = computed(() => {
    if (!resolvedShowHeader.value) return false;
    if (permissionCheck && !permissionCheck('header')) return false;
    return true;
  });

  const showFooter = computed(() => {
    if (!resolvedShowFooter.value) return false;
    if (permissionCheck && !permissionCheck('footer')) return false;
    return true;
  });

  return { showHeader, showFooter };
}
