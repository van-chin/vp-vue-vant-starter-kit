<template>
  <div class="space-y-4 px-4">
    <!-- 功能说明 -->
    <van-notice-bar color="#1677ff" background="#e8f0fe" left-icon="info-o">
      测试页：自定义 Header/Footer 替换功能
    </van-notice-bar>

    <div class="bd-red p-2" style="height: 200px">ddd</div>

    <!-- 当前状态卡 -->
    <van-cell-group inset>
      <van-cell title="当前 Layout" value="default" />
      <van-cell title="Header 状态">
        <template #value>
          <van-tag :type="showHeader ? 'success' : 'danger'">
            {{ showHeader ? '显示中' : '已隐藏' }}
          </van-tag>
        </template>
      </van-cell>
      <van-cell title="Footer 状态">
        <template #value>
          <van-tag :type="showFooter ? 'success' : 'danger'">
            {{ showFooter ? '显示中' : '已隐藏' }}
          </van-tag>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 操作按钮 -->
    <van-cell-group inset>
      <van-cell title="说明">
        <template #label>
          <p class="mt-1 text-sm text-gray-500">
            当前页面的 Header 和 Footer 已被 <code>useCustomHeader</code> /
            <code>useCustomFooter</code> 替换为测试组件。
          </p>
          <p class="mt-1 text-sm text-gray-500">
            页面下方的自定义 Footer 中提供了切换按钮，可以动态修改
            <code>?showHeader=</code> 和 <code>?showFooter=</code> 参数来测试显隐控制。
          </p>
          <p class="mt-1 text-sm text-gray-500">
            也可以手动在地址栏添加参数测试：
            <code>/test?showHeader=0&showFooter=0</code>
          </p>
        </template>
      </van-cell>
    </van-cell-group>

    <!-- 链接 -->
    <van-cell-group inset>
      <van-cell title="返回首页" is-link to="/" />
      <van-cell title="Screen 页面" is-link to="/screen" />
    </van-cell-group>
    <div class="bd-red p-2" style="height: 200px">ddd</div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'PageTest' });
definePage({
  meta: {
    layout: 'default',
    showHeader: true,
    showFooter: true,
  },
});

// 替换 Layout 默认的 Header 和 Footer 为自定义测试组件
useCustomHeader(() => import('@/pages/test/components/TestHeader.vue'));
useCustomFooter(() => import('@/pages/test/components/TestFooter.vue'));

// 读取当前显隐状态用于展示
const { showHeader, showFooter } = useLayoutConfig();
</script>
