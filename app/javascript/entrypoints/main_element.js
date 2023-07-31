import { createApp } from 'vue/dist/vue.esm-bundler';
const app = createApp(Layout);

import axios from 'axios'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia';
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/display.css'

import Router from '@/home/routes.js';
import Layout from '@/home/views/shared/layout.vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

app.use(Router)
const axiosInstance = axios.create({
  withCredentials: true,
})
app.config.globalProperties.$axios = { ...axiosInstance }
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
const Pinia = createPinia();
Pinia.use(({ store }) => { store.axios = axios })

app.use(Pinia)
app.use(ElementPlus)
app.mount('#app')