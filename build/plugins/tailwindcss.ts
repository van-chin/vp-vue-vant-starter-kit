import type { PluginOption } from 'vite';

import tailwindcss from '@tailwindcss/vite';

/**
 * Tailwind CSS v4
 * @returns PluginOption
 */
export function createTailwindcssPlugin(): PluginOption {
  return tailwindcss();
}
