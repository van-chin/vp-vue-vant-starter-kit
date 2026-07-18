import type { App } from 'vue';
import type { RouteRecordRaw } from 'vue-router';
import { setupLayouts } from 'virtual:generated-layouts';
import { createRouter, createWebHistory } from 'vue-router';
import { routes, handleHotUpdate } from 'vue-router/auto-routes';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: setupLayouts(routes),
});

if (import.meta.hot) {
  // handleHotUpdate 在 HMR 时会用原始路由（未经 setupLayouts 包裹）替换 router 的路由。
  // 传入回调重新应用布局包裹，确保热更新后布局不丢失。
  handleHotUpdate(router, (newRoutes: RouteRecordRaw[]) => {
    router.clearRoutes();
    for (const route of setupLayouts(newRoutes)) {
      router.addRoute(route);
    }
  });
}

export const setupRouter = (app: App<Element>) => {
  app.use(router);
};

export default router;
