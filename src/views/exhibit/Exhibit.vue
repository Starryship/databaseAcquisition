<template>
  <div class="exhibit-container">
    <Filter style="margin-bottom: 20px"></Filter>

    <div class="gallery" v-if="images">
      <div v-for="(item, index) in images" :key="index" class="image-item">
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
