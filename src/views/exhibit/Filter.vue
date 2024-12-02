<template>
  <div class="filter">
    <div class="checkbox-groups">
      <checkbox
        v-for="(item, index) in sorts"
        :key="item.id"
        v-model="item.isChecked"
        :text="item.text"
        :id="index"
        @change="handleCheckboxChange"
      />
    </div>

    <div class="search">
      <div class="inputbox">
        <input required="required" type="text" />
        <span>文物名称</span>
        <i></i>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref  } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

// 传世品、革命文物、国史文物、货币、考古发掘品、名族名俗文物、古籍文献、外国文物、艺术品
const sorts = ref([
  {
    text: '传世品',
    isChecked: false,
  },
  {
    text: '货币',
    isChecked: false,
  },
  {
    text: '艺术品',
    isChecked: false,
  },
  {
    text: '革命文物',
    isChecked: false,
  },
  {
    text: '国史文物',
    isChecked: false,
  },
  {
    text: '考古发掘品',
    isChecked: false,
  },
  {
    text: '名族名俗文物',
    isChecked: false,
  },
  {
    text: '古籍文献',
    isChecked: false,
  },
  {
    text: '外国文物',
    isChecked: false,
  },
]);


// const searchText = ref('') // 文物名称搜索框内容

// 父组件传递的更新数据函数
const emitCategoryChange = defineEmits(['categoryChanged'])

// 监听复选框变化
const handleCheckboxChange = () => {
  // 过滤选中的类别
  // const selectedCategories = sorts.value.filter(item => item.isChecked).map(item => item.text);
    
  // 过滤选中的类别
    const selectedCategories = sorts.value
    .filter(item => item.isChecked)
    .map(item => item.text)
    .filter(Boolean);  // 过滤掉任何假值，如 undefined 或 null


  // 发送选中的类别给父组件
  emitCategoryChange(selectedCategories);
};

// // 监听搜索框的变化（如果需要使用搜索）
// watch(searchText, (newValue) => {
//   // 可以在这里添加搜索过滤功能，向父组件传递搜索内容
//   emitCategoryChange(searchText.value);
// });

</script>

<style scoped>
.filter {
  width: 95%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f4ee;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  box-sizing: border-box;
}

.checkbox-groups {
  display: flex;
  gap: 15px;
}
/* 搜索框 */
.search{
  min-width: 100px;
}

.inputbox {
  position: relative;
  width: 100%;
}

.inputbox input {
  position: relative;
  width: 100%;
  padding: 20px 10px 10px;
  background: transparent;
  outline: none;
  box-shadow: none;
  border: none;
  color: #fff;
  font-size: 1em;
  letter-spacing: 0.05em;
  transition: 0.5s;
  z-index: 10;
}

.inputbox span {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 10px 10px;
  font-size: 0.5em;
  color: #adadad;
  letter-spacing: 00.05em;
  transition: 0.5s;
  pointer-events: none;
}

.inputbox input:valid ~ span,
.inputbox input:focus ~ span {
  color: #8d6371;
  transform: translateX(-10px) translateY(-34px);
  font-size: 0, 75em;
}

.inputbox i {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 2px;
  background: #8d6371;
  border-radius: 4px;
  transition: 0.5s;
  pointer-events: none;
  z-index: 9;
}

.inputbox input:valid ~ i,
.inputbox input:focus ~ i {
  height: 44px;
}
</style>
