<template>
  <div class="bg">
    <form class="form login" @submit.prevent="handleLogin">
      <!-- 退出登录按钮，只有在已登录时显示 -->
      <div v-if="isAuthenticated">
        <input class="submit" type="submit" @click="handleLogout" value="退出登录" />
      </div>

      <div v-else>
        <span class="input-span">
          <label for="text" class="label">账号</label>
          <input v-model="account" type="text" name="text" id="text" />
        </span>
        <span class="input-span">
          <label for="password" class="label">密码</label>
          <input v-model="password" type="password" name="password" id="password" />
        </span>
        <input class="submit" type="submit" value="登录" />
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import { login } from '@/api/request' // 导入API请求函数
import { useAuthStore } from '@/stores/useAdminStore' // 导入 Pinia store
import { ElMessage } from 'element-plus'

// 表单数据
const account = ref('')
const password = ref('')

// 获取 Pinia store 实例
const authStore = useAuthStore()

// 判断是否已登录
const isAuthenticated = computed(() => authStore.isAuthenticated)

// 处理登录请求
const handleLogin = async () => {
  try {
    const response = await login(account.value, password.value)

    if (response.status === 200) {
      // 获取并存储 JWT 令牌
      const accessToken = response.data.access_token

      authStore.setAccessToken(accessToken)

      ElMessage({
        message: '登录成功',
        type: 'success',
        customClass: 'el-message-success',
      })
    }
  } catch (error) {
    console.error('登录失败', error)

    ElMessage({
      message: '登录失败，请检查账号和密码，如果没有管理员账号请联系平台开发者',
      type: 'error',
    })
  }
}

// 处理退出登录
const handleLogout = () => {
  // 清除存储的 JWT 令牌
  authStore.clearAccessToken()

  ElMessage({
    message: '您已成功退出登录',
    type: 'success',
    customClass: 'el-message-success',
  })
}
</script>

<style scoped>
.bg {
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
}

.login {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f5f5f5;
  border-radius: 25px;
  padding: 40px 50px;
  box-sizing: border-box;
}

.form {
  --bg-light: #efefef;
  --bg-dark: #707070;
  --clr: #58bc82;
  --clr-alpha: #9c9c9c60;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  max-width: 500px;
  padding: 40px 100px;
}

.input-span {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.form input[type='text'],
.form input[type='password'] {
  border-radius: 0.5rem;
  padding: 1rem 0.75rem;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #d5d5d560;
  outline: 2px solid grey;
  width: 100%;
  margin-bottom: 20px;
}

.form input[type='text']:focus,
.form input[type='password']:focus {
  outline: 2px solid #5b2528;
}

.label {
  align-self: flex-start;
  color: #5b2528;
  font-weight: 600;
}

.submit {
  padding: 1rem 0.75rem;
  width: 100%;
  border-radius: 3rem;
  background-color: #5b2528;
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  transition: all 300ms;
  font-weight: 600;
  font-size: 0.9rem;
  margin-left: 10px;
  margin-top: 10px;
}

.logout {
  padding: 1rem 0.75rem;
  width: 88%;
  border-radius: 3rem;
  background-color: #5b2528;
  color: var(--bg-light);
  border: none;
  cursor: pointer;
  transition: all 300ms;
  font-weight: 600;
  font-size: 0.9rem;
}

.submit:hover {
  background-color: #8d6371;
  color: white;
}

.span {
  text-decoration: none;
  color: var(--bg-dark);
}

.span a {
  color: var(--clr);
}
</style>
