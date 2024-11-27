import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://ip:port', //后端地址
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',//应该不会用到其他的
  },
});

// 请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    // 在请求头加入 token
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    //如果有其他统一的错误处理再写
    return Promise.reject(error);
  }
);

export default axiosInstance;
