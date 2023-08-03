<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <loader v-if="cartStore.isLoading" />
    <div v-if="cartStore.submitFailed">
      <xmark-icon class="h-64 fill-pizzaorange" />
      <h1>Что-то пошло не так. Пожалуйста повторите позже 😔</h1>
    </div>
    <div v-else-if="!cartStore.isLoading && !cartStore.submitFailed">
      <check-mark-icon class="h-64 mx-auto file:fill-pizzaorange" />
      <h1 class="mx-auto text-2xl text-black">
        Заказ успешно оформлен. Пожалуйста ожидайте.
      </h1>
    </div>
    <router-link
      v-if="!cartStore.isLoading"
      class="mt-5 bg-pizzaorange hover:bg-orange-600 text-white font-bold py-4 px-10 rounded-full"
      :to="{ name: 'Home' }"
    >
      Вернуться на главную страницу.
    </router-link>
  </div>
</template>

<script setup>
import XmarkIcon from '../components/ui/XmarkIcon.vue';
import Loader from '../components/ui/Loader.vue';
import CheckMarkIcon from '../components/ui/CheckMarkIcon.vue';
import { useCartStore } from '../stores/useCartStore';

const cartStore = useCartStore();
</script>
