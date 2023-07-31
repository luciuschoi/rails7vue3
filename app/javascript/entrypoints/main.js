import { createApp } from 'vue/dist/vue.esm-bundler';
const app = createApp(Layout);

import Router from '@/routes.js';
import Layout from '@/main/views/shared/layout.vue';


app.use(Router)
   .mount('#app')