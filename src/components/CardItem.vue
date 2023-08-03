<template>
  <div
    class="flex flex-col justify-between w-[280px] h-[420px] bg-white rounded-xl mb-16"
  >
    <main>
      <img
        :src="food.image"
        alt="food pic"
        class="w-60 h-60 m-auto duration-500 hover:scale-110"
      />
      <h1 class="text-2xl text-black mb-2">
        {{ food.name }}
      </h1>
      <p class="text-sm text-gray-500 mb-3">{{ food.description }}</p>
    </main>
    <footer class="flex justify-between">
      <h1 v-if="food.americanSizes" class="text-xl text-black font-bold">
        от {{ food.americanSizes.small.price }} ₽
      </h1>
      <h1 v-else class="text-xl text-black font-bold">от {{ food.price }} ₽</h1>
      <button
        class="bg-orange-100 hover:bg-orange-200 text-orange-400 font-bold py-1 px-6 rounded-full"
      >
        Выбрать
      </button>
    </footer>
  </div>
</template>
<script setup>
const props = defineProps({ food: Object });
</script>
