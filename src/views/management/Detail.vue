<template>
  <div class="back">
    <div class="management-container">
      <!-- <h1>文物详情 - ID: {{ id }}</h1> -->

      <h1>{{ name }}</h1>

      <div class="content">
        <!-- 左边展示图片 -->
        <div class="image-container">
          <img :src="image" alt="Artifact Image" class="artifact-image" />
        </div>
        <!-- 右边展示文本信息 -->
        <div class="text-container">
          <div v-if="isAdmin">
            <label>文物名称:</label>
            <input v-model="name" type="text" />

            <label>年代:</label>
            <input v-model="era" type="text" />

            <label>类别:</label>
            <input v-model="category" type="text" />

            <label>出土地点:</label>
            <input v-model="location_time" type="text" />

            <label>参数:</label>
            <input v-model="parameter" type="text" />

            <label>图片:</label>
            <input v-model="image" type="text" />

            <label>详情:</label>
            <input v-model="text" type="text" />
          </div>
          <div v-else>
            <div class="info-item">
              <span class="info-key">文物ID</span>
              <span class="info-value">{{ id }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">年代</span>
              <span class="info-value">{{ era }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">类别</span>
              <span class="info-value">{{ category }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">出土地点</span>
              <span class="info-value">{{ location_time }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">参数</span>
              <span class="info-value">{{ parameter }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">详情</span>
              <span class="info-value">{{ text }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router' // 导入 useRoute 钩子

import { useAdminStore } from '@/stores/useAdminStore' // 引入 Pinia store

import { computed } from 'vue'

const route = useRoute()
const { id } = route.params

const { era, location_time, image, name, parameter, category, text } = route.query // 获取路由参数

// 使用 Pinia store
const adminStore = useAdminStore()

// 获取管理员模式状态
const isAdmin = computed(() => adminStore.isAdmin)
</script>

<style scoped>
.back {
  width: 100vw;
  height: 100vh;
  background-color: rgb(91, 37, 40); /* 背景颜色 */
  overflow-y: auto; /* 如果内容超出，允许垂直滚动 */
}

.management-container {
  margin: 0px auto;
  width: 80%;
  height: fit-content; /* 自适应高度 */
  background-color: rgb(248, 244, 238); /* 管理容器背景色 */
  padding: 120px 40px 50px 40px;
  margin-bottom: 15%;
}

.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px; /* 使左右元素之间有间隔 */
}

.image-container {
  flex: 1;
  max-width: 40%;
}

.artifact-image {
  width: 100%;
  height: auto;
  border-radius: 8px; /* 圆角图片 */
  margin-left: 5%;
}

.text-container {
  flex: 1;
  max-width: 50%;
}

h2,
p {
  font-size: 18px;
  color: #333;
}

h1 {
  text-align: center;

  margin-bottom: 5%;

  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-size: 45px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  color: #4a4a4a; /* 设置字体颜色 */
}

.text-container input {
  display: block;
  margin-top: 10px;
  padding: 5px;
  width: 100%;
}

.text-container label {
  margin-top: 10px;
  font-weight: bold;
}
.title {
  /* text-align: center; */
  margin: 10% 2%;
  font-size: 30px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
}

.info-item {
  display: flex;
  justify-content: space-between; /* 键和值之间水平排列 */
  margin-bottom: 30px; /* 每项之间的垂直间距 */
}

.info-key {
  font-weight: bold; /* 键的字体加粗 */
  width: 30%; /* 键的宽度占30% */
  white-space: nowrap; /* 防止键值换行 */
  font-size: 22px; /* 设置字体大小 */
  color: #4a4a4a; /* 设置字体颜色 */
}

.info-value {
  flex-grow: 1; /* 值的部分占据剩余空间 */
  word-wrap: break-word; /* 当文本超出宽度时，自动换行 */
  width: 70%; /* 设置值的宽度占70% */
  font-size: 21px; /* 设置字体大小 */
}
</style>
