<template>
  <div class="exhibit-container">
    <Filter @categoryChanged="fetchArtifactsByCategories" style="margin-bottom: 20px"></Filter>

    <div class="gallery" v-if="images.length">
      <div v-for="item in images" :key="item.id" class="image-item" @click="handleAction(item.id)">
        <img :src="item.thumbnail_path" :alt="`Image ${item.name}`" />
        <div class="image-name">{{ item.name }}</div>
        <div class="category">[{{ item.category }}]</div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script setup>
import Filter from './Filter.vue'
import { get_artifact_by_category } from '@/api/request'
import { ref } from 'vue'

import { useRouter } from 'vue-router'

import { add_user_interaction } from '@/api/request' // 导入API请求函数

const router = useRouter()
const images = ref([])

// 当类别发生变化时获取新的文物数据
const fetchArtifactsByCategories = async (categories) => {
  images.value = [] // 清空现有的文物数据
  console.log(categories)
  // 逐个请求类别数据
  for (const category of categories) {
    try {
      const response = await get_artifact_by_category(category) // 根据类别获取数据

      // console.log(response)

      if (response && response.data) {
        // 将获取的数据添加到 images 数组中
        images.value = [...images.value, ...response.data]
      }
    } catch (error) {
      console.error(`Error fetching artifacts for category ${category}:`, error)
    }
  }
}

// handleAction 方法会在点击按钮时触发
const handleAction = async (id_) => {
  try {
    // 先记录用户的交互行为
    await add_user_interaction(id_, 'view') // 'view' 表示查看交互类型

    console.log(`交互记录已添加，文物 ID: ${id_}`)
  } catch (error) {
    console.error('添加交互记录失败:', error.message)
  } finally {
    // 然后跳转到文物详情页面
    router.push({
      name: 'ArtifactDetail',
      params: { id: id_ },
    })
  }
}
</script>

<style scoped>
.exhibit-container {
  background-color: rgb(91, 37, 40);
  padding-top: 100px;
  box-sizing: border-box;
  min-height: 100vh;
}

.gallery {
  width: 90%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin: 0 auto;
  box-sizing: border-box;
}

.image-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f4ee;
  padding: 20px;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
}

.image-item img {
  width: 90%;
  aspect-ratio: 1/1;
}

.image-name {
  margin-top: 10px;
  font-size: 15px;
  font-weight: bold;
}

.category {
  color: gray;
  font-size: 10px;
  font-weight: bold;
}
</style>
