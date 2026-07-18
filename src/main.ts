import { createApp } from 'vue';

import '@/styles/index.css';

// 全局 Day.js 配置（必须在其他模块之前执行）
import '@/plugins/dayjs';

import App from './App.vue';

import { setupRouter } from '@/router';

import { setupStore } from '@/stores';

const initApplication = async () => {
  const app = createApp(App);

  // 设置状态管理
  setupStore(app);

  // 设置路由
  setupRouter(app);

  app.mount('#app');
};

await initApplication();
