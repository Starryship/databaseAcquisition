<script setup>
// import Home from './views/Home.vue';
import { RouterView } from 'vue-router'
// import { useArtifactStore } from '@/stores/artifactStore'; // 引入 Pinia store


// const artifactStore = useArtifactStore();
// 如果需要在应用关闭时清除缓存，可以使用 beforeunload 事件
window.addEventListener('beforeunload', () => {
  // artifactStore.clearArtifactData(); // 清除缓存
  localStorage.clear()
});

</script>

<template>

  <!-- <Home /> -->
  <RouterView />

</template>

<style scoped>



</style>

<style>
.el-message-success {
  --el-message-text-color: white !important;
  color: var(--el-message-text-color);
  /* color: white !important; */
  background-color: #8c6270 !important;
  border: 0;
}
</style>