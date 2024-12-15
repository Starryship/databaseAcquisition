// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue'
import router from './router'
// import { marked } from 'marked'

const app = createApp(App)
app.use(ElementPlus);
app.use(createPinia())
app.use(router)
// app.use(marked)

app.mount('#app')
