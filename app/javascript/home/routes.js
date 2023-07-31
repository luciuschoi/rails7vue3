import { createWebHistory, createRouter } from 'vue-router'

import HomeIndex from '@/home/views/index.vue';

const router = createRouter({
  history: createWebHistory(`/home`),
  routes: [
    { path: '/', component: HomeIndex, name: 'home_path' },
  
  ]
});

export default router;