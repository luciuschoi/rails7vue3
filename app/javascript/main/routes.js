import { createWebHistory, createRouter } from 'vue-router'

import Main from '@/views/index.vue';

const router = createRouter({
  history: createWebHistory(`/main`),
  routes: [
    { path: '/', component: Main, name: 'main_path' },
  
  ]
});

export default router;