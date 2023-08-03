<template>
  <div class="container max-w-7xl mx-auto h-screen">
    <div v-if="items.length > 0" class="mt-16">
      <div class="flex items-center justify-between border-b-[1px] pb-5 mb-10">
        <h1 class="text-4xl text-black font-semibold">
          Корзина
          <span class="text-pizzaorange"
            >({{ cartStore.itemsPositionsCount || 0 }})</span
          >
        </h1>
        <button class="flex my-auto items-center mr-5" @click="clearCart">
          <h2 class="text-m text-gray-400 mr-2">Удалить всё</h2>
          <trash-icon class="fill-gray-400" />
        </button>
      </div>
      <div v-for="item in items" :key="item.id">
        <div
          class="flex justify-between items-center border-b-[1px] pb-5 mb-10"
        >
          <div class="flex">
            <img class="h-32" :src="item.image" alt="item image" />
            <div class="flex flex-col my-auto ml-10">
              <h1 class="text-xl text-black mb-2">{{ item.name }}</h1>
              <p v-if="item.doughName" class="text-m text-gray-500">
                {{ item.doughName }}, {{ item.sizeName }} cм
              </p>
            </div>
          </div>
          <div class="flex my-auto justify-between w-[250px]">
            <div class="flex items-center justify-between w-[80px] select-none">
              <circle-plus-icon
                class="h-5 fill-pizzaorange duration-500 hover:scale-125"
                @click="increaseAmount(item)"
                >+</circle-plus-icon
              >
              <h2 class="text-lg">{{ item.amount }}</h2>
              <circle-minus-icon
                class="h-5 fill-pizzaorange duration-500 hover:scale-125"
                @click="decreaseAmount(item)"
                >-</circle-minus-icon
              >
            </div>
            <div class="flex">
              <h2 class="text-xl text-black font-bol">{{ item.price }} ₽</h2>
              <xmark-icon class="my-auto ml-5 fill-gray-400" />
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col">
        <h1 class="ml-auto text-2xl text-gray-500 font-semibold">
          Итого:
          <span class="text-black">{{ cartStore.cartItemsPrice }} ₽</span>
        </h1>
        <button
          class="ml-auto my-16 bg-pizzaorange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full"
          @click="submitOrder"
        >
          Оформить заказ
        </button>
      </div>
    </div>
    <div v-else class="mt-0 flex flex-col items-center justify-center h-screen">
      <img class="mb-10" src="../assets/pictures/giphy.gif" />
      <router-link :to="{ name: 'Home' }">
        <h1 class="text-3xl text-black">
          Корзина пуста. Вернуться на
          <span class="text-pizzaorange underline"> главную</span>.
        </h1>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import XmarkIcon from '../components/ui/XmarkIcon.vue';
import { computed } from 'vue';
import { useCartStore } from '../stores/useCartStore';
import CirclePlusIcon from '../components/ui/CirclePlusIcon.vue';
import CircleMinusIcon from '../components/ui/CircleMinusIcon.vue';
import TrashIcon from '../components/ui/TrashIcon.vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const cartStore = useCartStore();

const items = computed(() => {
  return cartStore.items;
});
console.log(items.value);

const increaseAmount = (item) => {
  cartStore.increaseAmount(item);
};
const decreaseAmount = (item) => {
  if (item.amount > 1) {
    cartStore.decreaseAmount(item);
  } else {
    cartStore.removeFromCart(item);
  }
};

const submitOrder = async () => {
  console.log(cartStore.items);
  await cartStore.submitOrder();
  router.push({ name: 'OrderCompleted' });
};

const clearCart = () => {
  cartStore.clearCart();
};
</script>

<style lang="scss" scoped></style>
