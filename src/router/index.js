import { createRouter, createWebHistory } from 'vue-router';  // Import the new API from vue-router
import HomeView from '../views/HomeView.vue';
import CexOne from '../views/CexOne.vue';
import CexTwo from '../views/CexTwo.vue';
import CexThree from '../views/CexThree.vue';
import CexFour from '../views/CexFour.vue';
import WalletApp from '../views/WalletApp.vue';


// const routes = [
//   { path: '/', name: 'HomeView', component: HomeView },
//   { path: '/cex1', name: 'CexOne', component: CexOne },
//   { path: '/cex2', name: 'CexTwo', component: CexTwo },
//   { path: '/cex3', name: 'CexThree', component: CexThree },
//   { path: '/cex4', name: 'CexFour', component: CexFour },
//   { path: '/wallet', name: 'WalletApp', component: WalletApp },
// ];

const router = createRouter({
  history: createWebHistory(),  // Use the appropriate history mode
  routes: [
    { path: '/', name: 'HomeView', component: HomeView },
    { path: '/cex1', name: 'CexOne', component: CexOne },
    { path: '/cex2', name: 'CexTwo', component: CexTwo },
    { path: '/cex3', name: 'CexThree', component: CexThree },
    { path: '/cex4', name: 'CexFour', component: CexFour },
    { path: '/wallet', name: 'WalletApp', component: WalletApp },
  ],
});

export default router;
