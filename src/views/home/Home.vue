<template>
    <div>


      <h1></h1>

    </div>
</template>
  
<script setup>
  // 可以根据需要在这里添加逻辑
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333;
  padding: 10px 0;
  z-index: 1000; /* 确保导航栏在其他内容之上 */
}

.navbar ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
}

.navbar li {
  margin: 0 15px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  padding: 10px 20px;
}

.navbar a:hover {
  background-color: #575757;
  border-radius: 5px;
}

/* 页面内容样式 */
.content {
  margin-top: 60px; /* 给页面内容添加足够的上边距，避免被导航栏遮挡 */
  padding: 20px;
  height: 2000px; /* 让页面有滚动效果 */
}
</style>
