<!-- <template>
  <div class="exhibit-container">
    <Filter style="margin-bottom: 20px"></Filter>

    <div class="gallery" v-if="images">
      <div v-for="(item, index) in images" :key="index" class="image-item">
        <img :src="item.image" :alt="`Image ${index + 1}`" />
        <div class="image-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template> -->

<!-- <template>
  <div class="exhibit-container">
    <Filter @categoryChanged="fetchArtifactsByCategories" style="margin-bottom: 20px"></Filter>

    <div class="gallery" v-if="images">
      <div v-for="item in images" :key="item.id" class="image-item">
        <img :src="item.image" :alt="`Image ${index + 1}`" />
        <div class="image-name">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>


<script setup>
import { onMounted, ref } from 'vue'
import Filter from './Filter.vue'

import { useCulturalInfoStore } from '@/stores/culturalInfo';

const culturalInfoStore =useCulturalInfoStore()

const images =ref([])

onMounted(()=>{
  images.value=culturalInfoStore.$state.data
})

</script> -->



<template>
  <div class="exhibit-container">
    <Filter @categoryChanged="fetchArtifactsByCategories" style="margin-bottom: 20px"></Filter>

    <div class="gallery" v-if="images.length">
      <div v-for="item in images" :key="item.id" class="image-item">
        <img :src="item.image" :alt="`Image ${item.name}`" />
        <div class="image-name">{{ item.name }}</div>
      </div>
    </div>
    <div v-else>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Filter from './Filter.vue'
import { get_artifact_by_category } from '@/api/request'

const images = ref([])


// 当类别发生变化时获取新的文物数据
const fetchArtifactsByCategories = async (categories) => {
  images.value = []  // 清空现有的文物数据
  console.log(categories)
  // 逐个请求类别数据
  for (const category of categories) {
    try {
      
      const response = await get_artifact_by_category(category) // 根据类别获取数据
      
      // console.log(response)

      if (response && response.data) {
        // 将获取的数据添加到 images 数组中
        images.value = [...images.value, ...response.data];
      }
    } catch (error) {
      console.error(`Error fetching artifacts for category ${category}:`, error);
    }
  }
}
</script>


<style scoped>
.exhibit-container {
  background-color: rgb(91,37,40);
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
}

.image-item img {
  width: 90%;
  aspect-ratio: 1/1;
}

.image-name{
  margin-top: 10px;
  font-size: 20px;
  font-weight: bold;
}
</style>
