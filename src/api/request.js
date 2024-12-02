import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://123.249.42.133:80', //后端地址
  timeout: 100000,
  // headers: {
  //   'Content-Type': 'application/json',//应该不会用到其他的
  // },
});




// // 请求拦截器
// axiosInstance.interceptors.request.use(
//   (config) => {
//     // 在请求头加入 token
//     const token = localStorage.getItem('token');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // 响应拦截器
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     //如果有其他统一的错误处理再写
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;


export const get_artifacts = () => {

  return axiosInstance.get(`/api/artifacts`)
}


// 根据 id 获取文物数据
export const get_artifacts_by_id = (id) => {
  return axiosInstance.get(`/api/artifacts/${id}`)
}


export const get_artidact_location_by_id = (id) => {
  return axiosInstance.get(`/api/artifact_locations/${id}`)
}


//删除文物
export const test_delete_artifact = (id) => {
  // 获取当前存储的 token（例如从 Pinia store）
  const accessToken = localStorage.getItem('access_token');  // 或者使用 Pinia store 获取 token

  if (!accessToken) {
    // 如果没有 token，提示用户登录
    return Promise.reject(new Error('请先登录'));
  }

  // 发送 DELETE 请求并携带 Authorization header
  return axiosInstance.delete(`/api/artifacts/${id}`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // 将 token 加入请求头
    },
  });
};


// 添加文物
export const add_artifact = (artifactData) => {
  // 获取当前存储的 token（例如从 Pinia store 或 localStorage）
  const accessToken = localStorage.getItem('access_token');  // 或者使用 Pinia store 获取 token

  if (!accessToken) {
    // 如果没有 token，提示用户登录
    return Promise.reject(new Error('请先登录'));
  }

  // 发送 POST 请求并携带 Authorization header
  return axiosInstance.post('/api/artifacts', artifactData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // 将 token 加入请求头
    },
  }).then(response => {
    if (response.status === 201) {
      console.log('添加文物信息成功');
      return response.data; // 返回成功的响应数据
    } else {
      throw new Error(`添加文物信息失败，状态码：${response.status}`);
    }
  }).catch(error => {
    console.error('添加文物信息请求失败:', error);
    throw error;
  });
};



// 更新文物
export const update_artifact = (id, artifactData) => {
  // 获取当前存储的 token（例如从 localStorage 或 Pinia）
  const accessToken = localStorage.getItem('access_token');  // 或者使用 Pinia store 获取 token
  
  if (!accessToken) {
    // 如果没有 token，提示用户登录
    return Promise.reject(new Error('请先登录'));
  }

  // 构建请求头
  const headers = {
    Authorization: `Bearer ${accessToken}`,  // 将 token 加入请求头
  };

  // 发送 PUT 请求以更新文物信息
  return axiosInstance.put(`/api/artifacts/${id}`, artifactData, {
    headers: headers,
  })
  .then((response) => {
    if (response.status === 200) {
      console.log('文物信息更新成功');
      return response.data;  // 返回响应数据
    } else {
      console.error(`更新文物失败，状态码：${response.status}`);
      throw new Error(`更新文物失败，状态码：${response.status}`);
    }
  })
  .catch((error) => {
    console.error('更新文物信息失败:', error);
    throw error;
  });
};


//根据类别获取
export const get_artifact_by_category = async (category_query, limit = 10) => {
  try {
    const response = await axiosInstance.get(`/api/artifacts/category`, {
      params: {
        category: category_query,
        limit,
      }
    });
    return response.data; // 返回文物数据
  } catch (error) {
    console.error("Error fetching artifacts:", error);
    throw error;
  }
};


// 按文物类别统计数量
export const get_artifacts_count_by_category = async () => {
  try {
    // 发起 GET 请求
    const response = await axiosInstance.get('/api/artifacts/category/count');

    // 返回响应数据
    return response.data; 
  } catch (error) {
    console.error("Error fetching artifacts count by category:", error);
    throw error; // 如果发生错误，抛出异常
  }
};


export const login = (account, password) => {
  return axiosInstance.post('/api/users/login', {
    phone: account,
    password: password
  })
}





// 添加用户交互记录
export const add_user_interaction = (artifactId, interactionType='view') => {
  // 获取当前存储的 token（例如从 localStorage 或 Pinia store）
  const accessToken = localStorage.getItem('access_token');  // 或者使用 Pinia store 获取 token

  if (!accessToken) {
    // 如果没有 token，提示用户登录
    return Promise.reject(new Error('请先登录'));
  }

  // 请求数据
  const interactionData = {
    artifact_id: artifactId,
    interaction_type: interactionType,  // 交互类型，如 'view'
  };

  // 发送 POST 请求并携带 Authorization header
  return axiosInstance.post('/api/interactions', interactionData, {
    headers: {
      Authorization: `Bearer ${accessToken}`,  // 将 token 加入请求头
    },
  });
};


// 获取每个文物的交互次数
export const get_artifact_interaction_counts = async (limit = 10) => {
  try {
    const response = await axiosInstance.get('/api/interactions/count', {
      params: {
        limit,  // 设置请求的 limit 参数
      },
    });
    return response.data; // 返回数据
  } catch (error) {
    console.error("Error fetching artifact interaction counts:", error);
    throw error;
  }
};


// 根据文物类别获取交互数量统计
export const get_interactions_count_by_category = async () => {
  try {
    const response = await axiosInstance.get('/api/interactions/category/interactions_count');
    return response.data;  // 返回文物类别交互数量统计的数据
  } catch (error) {
    console.error("Error fetching interactions count by category:", error);
    throw error;  // 抛出错误，供上层处理
  }
};
