<template>
  <div class="back">
    <img src="@/assets/pic/qianLiJiangShangTu.jpg" alt="qianLiJiangShangTu" class="qianli" />
    <div class="management-container">
      <h1 class="title">文物列表</h1>

      <div class="search-panels">
        <div class="search-group">
          <input
            required=""
            type="text"
            v-model="searchQuery"
            name="text"
            autocomplete="on"
            class="input"
          />
          <label class="enter-label">请输入文物名称或ID </label>
          <div class="btn-box">
            <button class="btn-search" @click="handleSearch">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
                <path
                  d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"
                ></path>
                <circle id="svg-circle" cx="208" cy="208" r="144"></circle>
              </svg>
            </button>
          </div>
          <div class="btn-box-x">
            <button class="btn-cleare">
              <svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 384 512">
                <path
                  d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"
                  id="cleare-line"
                ></path>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div class="bar">
        <table>
          <colgroup>
            <!-- 设置每列宽度 -->
            <col style="width: 10%" />
            <col style="width: 20%" />
            <col style="width: 5%" />
            <col style="width: 20%" />
            <!-- <col style="width: 30%" /> -->
            <col style="width: 20%" />
            <col style="width: 15%" />
            <col style="width: 20%" />
          </colgroup>

          <thead>
            <tr>
              <th>文物编号</th>
              <th>文物名称</th>
              <th>年代</th>
              <!-- <th>类别</th> -->
              <th>
                <label for="categoryFilter"
                  >类别(
                  <select id="categoryFilter" v-model="selectedCategory">
                    <option value="">所有类别</option>
                    <option value="传世品">传世品</option>
                    <option value="革命文物">革命文物</option>
                    <option value="国史文物">国史文物</option>
                    <option value="货币">货币</option>
                    <option value="考古发掘品">考古发掘品</option>
                    <option value="名族名俗文物">名族名俗文物</option>
                    <option value="古籍文献">古籍文献</option>
                    <option value="外国文物">外国文物</option>
                    <option value="艺术品">艺术品</option>
                    <!-- 你可以根据实际的类别数据动态生成选项 --></select
                  >)</label
                >
              </th>

              <th>参数</th>
              <th>图片</th>
              <th>操作</th>
            </tr>
          </thead>
        </table>
      </div>


      <div class="collect">
        <table>
          <colgroup>
            <!-- 设置每列宽度 -->
            <col style="width: 10%" />
            <col style="width: 20%" />
            <col style="width: 5%" />
            <col style="width: 20%" />
            <!-- <col style="width: 30%" /> -->
            <col style="width: 20%" />
            <col style="width: 15%" />
            <col style="width: 20%" />
          </colgroup>
          <thead>
            <tr v-for="item in filteredArtifacts" :key="item.id">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>

              <td>{{ item.period }}</td>
              <td>{{ item.category }}</td>
              <!-- <td>{{ item.location_time }}</td> -->
              <td>{{ item.parameter }}</td>
              <td>
                <img
                  :src="item.thumbnail_path"
                  class="artifact-image"
                  alt="artifact image"
                  width="60"
                  height="60"
                />
              </td>
              <td class="action-buttons">
                <button @click="handleAction(item.id)" style="background-color: rgb(97, 41, 47)">
                  详细信息
                </button>

                <!-- <div > -->
                <button
                  @click="handleDelete(item.id)"
                  v-if="isAdmin"
                  style="background-color: rgb(220, 53, 69)"
                >
                  删除文物
                </button>
                <!-- </div>
                <div v-else></div> -->
              </td>
            </tr>
          </thead>
        </table>
      </div>





    </div>
  </div>
</template>

<script setup>
// 可以根据需要在这里添加逻辑

import { onMounted, ref } from 'vue'

import { useRouter } from 'vue-router'

import { useAdminStore } from '@/stores/useAdminStore' // 引入 Pinia store
// import { useCulturalInfoStore } from '@/stores/culturalInfo'

// import { watch } from 'vue';
import { computed } from 'vue'
import { useArtifactStore } from '@/stores/artifactStore'; // 引入 Pinia store
import { get_artifacts,test_delete_artifact } from '@/api/request' // 导入API请求函数


const artifactStore = useArtifactStore();


// 使用 Pinia store
const adminStore = useAdminStore()

// 获取管理员模式状态
const isAdmin = computed(() => adminStore.isAdmin)
const router = useRouter()

const artifacts = ref([])

// const handleAction = (id_) => {
//   const artifact = artifacts.value.find((item) => item.id === id_)
//   const { id, period, location_time, thumbnail_path, name, parameter, category, description } = artifact

//   router.push({
//     name: 'ArtifactDetail',
//     params: { id },
//     query: {
//       period,
//       location_time,
//       thumbnail_path,
//       name,
//       parameter,
//       category,
//       description,
//     },
//   })
// }


const handleAction = (id_) => {
  router.push({
    name: 'ArtifactDetail',
    params: { id: id_ },
  })
}



// 筛选的类别
const selectedCategory = ref('')

// 过滤后的文物列表（根据筛选条件）
const filteredArtifacts = computed(() => {

  return selectedCategory.value
    ? artifacts.value.filter((item) => item.category === selectedCategory.value)
    : artifacts.value
})


const searchQuery = ref('')

const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // 判断输入的是ID还是名称
    const searchTerm = searchQuery.value.trim()
    if (isNaN(searchTerm)) {
      // 如果是名称，则搜索文物名称（假设名称唯一）

      const artifact = artifacts.value.find((item) => item.name === searchTerm)
      const  id = artifact.id


      router.push({
        name: 'ArtifactDetail',
        params: { id:id },
        })

    } else {
      // 如果是ID，直接根据ID跳转

      const artifact = artifacts.value.find((item) => item.id == searchTerm)
      const  id = artifact.id

      router.push({
        name: 'ArtifactDetail',
        params: { id:id },
        })

    }
  } else {
    alert('请输入文物名称或ID')
  }
}



const handleDelete = async (id) => {
  try {
    await test_delete_artifact(id);  // 调用删除函数
    alert('文物删除成功');
    // 删除成功后更新界面

  } catch (error) {
    alert(error.message);  // 显示错误消息（如没有登录）
  }
};


// const loading = ref(true)
// const svg = `
//   <path class="path" d="
//     M 30 15
//     L 28 17
//     M 25.61 25.61
//     A 15 15, 0, 0, 1, 15 30
//     A 15 15, 0, 1, 1, 27.99 7.5
//     L 15 15
//   " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
// `


// 获取文物列表的函数
const fetchArtifacts = async () => {
  try {
    // loading.value = true  // 设置加载状态
    const response = await get_artifacts();  // 调用获取文物的 API 函数
    if (response.status === 200) {
      artifactStore.setArtifactData(response.data.data);  // 使用 Pinia store 更新数据
      artifacts.value = artifactStore.$state.artifact;  // 更新本地的数据
    } else {
      alert('获取文物列表失败');
    }
  } catch (error) {
    console.error('获取文物列表失败:', error);
    alert('获取文物列表失败');
  }
  // finally {
  //   // loading.value = false  // 结束加载状态
  //   loadingInstance1.close()
  // }
};

// 页面加载时获取文物列表
onMounted(() => {
  // 如果本地缓存没有文物数据，则从 API 加载数据
  if (artifactStore.$state.artifact.length === 0) {
    fetchArtifacts();
  } else {
    artifacts.value = artifactStore.$state.artifact;  // 从缓存加载数据
  }
});

// onMounted(async () => {
//   // 如果本地缓存已经有文物数据，则直接从缓存加载
//   if (artifactStore.$state.artifact.length === 0) {
//     try {
//       const response = await get_artifacts(); // 你的 API 请求
//       console.log(response);

//       // 使用 Pinia store 保存数据
//       artifactStore.setArtifactData(response.data.data);

//       console.log('从 API 获取并保存数据成功');
//     } catch (error) {
//       console.error('获取文物详情失败:', error);
//     }
//   }

//   artifacts.value=artifactStore.$state.artifact
// });


</script>

<style scoped>
.back {
  width: 100vw;
  height: 100vh;
  background-color: rgb(91, 37, 40); /* 背景颜色 */
  overflow-y: auto; /* 如果内容超出，允许垂直滚动 */
}

.management-container {
  margin: -4px auto;
  width: 80%;
  height: fit-content; /* 自适应高度 */
  background-color: rgb(248, 244, 238); /* 管理容器背景色 */
  padding: 40px 15px;
  box-sizing: border-box;
  margin-bottom: 15%;
}

.title {
  text-align: center; /* 水平居中 */
  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-size: 40px; /* 设置字体大小 */
  font-weight: bold; /* 设置字体加粗 */
  color: #4a4a4a; /* 设置字体颜色 */
  margin-bottom: 30px;
}
.qianli {
  height: 40%;
  width: 100%;
  margin-bottom: 0;
}

.bar {
  width: 100%;
  height: 50px;
  background-color: rgb(151, 66, 75);
  margin: 0;
  padding: 0;

  display: flex; /* 让子元素使用弹性布局 */
  justify-content: space-evenly; /* 子元素均匀分布 */
  align-items: center; /* 垂直方向居中 */

  margin-bottom: 25px;
}

.bar table {
  width: 100%; /* 表格占满父容器宽度 */
  border-collapse: collapse; /* 去掉单元格之间的间隙 */
  text-align: center; /* 表格内容居中 */
}

.bar th {
  padding: 5px 10px; /* 给单元格添加适当内边距 */
  color: white; /* 设置文字颜色 */
  font-weight: bold; /* 加粗文字 */
}

.collect {
  width: 100%;
  background-color: rgb(255, 255, 255);
  margin: 0;
  padding: 0;
  display: flex; /* 让子元素使用弹性布局 */
  justify-content: center; /* 子元素均匀分布 */
  align-items: center; /* 垂直方向居中 */
}

.collect table {
  width: 100%; /* 表格占满父容器宽度 */
  border-collapse: collapse; /* 合并边框间隙 */
  text-align: center; /* 表格内容居中 */
}

.collect tr {
  border-bottom: 4px solid rgb(248, 244, 238); /* 为每一行添加灰色的底边线 */
  height: 80px;
}

.collect td {
  padding: 10px; /* 为单元格添加适当的内边距 */
  font-weight: bold; /* 加粗文字 */
  color: rgb(2, 2, 2); /* 设置文字颜色 */
}

.collect tr:last-child {
  border-bottom: none; /* 去掉最后一行的底边线 */
}

.collect .action-buttons {
  text-align: center;
  /* display: flex; */

  flex-direction: column;
  align-items: center;

  gap: 10px;
}

.collect .action-buttons button {
  background-color: #007bff; /* 设置按钮的背景色 */
  border-radius: 8px; /* 更加圆润的边角 */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* 添加阴影 */
  margin: 3px 5px;
  color: white; /* 设置字体颜色 */
  padding: 5px 5px; /* 设置内边距 */
  font-size: 10px; /* 设置字体大小 */
  transition: all 0.1s ease; /* 平滑过渡 */
  width: 70px; /* 设置按钮宽度 */
  height: 30px; /* 设置按钮高度 */
  font-weight: bold; /* 加粗文字 */
}

/* 悬浮效果 */
.collect .action-buttons button:hover {
  box-shadow: 0 4px 10px rgba(236, 5, 5, 0.2); /* 增加阴影 */
  transform: scale(1.1); /* 鼠标悬停时稍微放大 */
}

p {
  font-size: 24px;
  color: #333;
  margin: 20px 0; /* 段落间距 */
}

.artifact-image {
  width: 60px; /* 设置图片的默认宽度 */
  height: 60px; /* 设置图片的默认高度 */
  transition: transform 0.3s ease; /* 设置平滑过渡效果 */
}

.artifact-image:hover {
  transform: scale(3); /* 悬浮时放大 1.2 倍 */
}

/* 隐藏select框的样式 */
#categoryFilter {
  -webkit-appearance: none; /* 移除默认的下拉框样式 (适用于Webkit浏览器) */
  -moz-appearance: none; /* 移除默认的下拉框样式 (适用于Firefox) */
  appearance: none; /* 移除默认的下拉框样式 (适用于所有浏览器) */
  background: transparent; /* 背景设置为透明 */
  border: none; /* 移除边框 */
  padding: 1px; /* 设置内边距，给箭头留出空间 */
  width: auto; /* 设置宽度，按需调整 */
  cursor: pointer; /* 设置鼠标样式为指针 */
  color: white; /* 设置文字颜色 */
  font-weight: bold; /* 加粗文字 */
  font-size: 15px;
}

#categoryFilter option {
  color: #333; /* 待选择的选项文字颜色 */
  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-weight: bold; /* 加粗文字 */
}

/* 自定义下拉箭头样式 */
#categoryFilter::after {
  content: '▼'; /* 使用 Unicode 字符来创建自定义箭头 */
  font-size: 16px; /* 设置箭头的大小 */
  position: absolute; /* 使用绝对定位 */
  right: 10px; /* 设置箭头的位置，距离右侧一定距离 */
  top: 50%; /* 垂直居中 */
  transform: translateY(-50%); /* 精确垂直居中 */
  pointer-events: none; /* 确保箭头不干扰点击 */
  color: rgb(3, 3, 3);
}

.input-container {
  position: relative;
  margin: 50px auto;
  width: 200px;
}

.input-container input[type='text'] {
  font-size: 20px;
  width: 100%;
  border: none;
  border-bottom: 2px solid #ccc;
  padding: 5px 0;
  background-color: transparent;
  outline: none;
}

.input-container .label {
  position: absolute;
  top: 0;
  left: 0;
  color: #ccc;
  transition: all 0.3s ease;
  pointer-events: none;
}

.input-container input[type='text']:focus ~ .label,
.input-container input[type='text']:valid ~ .label {
  top: -20px;
  font-size: 16px;
  color: #333;
}

.input-container .underline {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  width: 100%;
  background-color: #333;
  transform: scaleX(0);
  transition: all 0.3s ease;
}

.input-container input[type='text']:focus ~ .underline,
.input-container input[type='text']:valid ~ .underline {
  transform: scaleX(1);
}

/* From Uiverse.io by Li-Deheng */
.search-panels {
  --default-color: #9e9e9e;
  --color-text: #ccc;
  --color-active: rgb(151, 66, 75);
  --color-active-input: #f5f5f5;
  --transition: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --width-input: 200px;
  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */
  font-weight: bold; /* 设置字体加粗 */
  display: flex;
  justify-content: flex-end; /* 将输入框对齐到右侧 */
  width: 100%; /* 确保父容器占满全宽 */
  padding: 10px;
}

.search-group {
  position: relative;
}

.input {
  width: var(--width-input);
  border: solid 1.5px var(--default-color);
  border-radius: 80px;
  background: none;
  padding: 20px 3rem 15px 10px;

  font-size: 1rem;
  color: var(--color-active-input);
  transition: border var(--transition);
  color: #333;
  height: 10%;
  margin-right: 20px;
}

.enter-label {
  position: absolute;
  left: 15px;
  color: var(--default-color);
  pointer-events: none;
  transform: translateY(1rem);
  transition: var(--transition);
}

.enter-label {
  color: var(--default-color);
  pointer-events: none;
}

.input:focus,
input:valid {
  outline: none;
  border: 1.5px solid var(--color-active);
}

.input:focus ~ label,
input:valid ~ label {
  transform: translateY(-50%) scale(0.8);
  background-color: var(--color-active);
  border-radius: 20px;
  padding: 0.2em 0.6em;
  color: var(--color-text);
}

.btn-box {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1em;
  right: 80%;
  border-radius: 100%;
  transition: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 100ms;
  opacity: 0;
}

.input:focus ~ .btn-box,
input:valid ~ .btn-box {
  right: 10%;
  opacity: 1;
  transition-delay: 0s;
  transition: var(--transition);
}

.input:not(:focus) ~ .btn-box,
input:not(:valid) ~ .btn-box {
  transition-property: right, opacity;
  transition-delay: 300ms;
}

.input:focus ~ .btn-box:hover,
input:valid ~ .btn-box:hover {
  transform: scale(1.2);
}

.input:focus ~ .btn-box:hover:active,
input:valid ~ .btn-box:hover:active {
  transform: scale(1);
}

.btn-search {
  position: relative;
  cursor: pointer;
  background-color: var(--color-active);
  width: 2em;
  height: 2em;
  top: 2.5px;
  border: none;
  border-radius: 100%;
  padding: 0;
  transition: var(--transition);
}

.btn-search:active {
  transform: scale(1);
}

.btn-search svg {
  position: absolute;
  top: 25%;
  left: 25%;
  fill: var(--color-text);
  width: 12px;
  height: 12px;
}

#svg-circle {
  fill: var(--color-text);
  transition: var(--transition);
}

.input:focus ~ .btn-box:hover #svg-circle,
input:valid ~ .btn-box:hover #svg-circle {
  fill: transparent;
}

.btn-box-x {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 1em;
  right: 7%;
  opacity: 0;
  transform: rotate(-90deg) scale(0.1);
  transition: var(--transition);
}

.input:focus ~ .btn-box-x,
input:valid ~ .btn-box-x {
  opacity: 1;
  transform: rotate(0) scale(1);
}

.btn-cleare {
  position: relative;
  cursor: pointer;
  background-color: transparent;
  width: 2em;
  height: 2em;
  border: none;
  border-radius: 100%;
  padding: 0;
  transition: var(--transition);
}

.btn-cleare svg {
  width: 15px;
  height: 15px;
}

#cleare-line {
  fill: var(--default-color);
}

.btn-box-x:hover #cleare-line {
  fill: var(--color-active);
}
</style>
