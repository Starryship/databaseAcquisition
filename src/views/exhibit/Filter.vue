<template>
  <div class="filter">
    <div class="checkbox-groups">
      <checkbox
        v-for="(item, index) in sorts"
        :key="index"
        v-model="item.isChecked"
        :text="item.text"
        :id="index"
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
import { ref } from 'vue'
import Checkbox from '@/components/Checkbox.vue'

const sorts = ref([
  {
    text: '传世品',
    isChecked: true,
  },
  {
    text: '货币',
    isChecked: true,
  },
  {
    text: '艺术品',
    isChecked: true,
  },
])
</script>

<style scoped>
.filter {
  width: 90%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f8f4ee;
  margin: 0 auto;
  padding: 20px 50px;
  border-radius: 10px;
  box-sizing: border-box;
}

.checkbox-groups {
  display: flex;
  gap: 30px;
}
/* 搜索框 */
.search{
  width: 30%;
  min-width: 200px;
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
