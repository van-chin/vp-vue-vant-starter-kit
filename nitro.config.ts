import { defineConfig } from 'nitro';
import { resolve } from 'node:path';

export default defineConfig({
  // preset: "node_server",
  experimental: {
    database: true,
  },
  serverDir: './server',
  database: {
    default: {
      connector: 'sqlite',
      options: { name: 'db' },
    },
  },
  alias: {
    '#types': resolve(__dirname, 'types'),
  },
});
