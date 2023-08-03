import { createRouter, createWebHistory } from 'vue-router';
import HomeFeed from '../views/HomeFeed.vue';
import Cart from '../views/Cart.vue';
import FoodFeed from '../views/FoodFeed.vue';
import OrderCompleted from '../views/OrderCompleted.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/pizza' },
      name: 'Home',
      component: HomeFeed,
    },
    {
      path: '/cart',
      name: 'Cart',
      component: Cart,
    },
    {
      path: '/:type?',
      name: 'FoodFeed',
      component: FoodFeed,
    },
    {
      path: '/order-completed',
      name: 'OrderCompleted',
      component: OrderCompleted,
    },
  ],
  linkActiveClass: 'active',
  linkExactActiveClass: 'active',
});

export default router;
