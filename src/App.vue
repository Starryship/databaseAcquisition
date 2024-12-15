<script setup>
import { RouterView } from 'vue-router'

window.addEventListener('beforeunload', () => {
  localStorage.clear()
})
</script>


<!-- <script setup>
import { RouterView } from 'vue-router'

// 在应用启动时设置标志位
localStorage.setItem('appActive', 'true');

// 监听窗口关闭事件
window.addEventListener('beforeunload', () => {
  // 如果是关闭应用，而不是刷新页面或其他操作
  if (localStorage.getItem('appActive') === 'true') {
    localStorage.clear();
  }
});

// 监听页面刷新或卸载
window.addEventListener('unload', () => {
  // 清除标志位，标记为非活动状态
  localStorage.setItem('appActive', 'false');
});
</script> -->


<template>
  <!-- <Home /> -->
  <RouterView />
</template>

<style scoped></style>

<style>
.el-message-success {
  --el-message-text-color: white !important;
  color: var(--el-message-text-color);
  /* color: white !important; */
  background-color: #8c6270 !important;
  border: 0;
}
</style>
