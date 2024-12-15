<template>
  <div class="back">
    <div class="form-container">
      <h2 style="text-align: center; margin-bottom: 20px; margin-top: 10px">
        {{ isEdit ? '更新文物信息' : '添加文物' }}
      </h2>
      <el-form
        ref="ruleFormRef"
        style="max-width: 600px"
        :model="ruleForm"
        :rules="rules"
        label-width="auto"
        class="demo-ruleForm"
        :size="formSize"
        status-icon
      >
        <el-form-item label="文物ID" prop="id" v-if="isEdit">
          <el-input v-model="ruleForm.id" disabled />
        </el-form-item>

        <el-form-item label="文物名称" prop="name">
          <el-input v-model="ruleForm.name" />
        </el-form-item>
        <el-form-item label="年代" prop="period">
          <el-input v-model="ruleForm.period" />
        </el-form-item>

        <el-form-item label="类别" prop="category">
          <el-select v-model="ruleForm.category" placeholder="选择类别">
            <el-option label="传世品" value="传世品" />
            <el-option label="革命文物" value="革命文物" />
            <el-option label="国史文物" value="国史文物" />
            <el-option label="货币" value="货币" />
            <el-option label="考古发掘品" value="考古发掘品" />
            <el-option label="民族民俗文物" value="民族民俗文物" />
            <el-option label="古籍文献" value="古籍文献" />
            <el-option label="外国文物" value="外国文物" />
            <el-option label="艺术品" value="艺术品" />
          </el-select>
        </el-form-item>
        <el-form-item label="参数" prop="parameter">
          <el-input v-model="ruleForm.parameter" />
        </el-form-item>
        <el-form-item label="出土地点和时间" prop="material">
          <el-input v-model="ruleForm.material" />
        </el-form-item>
        <el-form-item label="图片链接" prop="thumbnail_path">
          <el-input v-model="ruleForm.thumbnail_path" />
        </el-form-item>
        <el-form-item label="详情" prop="description">
          <el-input
            v-model="ruleForm.description"
            type="textarea"
            :autosize="{ minRows: 2, maxRows: 4 }"
          />
        </el-form-item>

        <el-form-item>
          <div style="width: 100%; display: flex; justify-content: center">
            <el-button type="primary" @click="submitForm(ruleFormRef)">
              {{ isEdit ? '更新文物' : '提交' }}
            </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>

            <el-button v-if="isEdit" @click="handleDelete(ruleForm.id)"> 删除文物 </el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useArtifactStore } from '@/stores/artifactStore'
import { add_artifact, update_artifact, test_delete_artifact,get_artifacts } from '@/api/request'

const artifactStore = useArtifactStore()
// import { useAdminStore } from '@/stores/useAdminStore'

// const adminStore = useAdminStore()

// // 获取管理员模式状态
// const isAdmin = computed(() => adminStore.isAdmin)

// Form reference
const ruleFormRef = ref(null)

// Form model
const ruleForm = reactive({
  id: '',
  name: '',
  period: '',
  category: '',
  parameter: '',
  material: '',
  thumbnail_path: '',
  description: '',
})

const handleDelete = async (id) => {
  try {
    await test_delete_artifact(id) // 调用删除函数
    alert('文物删除成功')
    // 删除成功后更新界面
  } catch (error) {
    alert(error.message) // 显示错误消息（如没有登录）
  }
}

const route = useRoute()
const router = useRouter()
// 当前页面是否是编辑页面（有 id 就是编辑，否则是添加）
const isEdit = ref(false)
const formTitle = ref('添加文物') // 默认显示添加文物

// 使用 onMounted 获取并填充路由传递的 query 参数
onMounted(() => {
  const { id } = route.params
  if (id) {
    isEdit.value = true
    formTitle.value = '更新文物'
    const { name, period, category, parameter, material, thumbnail_path, description } = route.query

    ruleForm.id = id || ''
    ruleForm.name = name || ''
    ruleForm.period = period || ''
    ruleForm.category = category || ''
    ruleForm.parameter = parameter || ''
    ruleForm.material = material || ''
    ruleForm.description = description || ''
    ruleForm.thumbnail_path = thumbnail_path || ''
  }
})

// Form validation rules
const rules = reactive({
  id: [
    {
      required: true,
      message: '请输入文物ID',
      trigger: 'blur',
    },
  ],

  name: [{ required: true, message: '请输入文物名', trigger: 'blur' }],

  period: [
    {
      required: false,
      message: '请输入文物的朝代',
      trigger: 'change',
    },
  ],
  category: [
    {
      required: true,
      message: '请选择文物的种类',
    },
  ],
  parameter: [
    {
      required: false,
      message: '请输入文物的参数',
      trigger: 'change',
    },
  ],
  material: [
    {
      required: false,
      message: '请输入文物的出土时间和出土地点',
      trigger: 'change',
    },
  ],
  thumbnail_path: [
    {
      required: false,
      message: '请输入正确的文物图片链接',
      trigger: 'change',
    },
  ],
  description: [
    {
      required: false,
      message: '请输入文物的详细描述',
      trigger: 'change',
    },
  ],
})

const fetchArtifacts = async () => {
  try {



    // loading.value = true  // 设置加载状态
    const response = await get_artifacts() // 调用获取文物的 API 函数


    artifactStore.setArtifactData(response.data) // 使用 Pinia store 更新数据

  } catch (error) {
    console.error('获取文物列表失败:', error)
    alert('获取文物列表失败')
  } 
}


const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate(async (valid, fields) => {
    if (valid) {
      if (isEdit.value) {
        // 更新文物
        await update_artifact(ruleForm.id, ruleForm)
        fetchArtifacts()
      } else {
        // 添加文物
        await add_artifact(ruleForm)
        fetchArtifacts()
      }
      // 跳转或显示成功信息
      router.push('/management')
    } else {
      console.log('error submit!', fields)
    }
  })
}

// Form reset
const resetForm = (formEl) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<style scoped>
.back {
  width: 100vw;
  min-height: 100vh;
  background-image: url(https://digicol.dpm.org.cn/images/bg2.jpg);
  /* background-color: rgb(91, 37, 40); */
  overflow-y: auto;
}

.form-container {
  width: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 6px;
  padding-top: 50px;
  background-color: #f4f4f4;
  box-sizing: border-box;
  border-radius: 10px;
}

.demo-ruleForm {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}
</style>
