import {
  computed,
  inject,
  markRaw,
  onUnmounted,
  provide,
  shallowRef,
  type Component,
  type Ref,
} from 'vue';

/**
 * Layout 自定义头部/底部注入 key，避免命名冲突
 */
export const LAYOUT_INJECT_KEYS = {
  HEADER: 'layout:register-header',
  FOOTER: 'layout:register-footer',
} as const;

// ─── 类型定义 ───
type RegisterFn = (comp: Component | null) => void;

/** 异步组件加载器：() => import('./Comp.vue') */
type AsyncComponentLoader = () => Promise<{ default: Component } | Component>;

// ─── 页面侧：注册自定义组件 ───

function useLayoutPart(injectKey: string, component: Component | AsyncComponentLoader): void {
  const register = inject<RegisterFn>(injectKey);
  if (!register) return;

  if (typeof component === 'function') {
    // 异步加载器：() => import('./Comp.vue')
    void (async () => {
      const mod = await (component as AsyncComponentLoader)();
      register(markRaw('default' in mod ? mod.default : mod));
    })();
  } else {
    // 同步组件
    register(markRaw(component));
  }

  onUnmounted(() => register(null));
}

/**
 * 用自定义组件替换 Layout 默认的 Header。
 *
 * @example useCustomHeader(MyHeader);                        // 同步组件
 * @example useCustomHeader(() => import('./MyHeader.vue')); // 异步 import
 */
export function useCustomHeader(component: Component | AsyncComponentLoader): void {
  useLayoutPart(LAYOUT_INJECT_KEYS.HEADER, component);
}

/**
 * 用自定义组件替换 Layout 默认的 Footer。
 *
 * @example useCustomFooter(MyFooter);                        // 同步组件
 * @example useCustomFooter(() => import('./MyFooter.vue')); // 异步 import
 */
export function useCustomFooter(component: Component | AsyncComponentLoader): void {
  useLayoutPart(LAYOUT_INJECT_KEYS.FOOTER, component);
}

// ─── Layout 侧：暴露注册能力 ───

/**
 * Layout 组件调用：提供自定义 Header/Footer 的注入能力，
 * 返回当前生效的组件（自定义组件 ?? 默认组件，受 showHeader/showFooter 控制）。
 */
export function useLayoutProvider(
  defaultHeader: Component,
  defaultFooter: Component,
  config: { showHeader: Ref<boolean>; showFooter: Ref<boolean> },
) {
  const customHeader = shallowRef<Component | null>(null);
  const customFooter = shallowRef<Component | null>(null);

  provide(LAYOUT_INJECT_KEYS.HEADER, (comp: Component | null) => {
    customHeader.value = comp;
  });
  provide(LAYOUT_INJECT_KEYS.FOOTER, (comp: Component | null) => {
    customFooter.value = comp;
  });

  const activeHeader = computed(() => {
    if (!config.showHeader.value) return null;
    return customHeader.value ?? defaultHeader;
  });

  const activeFooter = computed(() => {
    if (!config.showFooter.value) return null;
    return customFooter.value ?? defaultFooter;
  });

  return { activeHeader, activeFooter };
}
