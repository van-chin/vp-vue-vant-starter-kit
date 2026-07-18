import type { PluginOption } from 'vite';

import HttpsReverseProxy from 'unplugin-https-reverse-proxy/vite';

export function createHttpsReverseProxyPlugin(target?: string): PluginOption {
  const proxyTarget = target || process.env.VITE_PROXY_TARGET || 'iot.datav.screen.inlin.com.cn';

  return HttpsReverseProxy({
    enable: true,
    target: proxyTarget,
    https: true,
    showCaddyLog: false,
    healthCheck: true,
  });
}
