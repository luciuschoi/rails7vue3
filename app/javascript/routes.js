import { createWebHistory, createRouter } from 'vue-router'

import MainIndex from '@/main/views/index.vue';
import HomeIndex from '@/home/views/index.vue';
import Root from '@/views/index.vue';

const router = createRouter({
  history: createWebHistory(`/`),
  routes: [
    { path: '/', component: Root, name: 'root_path' },
    { path: '/main', component: MainIndex, name: 'main_path' },
    { path: '/home', component: HomeIndex, name: 'home_path' },
  
  ]
});

export default router;