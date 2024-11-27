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
