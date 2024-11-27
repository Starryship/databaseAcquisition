<template>
  <div>
    <p>展示</p>
  </div>
  <div>
    <p>展示</p>
  </div>
  <div>
    <p>展示</p>
  </div>
  <div>
    <p>展示</p>
  </div>
  <el-button @click="open1">asassaas</el-button>
  <el-button>asassaas</el-button>
  <el-button>asassaas</el-button>
  <el-button>asassaas</el-button>
  <el-button>asassaas</el-button>
</template>

<script setup>
import { ElMessage } from 'element-plus';
const open1 = () => {
  ElMessage('aaaa.')
}
// 可以根据需要在这里添加逻辑
</script>

<style scoped></style>
