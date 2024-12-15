<template>
  <div class="back">
    <video class="video-background" autoplay muted loop>
      <source
        src="https://img.dpm.org.cn/Uploads/File/2024/12/13/u675bf541eb938.mp4"
        type="video/mp4"
      />
    </video>
    <!-- 其他内容 -->
    <div class="content">
      <div class="management-container">
        <h1 class="title">聆听历史的回响</h1>

        <el-carousel :interval="3000" type="card" height="300px">
          <el-carousel-item
            v-for="randomArtifact in randomArtifacts"
            :key="randomArtifact.id"
            class="image-item"
          >
            <img
              :src="randomArtifact.thumbnail_path"
              alt=""
              @click="handleAction(randomArtifact.id)"
            />
            <!-- <img :src="randomArtifact.thumbnail_path" alt=""   @click="handleAction(randomArtifact.id)"
         style="width: 100%;height: 100%;">
          -->
            <!-- </div> -->
          </el-carousel-item>
        </el-carousel>

        <div class="title-container">
          <h1 class="title2">数字藏馆介绍</h1>
          <p style="font-size: 14px; color: gray">
            （在岁月的长河中，历史的回声悄然回荡。如果文物能够诉说，它们会讲述历经千年的风雨沧桑。而我们，唯有以敬畏之心，聆听它们的低语）
          </p>
        </div>
        <hr />

        <div class="content2">
          <p class="title3">欢迎踏入 “聆听历史的回响”</p>
          <blockquote>
            这座汇聚历史光辉的数字殿堂。在这里，文物不再是静默的展品，而是历史的生动叙述者。每一件文物都如同星辰般璀璨，承载着往昔的记忆与荣光，待您逐一探寻。
          </blockquote>

          <p class="highlight">借助前沿的人工智能技术，我们为文物赋予了全新的生命力。</p>

          <ul>
            <li class="intro">
              AI生成的文物背景故事，仿佛打开了一扇通往古代的神秘之门，让那些被时间遗忘的故事缓缓展开，或壮阔激昂，或细腻动人，让您仿佛穿越时空，与历史紧密相连。
            </li>

            <li class="intro">
              AI文物视频，以生动的画面重现文物诞生的辉煌时刻，或是工匠的精湛技艺，或是历史场景的生动再现，让您仿佛亲临其境，见证历史的流转。
            </li>
            <li class="intro">若您厌倦了文字，AI语音介绍也将为历史爱好者带来文物的轻声细语。</li>
          </ul>
          <p class="highlight">
            文化如同一位深邃的智者，虽不言不语，却通过文物传递着无尽的智慧与力量。
          </p>
          <p>历史宛如一曲悠长的乐章，虽不发一言，却在文物的每一道纹理、每一缕气息中回荡着余音。</p>
          <p>
            在这里，让我们一同在文物的世界中驻足，让浮躁的心灵在历史的滋养下恢复宁静，在岁月的静默中，倾听石语，感受历史的深沉回响。
          </p>
        </div>

        <h1 class="title2">文物的生命力</h1>
        <hr />

        <div class="common-layout">
          <el-container>
            <el-aside width="60%">
              <div>
                <div class="demo-image__lazy">
                  <!-- <el-image v-for="url in videos" :key="url" :src="url" lazy /> -->

                  <video
                    v-for="url in videos"
                    :key="url"
                    :src="url"
                    controls
                    loop
                    width="auto"
                    height="650px"
                    style="margin: 60px auto; display: block"
                  >
                    你的浏览器不支持视频标签。
                  </video>
                </div>
              </div>
            </el-aside>
            <el-container>
              <el-header class="header"> 文物的倾诉 </el-header>
              <el-main class="main-content"
                >文物与你说话，不再是冰冷的历史遗物，而是化身为时代的见证者，带着千年积淀的故事轻声诉说。它们穿越时空的缝隙，带你回到那个曾经辉煌的时代，仿佛能感受到匠人手中每一锤敲击的力量，每一丝细腻雕刻的温度。文物与你说话，仿佛是和历史的对话，每一道纹路、每一处裂痕，都讲述着一段不为人知的传奇。它们不仅仅是静止的物件，而是蕴含着无尽智慧和情感的生命体，正等待着你去倾听和理解。借助现代科技，尤其是人工智能的力量，文物的声音得以被唤醒，带领你深入探索那些被岁月遗忘的记忆，听见过去的回响，感知那份跨越时间的情感联结。在这段对话中，你将与历史亲密接触，穿越时光，触摸文明的脉搏。</el-main
              >
            </el-container>
          </el-container>
        </div>

        <div class="common-layout">
          <el-container>
            <el-container>
              <el-header class="header"> 神面形玉佩 </el-header>
              <div style="background-color: aliceblue;">
                <audio 
                style="margin: 0 auto;display: block;" ref="audioPlayer" controls src="http://aipe-speech.bj.bcebos.com/text_to_speech/2024-12-15/675ea9a1b98eeb0001a3f1fb/speech/0.mp3?authorization=bce-auth-v1%2FALTAKjI91nE52nvtDNRgFlUCVz%2F2024-12-15T10%3A04%3A30Z%2F259200%2F%2F44088dfbff04bd433dc4b753030db22de1613b8b2423752970362ec0af62b979"></audio>
              </div>
              <el-main class="main-content">
                在古老的红山文化中，流传着一个关于神面形玉佩的神秘传说。相传，在红山的深处，居住着一位拥有超凡力量的神祇，他的名字早已被时间遗忘，但他的形象却以一种特殊的方式流传了下来——那就是神面形玉佩。
                这枚玉佩，由最纯净的青玉雕琢而成，其上刻画着神祇的面容，那内凹的圆眼仿佛能洞察世间一切秘密，五组长齿显露出神祇的威严与力量，而那卷曲成勾云形的角状，则象征着神祇与天地之间的联系。
                传说中，这枚玉佩是神祇与人间沟通的媒介。每当人间遭遇灾难，或者需要神祇的指引时，部落的长老便会将这枚玉佩高举，向神祇祈求。而神祇，也会通过玉佩上的神面纹，向人间传达他的意志。
                然而，随着时间的流逝，红山文化逐渐衰落，神面形玉佩也失去了它的光辉。直到有一天，一位年轻的探险家在红山的遗迹中发现了这枚玉佩。当他拿起玉佩的那一刻，玉佩上的神面仿佛活了过来，内凹的圆眼闪烁着神秘的光芒，五组长齿似乎在低语着古老的咒语。
                探险家被这股神秘的力量所吸引，他开始研究这枚玉佩，试图解开其中的秘密。随着研究的深入，他发现玉佩上的神面纹与红山文化中的神话故事有着千丝万缕的联系。每当月圆之夜，玉佩上的神面似乎会更加活跃，仿佛在等待着某个重要的时刻。
                终于，在一次月圆之夜，探险家在玉佩的指引下，来到了红山的深处。在那里，他看到了一个古老的祭坛，祭坛上刻着与玉佩上相同的神面纹。当他将玉佩放在祭坛上时，一道光芒从玉佩中射出，照亮了整个祭坛。随着光芒的消散，神祇的形象逐渐显现，他的声音在探险家的心中响起，指引他走向了一个新的时代。
                从此，神面形玉佩不再是一个简单的玉器，它成为了连接过去与未来，神与人的桥梁。而那位探险家，也因为他的发现，被后人尊称为“红山的守护者”。</el-main
              >
            </el-container>

            <el-aside width="50%">

                <!-- <el-image v-for="url in videos" :key="url" :src="url" lazy /> -->

                <video
                  src="https://cdn.klingai.com/bs2/upload-kling-api/3601927415/image2video/CjS7emdSwTgAAAAAAXBeXw-0_raw_video_1.mp4"
                  controls
                  loop
                  width="100%"
                  height="auto"
                  style="height: 100%; display: block"
                >
                  你的浏览器不支持视频标签。
                </video>

            </el-aside>
          </el-container>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import { useArtifactStore } from '@/stores/artifactStore'

import { useRouter } from 'vue-router'

import { add_user_interaction, get_artifacts2 } from '@/api/request' // 导入API请求函数

const router = useRouter()

// const artifactStore = useArtifactStore()
const artifacts = ref([]) // 存储文物数据

const videos = ref([
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a1.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a2.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a3.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a4.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a5.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a6.mp4',
  'https://static-mp-c43f71ef-961a-42bc-ab24-48758fb2dfb5.next.bspapp.com/video/a7.mp4',
])

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

// 获取文物列表的函数
const fetchArtifacts = async () => {
  try {
    // loading.value = true  // 设置加载状态
    const response = await get_artifacts2() // 调用获取文物的 API 函数

    console.log(response)

    artifacts.value = response.data
  } catch (error) {
    console.error('获取文物列表失败:', error)
    alert('获取文物列表失败')
  }
}

// 从缓存加载文物数据
onMounted(() => {
  fetchArtifacts()
  // artifacts.value = artifactStore.$state.artifact
})

// 计算属性：实时计算随机选中的多个文物
const randomArtifacts = computed(() => {
  const numToSelect = 10 // 选择6个文物
  return getRandomItems(artifacts.value, numToSelect)
})

// 获取随机选中的多个文物
function getRandomItems(array, num) {
  const result = []
  const seenIndexes = new Set()

  while (result.length < num && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length)

    // 确保索引不重复
    if (!seenIndexes.has(randomIndex)) {
      result.push(array[randomIndex])
      seenIndexes.add(randomIndex)
    }
  }

  return result
}
</script>

<!-- <script setup>
import {ref,onMounted} from 'vue'
import { useArtifactStore } from '@/stores/artifactStore'

const artifactStore = useArtifactStore()

const artifacts = ref([])

const randomArtifacts = ref([]) // 存储随机选中的多个文物


// 从缓存加载文物数据
onMounted(() => {

  console.log("dasdasd",artifacts)

  artifacts.value = artifactStore.$state.artifact
  
  // 随机选择多个文物的数量
  const numToSelect = 5  // 比如选择5个文物

  // 如果 artifacts 数组不为空，从中随机选择多个文物
  if (artifacts.value.length > 0) {
    randomArtifacts.value = getRandomItems(artifacts.value, numToSelect)
  } else {
    console.log("没有文物数据可供选择")
  }
})

// 获取随机选中的多个文物
function getRandomItems(array, num) {
  const result = []
  const seenIndexes = new Set()

  while (result.length < num && result.length < array.length) {
    const randomIndex = Math.floor(Math.random() * array.length)

    // 确保索引不重复
    if (!seenIndexes.has(randomIndex)) {
      result.push(array[randomIndex])
      seenIndexes.add(randomIndex)
    }
  }

  console.log(randomArtifacts)

  return result
}

</script> -->

<style scoped>
/* .back {
  width: 100vw;
  height: 100vh;
  background-image: url(https://digicol.dpm.org.cn/images/bg2.jpg);
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  background-position: top center;
  background-size: cover;
  z-index: 1;
} */

/* .back {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 6%;
  background-color: rgb(91, 37, 40);

}  */

.back {
  position: relative;
  width: 100%;
  height: 100%;
  overflow-y: auto;
  padding-top: 4.7%;
  background-image: url(https://digicol.dpm.org.cn/images/bg2.jpg);
}

.video-background {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover; /* 保持视频的比例，裁剪并填充整个容器 */
  z-index: -1; /* 将视频放置在内容的下方 */
  pointer-events: none; /* 禁用视频的鼠标事件，防止用户操作 */
  animation: none !important; /* 确保没有任何动画影响视频 */
}

.content {
  position: relative;
  z-index: 1; /* 确保内容显示在视频上方 */
  color: rgb(12, 12, 12); /* 设置文本颜色，避免在视频背景下看不清楚 */
  z-index: 1; /* 确保内容显示在视频上方 */
}

.management-container {
  margin: -4px auto;
  width: 90%;
  height: fit-content; /* 自适应高度 */
  background-color: rgb(248, 244, 238); /* 管理容器背景色 */
  padding: 40px 40px;
  box-sizing: border-box;
  margin-bottom: 15%;
}

.image-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f8f4ee;
  border-radius: 5px;
  box-sizing: border-box;
  cursor: pointer;
}

.image-item img {
  width: auto;
  height: 100%;
  aspect-ratio: 48/30;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

.title {
  text-align: center; /* 水平居中 */
  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-size: 50px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  color: #4a4a4a; /* 设置字体颜色 */
  margin: 40px 0;
}

.title2 {
  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-weight: bold; /* 设置字体加粗 */
  color: #4a4a4a; /* 设置字体颜色 */
}

.title-container {
  margin-top: 100px;
  display: flex;
}

.demo-pagination-block + .demo-pagination-block {
  margin-top: 10px;
}
.demo-pagination-block .demonstration {
  margin-bottom: 16px;
}

.content2 {
  font-family: 'Arial', sans-serif;
  line-height: 1.8;
  color: #333;
  margin: 20px;
}

.intro {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.title3 {
  font-size: 24px;
  font-weight: bold;
  margin: 40px 0 20px 0;
  color: #3a3a3a;
}

.highlight {
  font-size: 20px;
  font-weight: bold;
  color: #ff6347; /* 使用温暖的颜色突出重要内容 */
}

blockquote {
  font-size: 18px;
  font-style: italic;
  border-left: 4px solid #ff6347;
  margin: 20px 0;
  padding-left: 20px;
  color: #666;
}

p {
  font-size: 16px;
  margin: 10px 0;
}

p:last-of-type {
  margin-bottom: 0;
}

.indent {
  font-size: 18px;
  margin-left: 20px; /* 缩进效果 */
  font-style: italic;
  color: #666;
}

.demo-image__lazy {
  height: 700px;
  overflow-y: auto;
}

.common-layout {
  margin-top: 100px;
}

.header {
  text-align: center;
  font-size: 2rem;
  font-weight: bold;
  color: #2c3e50;
  padding: 20px;
  background-color: #f4f6f8;
}

.main-content {
  flex: 1;
  padding: 20px;
  font-size: 1.2rem;
  line-height: 2;
  color: #34495e;
  background-color: #ecf0f1;
  text-align: justify;
}

.main-content p {
  margin-bottom: 20px;
}
</style>
