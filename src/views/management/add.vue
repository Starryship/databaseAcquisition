<template>
  <div class="back">
    <div class="form-container management-container">
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
        <el-form-item label="文物ID" prop="id">
          <el-input v-model="ruleForm.id" />
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
            <el-option label="名族名俗文物" value="名族名俗文物" />
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
          <div style="width: 100%;display: flex;justify-content: center;">
            <el-button type="primary" @click="submitForm(ruleFormRef)"> 提交 </el-button>
            <el-button @click="resetForm(ruleFormRef)">重置</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

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

// Form submission
const submitForm = async (formEl) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
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
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f4f4f4;
}

.demo-ruleForm {
  width: 100%;
  margin-top: 15%;
  max-width: 600px;
}

.back {
  width: 100vw;
  height: 100vh;
  background-color: rgb(91, 37, 40); /* 背景颜色 */
  overflow-y: auto; /* 如果内容超出，允许垂直滚动 */
}

.management-container {
  margin: 0px auto;
  width: 80%;
  height: fit-content; /* 自适应高度 */
  background-color: rgb(248, 244, 238); /* 管理容器背景色 */
  padding: 120px 40px 50px 40px;
  margin-bottom: 15%;
}
</style>
