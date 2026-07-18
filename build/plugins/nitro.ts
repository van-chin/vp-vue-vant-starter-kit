import type { PluginOption } from 'vite';

import { nitro } from 'nitro/vite';

/**
 * Nitro 服务端
 * @returns PluginOption
 */
export function createNitroPlugin(): PluginOption {
  return nitro();
}
