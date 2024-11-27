<template>
  <!-- 悬浮在顶部的导航栏 -->
  <nav class="navbar">
    <ul>
      <li><router-link to="/home">首页</router-link></li>
      <li><router-link to="/exhibit">文物展示</router-link></li>
      <li><router-link to="/management">文物管理</router-link></li>
      <li><router-link to="/personal">管理员中心</router-link></li>
    </ul>
  </nav>
  <!-- 显示子路由的组件 -->
  <router-view></router-view>


  <div class="tooltip-container">
    <div class="button-content">
      <span class="text">工具</span>


      <svg
        class="share-icon"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="24"
        height="24"
      >
        <path
          d="M19 5h-4V4c0-.55-.45-1-1-1H10c-.55 0-1 .45-1 1v1H5c-1.1 0-1.99.9-1.99 2L3 17c0 1.1.89 2 1.99 2h14c1.1 0 1.99-.9 1.99-2l-.01-10c0-1.1-.89-2-1.99-2zm-7 0H12V4h-2v1zm6 12H7V7h12v10z"
        />
      </svg>

    </div>




    <div class="tooltip-content">
      <div class="social-icons">


        <ul class="example-2">
          <li class="icon-content">

        <a @click="toggleAdminMode"  data-social="mana" href="#" class="social-icon fix">
          
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path
              d="M19.14 12.94l1.42-1.42c.2-.2.26-.51.19-.77l-1.27-3.88c.06-.35-.07-.71-.33-.92L16.18 3.95c-.23-.26-.56-.38-.89-.33l-3.88 1.27c-.27-.1-.58-.11-.86-.03l-1.44-2.11a.75.75 0 0 0-.9-.26l-2.66 1.55c-.34.19-.46.59-.32.92l1.27 3.88c-.07.35.07.71.33.92l3.62 3.62a3.99 3.99 0 0 0-.01 1.49l-3.62 3.62c-.26.23-.39.58-.33.92l1.27 3.88c-.14.34-.02.71.19.77l1.42 1.42c.2.2.51.26.77.19l3.88-1.27c.27.1.57.11.86.03l1.44 2.11a.75.75 0 0 0 .9.26l2.66-1.55c.34-.19.46-.59.32-.92l-1.27-3.88c.07-.35-.07-.71-.33-.92l-3.62-3.62c-.19-.19-.44-.34-.72-.44zM12 15c-1.38 0-2.5-1.12-2.5-2.5S10.62 10 12 10s2.5 1.12 2.5 2.5S13.38 15 12 15z"
            />
          </svg>
        </a>

        <div class="tooltip">管理员</div>
        </li>
      </ul>



      <ul class="example-2">
        <li class="icon-content">
        <a href="#" data-social="aa" class="social-icon add">


          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
            <path d="M19 13H5v-2h14v2zM12 5v14h-2V5h2z" />
          </svg>
        </a>

        <div class="tooltip">添加文物</div>
        </li>
      </ul>

        

      </div>
    </div>
  </div>
</template>

<script setup>
// 可以根据需要在这里添加逻辑
import { useAdminStore } from '@/stores/useAdminStore' // 引入 Pinia store


// 使用 Pinia store
const adminStore = useAdminStore()


// 切换管理员模式
const toggleAdminMode = () => {
  adminStore.toggleAdminMode()
}
</script>

<style scoped>
/* 导航栏样式 */
.navbar {
  position: fixed; /* 固定位置 */
  top: 0;
  left: 0;
  width: 100%;
  background-color: rgba(112, 60, 78, 80%);
  padding: 20px 0;
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
  margin: 0 30px;
}

.navbar a {
  color: white;
  text-decoration: none;
  font-size: 23px;
  padding: 10px 20px;
  position: relative; /* 为了定位下划线 */
}

.navbar a:hover::after {
  content: ''; /* 创建一个空的伪元素 */
  position: absolute;
  bottom: 0; /* 将下划线定位在链接的底部 */
  left: 0;
  width: 100%; /* 下划线宽度为100%，即和链接宽度一致 */
  height: 3px; /* 设置下划线的高度 */
  background-color: white; /* 设置下划线颜色为白色 */
}

/* 当链接被选中时，添加白色下划线 */
.navbar a.router-link-active::after {
  content: ''; /* 创建一个空的伪元素 */
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background-color: white; /* 给选中的链接添加白色下划线 */
}

/* 页面内容样式 */
.content {
  margin-top: 60px; /* 给页面内容添加足够的上边距，避免被导航栏遮挡 */
  height: 2000px; /* 让页面有滚动效果 */
}

.admin-toggle-button {
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  z-index: 1000;
}

.admin-toggle-button:hover {
  background-color: #0056b3;
}

/* From Uiverse.io by Mohammad-Rahme-576 */
/* Container Styles */
.tooltip-container {
  position: fixed; /* 使容器固定在视口中 */
  bottom: 10%; /* 距离屏幕底部20px */
  right: 5%; /* 距离屏幕右侧20px */
  /* position: relative; */
  display: inline-block;
  font-family: 'Arial', sans-serif;
  overflow: visible;
  z-index: 2000; /* 确保导航栏在其他内容之上 */
}

/* Button Styles */
.button-content {
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  color: white;
  padding: 14px 28px;
  border-radius: 50px;
  cursor: pointer;
  transition:
    background 0.4s cubic-bezier(0.25, 0.8, 0.25, 1),
    transform 0.3s ease,
    box-shadow 0.4s ease;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 10;
  overflow: hidden;
}

.button-content::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(135deg, rgba(110, 142, 251, 0.4), rgba(167, 119, 227, 0.4));
  filter: blur(15px);
  opacity: 0;
  transition: opacity 0.5s ease;
  z-index: -1;
}

.button-content::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0) 70%);
  transform: scale(0);
  transition: transform 0.6s ease-out;
  z-index: -1;
}

.button-content:hover::before {
  opacity: 1;
}

.button-content:hover::after {
  transform: scale(1);
}

.button-content:hover {
  background: linear-gradient(135deg, #a777e3, #6e8efb);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  transform: translateY(-4px) scale(1.03);
}

.button-content:active {
  transform: translateY(-2px) scale(0.98);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
}

.text {
  font-size: 18px;
  font-weight: 600;
  margin-right: 12px;
  white-space: nowrap;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  transition: letter-spacing 0.3s ease;
}

.button-content:hover .text {
  letter-spacing: 1px;
}

.share-icon {
  fill: white;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    fill 0.3s ease;
  filter: drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1));
}

.button-content:hover .share-icon {
  transform: rotate(180deg) scale(1.1);
  fill: #ffffff;
}

/* Tooltip Styles */
.tooltip-content {
  position: absolute;
  /* top: 102%; */
  bottom: 130%; /* 改为从下方向上展开 */
  left: 50%;
  transform: translateX(-50%) scale(0.8);
  /* background: white; */
  border-radius: 15px;
  padding: 22px;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
  opacity: 0;
  visibility: hidden;
  transition:
    opacity 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    transform 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    visibility 0.5s ease;
  z-index: 100;
  pointer-events: all;
  backdrop-filter: blur(10px);
  background: rgba(164,164,244, 0.4);
}

.tooltip-container:hover .tooltip-content {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) scale(1);
  pointer-events: auto;
  transition-delay: 0s;
}

.tooltip-container .tooltip-content {
  transition-delay: 0.5s;
}



/* Social Icons Styles */
.social-icons {
  display: flex;
  justify-content: space-between;
  gap: 12px;
}

.social-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #f0f0f0;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    background 0.3s ease,
    box-shadow 0.4s ease;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.social-icon::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.8) 0%,
    rgba(255, 255, 255, 0) 70%
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.social-icon:hover::before {
  opacity: 1;
}

.social-icon svg {
  width: 24px;
  height: 24px;
  fill: #333;
  transition:
    transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55),
    fill 0.3s ease;
  z-index: 1;
}

.social-icon:hover {
  transform: translateY(-5px) scale(1.1);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.social-icon:active {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

.social-icon:hover svg {
  transform: scale(1.2);
  fill: white;
}


.social-icon.fix:hover {
  background: linear-gradient(135deg, #1da1f2, #1a91da);
}

.social-icon.add:hover {
  background: linear-gradient(135deg, #1da1f2, #1a91da);
}

/* Animation for Pulse Effect */
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 0 rgba(110, 142, 251, 0.4);
  }
  70% {
    box-shadow: 0 0 0 20px rgba(110, 142, 251, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(110, 142, 251, 0);
  }
}

.button-content {
  animation: pulse 3s infinite;
}

/* Hover Ripple Effect */
@keyframes ripple {
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
}

.button-content::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.3);
  border-radius: inherit;
  transform: scale(0);
  opacity: 0;
}

.button-content:active::before {
  animation: ripple 0.6s linear;
}

/* Tooltip Arrow */
.tooltip-content::before {
  content: '';
  position: absolute;
  top: 100%;
  left: 50%;
  transform: translateX(-50%);
  border-width: 10px 10px 0px 10px;
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.9) transparent transparent transparent;
  filter: drop-shadow(0 -3px 3px rgba(126, 44, 44, 0.1));
}

/* Accessibility */
.button-content:focus {
  outline: none;
  box-shadow:
    0 0 0 3px rgba(110, 142, 251, 0.5),
    0 8px 15px rgba(0, 0, 0, 0.1);
}

.button-content:focus:not(:focus-visible) {
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .button-content {
    padding: 12px 24px;
    border-radius: 40px;
  }

  .text {
    font-size: 16px;
  }

  .tooltip-content {
    width: 240px;
    padding: 18px;
  }

  .social-icon {
    width: 44px;
    height: 44px;
  }

  .social-icon svg {
    width: 20px;
    height: 20px;
  }
}

@media (max-width: 480px) {
  .button-content {
    padding: 10px 20px;
  }

  .text {
    font-size: 14px;
  }

  .tooltip-content {
    width: 200px;
    padding: 15px;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-icon svg {
    width: 18px;
    height: 18px;
  }
}

/* Dark Mode Support */
@media (prefers-color-scheme: dark) {
  .tooltip-content {
    background: rgba(30, 30, 30, 0.9);
    color: white;
  }

  .tooltip-content::before {
    border-color: transparent transparent rgba(30, 30, 30, 0.9) transparent;
  }

  .social-icon {
    background: #2a2a2a;
  }

  .social-icon svg {
    fill: #e0e0e0;
  }
}

/* Print Styles */
@media print {
  .tooltip-container {
    display: none;
  }
}

/* Reduced Motion */
@media (prefers-reduced-motion: reduce) {
  .button-content,
  .share-icon,
  .social-icon,
  .tooltip-content {
    transition: none;
  }

  .button-content {
    animation: none;
  }
}

/* Custom Scrollbar for Tooltip Content */
.tooltip-content::-webkit-scrollbar {
  width: 6px;
}

.tooltip-content::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.tooltip-content::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 3px;
}

.tooltip-content::-webkit-scrollbar-thumb:hover {
  background: #555;
}







/* From Uiverse.io by PriyanshuGupta28 */ 
ul {
  list-style: none;
}

.example-2 {
  display: flex;
  justify-content: center;
  align-items: center;

}
.example-2 .icon-content {
  margin: 1px 1px;
  position: relative;


}
 
.example-2 .icon-content .tooltip {
  position: absolute;
  top: -40px;
  left: 50%;
  width: 60px;
  transform: translateX(-50%);
  color: #050505;
  padding: 6px 10px;
  border-radius: 5px;
  opacity: 0;
  visibility: hidden;
  font-size: 14px;
  transition: all 0.3s ease;

  font-family: 'KaiTi', 'STKaiti', serif; /* 设置优雅字体 */

  font-weight: bold; /* 设置字体加粗 */
}
.example-2 .icon-content:hover .tooltip {
  opacity: 1;
  visibility: visible;
  top: -50px;
}

 
.example-2 .icon-content a {
  position: relative;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #4d4d4d;
  background-color: #fff;
  transition: all 0.3s ease-in-out;
}


.example-2 .icon-content a:hover {
  box-shadow: 3px 2px 45px 0px rgb(0 0 0 / 12%);
}


.example-2 .icon-content a svg {
  position: relative;
  z-index: 1;
  width: 30px;
  height: 30px;
}

.example-2 .icon-content a:hover {
  color: white;
}
.example-2 .icon-content a .filled {
  position: absolute;
  top: auto;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0;
  background-color: #000;
  transition: all 0.3s ease-in-out;
}
.example-2 .icon-content a:hover .filled {
  height: 100%;
}
.example-2 .icon-content a[data-social="mana"] .filled,
.example-2 .icon-content a[data-social="mana"] ~ .tooltip {
  background-color: rgba(162,131,218,0.7);
}
.example-2 .icon-content a[data-social="aa"] .filled,
.example-2 .icon-content a[data-social="aa"] ~ .tooltip {
  background-color: rgba(133,152,248,0.7);
}







</style>
