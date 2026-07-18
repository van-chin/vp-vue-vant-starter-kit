---
title: '[Question] Any ETA for v3 release?'
labels: question
assignees: loicduong
---

## Context

First of all, thank you for this great plugin! I'm currently using `vite-plugin-vue-layouts-next@^2.1.0` with Vue Router 5's file-based routing (`vue-router/auto-routes`).

I noticed that the README on the `main` branch describes several v3 features (e.g., Nuxt-compatible layout name normalization, removing `pagesDirs` since Vue Router 5 owns page discovery and HMR), but the latest npm release is still 2.1.0.

## Questions

1. **Is there any estimated release date for v3?** (weeks / months / still in early planning?)

2. **Is v3 source code available on a separate branch?** I'd be happy to help test or contribute if there's a preview branch.

3. **Current workaround feedback**: To work around the v2 behavior in our project, we:
   - Restructured layouts from `screen/index.vue` → `screen.vue` to get clean layout names
   - Set `pagesDirs: 'src/pages/_nonexistent_'` to prevent the plugin from sending `full-reload` on page file changes (since Vue Router 5 handles page HMR)
   - Added a `handleHotUpdate` callback to re-apply `setupLayouts()` during HMR

   Is this approach aligned with what v3 will do natively? Any concerns?

Thanks in advance!
