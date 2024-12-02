// src/stores/useAdminStore.js
import { defineStore } from 'pinia';

export const useAdminStore = defineStore('admin', {
  state: () => ({
    isAdmin: false, // 管理员模式的状态
  }),
  actions: {
    toggleAdminMode() {
        // console.log('Before toggle:', this.isAdmin);
      this.isAdmin = !this.isAdmin; // 切换管理员模式状态
    //   console.log('aaaaa:', this.isAdmin);
    }
  }
});



export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: localStorage.getItem('access_token') || null, // 初始化时从 localStorage 获取令牌（如果存在）
  }),
  actions: {
    setAccessToken(token) {
      this.accessToken = token
      localStorage.setItem('access_token', token)  // 存储到 localStorage
    },
    clearAccessToken() {
      this.accessToken = null
      localStorage.removeItem('access_token')  // 从 localStorage 删除
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.accessToken,  // 判断是否登录
  }
})
