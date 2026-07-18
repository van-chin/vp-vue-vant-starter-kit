import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vueDevTools from 'vite-plugin-vue-devtools';
import Layouts from 'vite-plugin-vue-layouts-next';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';

import { VantResolver } from '@vant/auto-import-resolver';

import VueRouter from 'vue-router/vite';

/**
 * Vue 核心插件（vue / vue-jsx / vue-devtools / auto-import / components / vue-router / layouts）
 * @param isBuild 是否为生产构建
 */
export function createVuePlugin(isBuild: boolean = false): PluginOption[] {
  return [
    vue(),
    vueJsx(),
    AutoImport({
      imports: ['vue', 'vue-router', 'pinia'],
      dirs: ['src/composables'],
      resolvers: [VantResolver()],
      dts: 'types/automatics/auto-imports.d.ts',
    }),
    Components({
      resolvers: [VantResolver()],
      dts: 'types/automatics/components.d.ts',
    }),
    VueRouter({
      extensions: ['.vue'],
      routesFolder: 'src/pages',
      dts: 'types/automatics/typed-router.d.ts',
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      // defaultLayout: 'default/index',
    }),

    // DevTools 仅开发环境
    !isBuild && vueDevTools(),
  ].filter(Boolean);
}
