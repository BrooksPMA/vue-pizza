<template>
  <nav class="bg-gray-100 h-16 items-center">
    <div
      class="container h-16 max-w-7xl mx-auto flex items-center justify-between"
    >
      <div class="flex items-center">
        <router-link :to="{ name: 'FoodFeed', params: { type: 'pizza' } }">
          <img
            src="../assets/pictures/pizza-icon.svg"
            alt="Pizza icon"
            class="h-12 mr-14"
          />
        </router-link>
        <div>
          <router-link
            v-for="food in foodNames"
            :key="food.id"
            :to="{ name: 'FoodFeed', params: { type: food.type } }"
            class="mr-3 text-xl"
          >
            {{ food.name }}</router-link
          >
        </div>
      </div>

      <router-link :to="{ name: 'Cart' }">
        <button
          class="bg-pizzaorange hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full"
        >
          Корзина {{ checkItemsCount }}
        </button>
      </router-link>
    </div>
  </nav>
</template>
<script setup>
import { computed } from 'vue';
import { foodNames } from '../data/foodNames.js';
import { useCartStore } from '../stores/useCartStore';

const cartStore = useCartStore();
const checkItemsCount = computed(() => {
  return cartStore.itemsAllCount ? '| ' + cartStore.itemsAllCount : null;
});
</script>
