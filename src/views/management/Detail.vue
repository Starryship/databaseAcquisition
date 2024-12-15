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

    <div
      class="management-container"
      style="display: flex; flex-direction: column; align-items: center"
    >
      <h1>"活的"文物</h1>

      <div style="width: fit-content">
        <button v-if="ai_button" type="button" class="button" @click="handleAI(artifact.id)">
        <span class="fold"></span>

        <div class="points_wrapper">
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
          <i class="point"></i>
        </div>

        <span class="inner">
          <svg
            class="icon"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2.5"
          >
            <polyline
              points="13.18 1.37 13.18 9.64 21.45 9.64 10.82 22.63 10.82 14.36 2.55 14.36 13.18 1.37"></polyline>
              </svg>AI生成</span>
      </button>
      </div>


      <div v-loading="loading2">
    <!-- <button @click="generateAudioAndPlay">生成音频并播放</button> -->
    <audio ref="audioPlayer" controls v-if="audioUrl" :src="audioUrl"></audio>
        <!-- 加载提示 -->
        <div v-if="loading2" >正在生成音频，请稍等...</div>
  </div>


      <div class="create-content" v-loading="loading">
        <!-- <span >{{ compiledMarkdown }}</span> -->
        <div v-html="compiledMarkdown"></div>
      </div>

      <div v-loading="loading3">
        <!-- <video v-if="videoUrl" :src="videoUrl" controls loop width="100%" height="auto">
  你的浏览器不支持视频标签。
</video> -->
<video v-if="v" src="https://cdn.klingai.com/bs2/upload-kling-api/3601927415/image2video/CjS7emdSwTgAAAAAAXBeXw-0_raw_video_1.mp4" controls loop width="100%" height="auto">
  你的浏览器不支持视频标签。
</video>
        <div v-if="loading3" >正在生成视频，请稍等...</div>
      </div>




    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router' // 导入 useRoute 钩子
import { useAdminStore } from '@/stores/useAdminStore' // 引入 Pinia store
import { watch, onMounted, ref } from 'vue'
import { computed } from 'vue'
import { get_artifacts_by_id, get_artidact_location_by_id,get_artifact_story_by_id,generateAudio,generateVideo } from '@/api/request'
import { marked } from 'marked'



const v=ref(false)

// 使用 Pinia store
const adminStore = useAdminStore()


// 获取管理员模式状态
const isAdmin = computed(() => adminStore.isAdmin)

const artifact = ref([])
const artifact_location = ref([])
// const id_=ref([])

const story=ref('')
const compiledMarkdown = ref('')
const ai_button=ref(true)

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

const loading = ref(false)
const handleAI = async (id) => {
  try {
    ai_button.value=false
    loading.value = true
    const response =await get_artifact_story_by_id(id) 
    console.log(response)

      story.value=response.data.data


      compiledMarkdown.value = marked( story.value)

if (compiledMarkdown.value) {
      generateAudioAndPlay();  // 使用 `compiledMarkdown.value`
    }


    generateVideoPlay()

  } catch (error) {
    alert(error.message) 
  }finally{
    loading.value = false
v.value=true
  }
}



// 用于存储音频的 URL
const audioUrl = ref(null)
// 用于显示加载状态
const loading2 = ref(false)

// 用 ref 创建对音频元素的引用
const audioPlayer = ref(null)

// 生成音频并播放
const generateAudioAndPlay = async () => {
  // 先清除之前的音频 URL
  audioUrl.value = null
  loading2.value = true

  try {

    // 调用 API 生成音频并获取音频 URL
    const url = await generateAudio(extractTextFromHtml(compiledMarkdown.value))
    
    // 设置音频 URL
    audioUrl.value = url

    // 使用 ref 引用播放音频
    if (audioPlayer.value) {
      audioPlayer.value.play()
    }

  } catch (error) {
    console.error('音频生成失败:', error)
    alert('音频生成失败，请重试')
  } finally {
    loading2.value = false
  }
}


const videoUrl=ref(null)
const loading3=ref(false)
// 生成视频并获取 URL
const generateVideoPlay = async () => {
  // 先清除之前的音频 URL
  videoUrl.value = null
  loading3.value = true

  try {
    console.log(artifact.value.thumbnail_path)
    const videoData = await generateVideo(artifact.value.thumbnail_path); // 示例图片 URL
    console.log("22222",videoData)
    videoUrl.value = videoData.data; // 假设返回的数据中有 `videoUrl` 字段
  } catch (error) {
    console.error('视频生成失败:', error);
  }finally{
loading3.value=false

  }
};



const extractTextFromHtml = (html) => {
  console.log(html)
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.body.textContent || '';  // 返回纯文本
};



</script>

<style scoped>
.back {
  width: 100vw;
  height: 100vh;
  /* background-color: rgb(91, 37, 40);  */
  background-image: url(https://digicol.dpm.org.cn/images/bg2.jpg);
  overflow-y: auto; /* 如果内容超出，允许垂直滚动 */
}

.management-container {
  margin: 0px auto;
  width: 85%;
  height: fit-content; /* 自适应高度 */
  background-color: rgb(248, 244, 238); /* 管理容器背景色 */
  padding: 120px 40px 80px 40px;
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

.button {
  --h-button: 48px;
  --w-button: 102px;
  --round: 0.75rem;
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  transition: all 0.25s ease;
  background: radial-gradient(
      65.28% 65.28% at 50% 100%,
      rgba(223, 113, 255, 0.8) 0%,
      rgba(223, 113, 255, 0) 100%
    ),
    linear-gradient(0deg, #7a5af8, #7a5af8);
  border-radius: var(--round);
  border: none;
  outline: none;
  padding: 20px 60px;
}
.button::before,
.button::after {
  content: '';
  position: absolute;
  inset: var(--space);
  transition: all 0.5s ease-in-out;
  border-radius: calc(var(--round) - var(--space));
  z-index: 0;
}
.button::before {
  --space: 1px;
  background: linear-gradient(177.95deg, rgba(255, 255, 255, 0.19) 0%, rgba(255, 255, 255, 0) 100%);
}
.button::after {
  --space: 2px;
  background: radial-gradient(
      65.28% 65.28% at 50% 100%,
      rgba(223, 113, 255, 0.8) 0%,
      rgba(223, 113, 255, 0) 100%
    ),
    linear-gradient(0deg, #7a5af8, #7a5af8);
}
.button:active {
  transform: scale(0.95);
}

.fold {
  z-index: 1;
  position: absolute;
  top: 0;
  right: 0;
  height: 1rem;
  width: 1rem;
  display: inline-block;
  transition: all 0.5s ease-in-out;
  background: radial-gradient(
    100% 75% at 55%,
    rgba(223, 113, 255, 0.8) 0%,
    rgba(223, 113, 255, 0) 100%
  );
  box-shadow: 0 0 3px black;
  border-bottom-left-radius: 0.5rem;
  border-top-right-radius: var(--round);
}
.fold::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  width: 150%;
  height: 150%;
  transform: rotate(45deg) translateX(0%) translateY(-18px);
  background-color: #e8e8e8;
  pointer-events: none;
}
.button:hover .fold {
  margin-top: -1rem;
  margin-right: -1rem;
}

.points_wrapper {
  overflow: hidden;
  width: 100%;
  height: 100%;
  pointer-events: none;
  position: absolute;
  z-index: 1;
}

.points_wrapper .point {
  bottom: -10px;
  position: absolute;
  animation: floating-points infinite ease-in-out;
  pointer-events: none;
  width: 2px;
  height: 2px;
  background-color: #fff;
  border-radius: 9999px;
}
@keyframes floating-points {
  0% {
    transform: translateY(0);
  }
  85% {
    opacity: 0;
  }
  100% {
    transform: translateY(-55px);
    opacity: 0;
  }
}
.points_wrapper .point:nth-child(1) {
  left: 10%;
  opacity: 1;
  animation-duration: 2.35s;
  animation-delay: 0.2s;
}
.points_wrapper .point:nth-child(2) {
  left: 30%;
  opacity: 0.7;
  animation-duration: 2.5s;
  animation-delay: 0.5s;
}
.points_wrapper .point:nth-child(3) {
  left: 25%;
  opacity: 0.8;
  animation-duration: 2.2s;
  animation-delay: 0.1s;
}
.points_wrapper .point:nth-child(4) {
  left: 44%;
  opacity: 0.6;
  animation-duration: 2.05s;
}
.points_wrapper .point:nth-child(5) {
  left: 50%;
  opacity: 1;
  animation-duration: 1.9s;
}
.points_wrapper .point:nth-child(6) {
  left: 75%;
  opacity: 0.5;
  animation-duration: 1.5s;
  animation-delay: 1.5s;
}
.points_wrapper .point:nth-child(7) {
  left: 88%;
  opacity: 0.9;
  animation-duration: 2.2s;
  animation-delay: 0.2s;
}
.points_wrapper .point:nth-child(8) {
  left: 58%;
  opacity: 0.8;
  animation-duration: 2.25s;
  animation-delay: 0.2s;
}
.points_wrapper .point:nth-child(9) {
  left: 98%;
  opacity: 0.6;
  animation-duration: 2.6s;
  animation-delay: 0.1s;
}
.points_wrapper .point:nth-child(10) {
  left: 65%;
  opacity: 1;
  animation-duration: 2.5s;
  animation-delay: 0.2s;
}

.inner {
  z-index: 2;
  gap: 6px;
  position: relative;
  width: 100%;
  color: white;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  transition: color 0.2s ease-in-out;
}

.inner svg.icon {
  width: 18px;
  height: 18px;
  transition: fill 0.1s linear;
}

.button:focus svg.icon {
  fill: white;
}
.button:hover svg.icon {
  fill: transparent;
  animation:
    dasharray 1s linear forwards,
    filled 0.1s linear forwards 0.95s;
}
@keyframes dasharray {
  from {
    stroke-dasharray: 0 0 0 0;
  }
  to {
    stroke-dasharray: 68 68 0 0;
  }
}
@keyframes filled {
  to {
    fill: white;
  }
}

/* .create-content {
  width: 100%;
} */




 /* 设置整个文本的字体大小和行间距 */
.create-content {
  font-family: 'Arial', sans-serif;  /* 设置字体 */
  font-size: 20px;                   /* 设置默认字体大小 */
  line-height: 1.8;                  /* 设置行间距 */
  color: #333;                       /* 设置文本颜色 */
  max-width: 85%;                  /* 限制最大宽度 */
  /* margin: 0 auto;                    使内容居中显示 */
  padding: 20px;                     /* 设置内边距 */


}

/* 设置标题的样式 */
.create-content h1,
.create-content h2,
.create-content h3 {
  font-weight: bold;                /* 设置标题加粗 */
  color: #444;                      /* 设置标题颜色 */
}

/* 设置段落的样式 */
.create-content p {
  margin-bottom: 20px;              /* 设置段落之间的间距 */
  font-size: 18px;                  /* 设置段落的字体大小 */
}

/* 设置链接的样式 */
.create-content a {
  color: #1E90FF;                   /* 设置链接的颜色 */
  text-decoration: none;            /* 去掉链接下划线 */
}

.create-content a:hover {
  text-decoration: underline;       /* 鼠标悬停时显示下划线 */
}
</style>
