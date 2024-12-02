<template>
  <div class="back">
    <div class="management-container">
      <h1>{{ artifact.name }}</h1>

      <div class="content">
        <!-- 左边展示图片 -->
        <div class="image-container">
          <img :src="artifact.thumbnail_path" alt="Artifact Image" class="artifact-image" />
        </div>
        <!-- 右边展示文本信息 -->
        <div class="text-container">
          <div v-if="isAdmin"></div>
          <div v-else>
            <div class="info-item">
              <span class="info-key">文物ID</span>
              <span class="info-value">{{ artifact.id }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">年代</span>
              <span class="info-value">{{ artifact.period }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">类别</span>
              <span class="info-value">{{ artifact.category }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">出土地点</span>
              <span class="info-value">{{ artifact.material }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">参数</span>
              <span class="info-value">{{ artifact.parameter }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">文物现存位置</span>
              <span class="info-value">{{ artifact_location.current_location }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">位置详细信息</span>
              <span class="info-value">{{ artifact_location.storage_address }}</span>
            </div>

            <div class="info-item">
              <span class="info-key">详情</span>
              <span class="info-value">{{ artifact.description }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router' // 导入 useRoute 钩子
import { useAdminStore } from '@/stores/useAdminStore' // 引入 Pinia store
import { watch, onMounted, ref } from 'vue'
import { computed } from 'vue'
import { get_artifacts_by_id, get_artidact_location_by_id } from '@/api/request'

// 使用 Pinia store
const adminStore = useAdminStore()

// 获取管理员模式状态
const isAdmin = computed(() => adminStore.isAdmin)

const artifact = ref([])
const artifact_location = ref([])
// const id_=ref([])

onMounted(async () => {
  try {
    const route = useRoute()
    console.log(route)
    const { id } = route.params
    // id_.value=id
    console.log(id)

    const response = await get_artifacts_by_id(id)
    artifact.value = response.data.data

    const response_location = await get_artidact_location_by_id(id)
    artifact_location.value = response_location.data.data
  } catch (error) {
    console.error('获取文物详情失败:', error)
    artifact_location.value = {}
  }
})

// // 获取路由实例
const router = useRouter()

// 监听 isAdmin 的变化，如果是管理员，自动跳转到文物编辑页面
watch(isAdmin, (newVal) => {
  if (newVal) {
    router.push({
      name: 'ArtifactEdit',
      params: { id: artifact.value.id },
      query: {
        name: artifact.value.name,
        period: artifact.value.period,
        category: artifact.value.category,
        parameter: artifact.value.parameter,
        material: artifact.value.material,
        thumbnail_path: artifact.value.thumbnail_path,
        description: artifact.value.description,
      },
    })
  }
})
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

  font-family: 'KaiTi', 'STKaiti', serif;
  font-size: 45px;
  font-weight: bold;
  color: #4a4a4a;
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
  margin: 10% 2%;
  font-size: 30px;
  font-weight: bold;
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
