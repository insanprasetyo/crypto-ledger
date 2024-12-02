import { createApp } from 'vue';  // Use createApp for Vue 3
import App from './App.vue';
import router from './router';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const app = createApp(App);
app.use(router);  // Pass the router to the app instance
app.mount('#app');  // Mount the app
