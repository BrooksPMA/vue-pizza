<template>
  <loader v-if="getProductStore.isLoading" class="h-screen" />
  <div v-else class="container max-w-7xl mx-auto mt-16">
    <h1
      class="text-4xl text-black font-semibold mb-16"
      v-if="getProductStore.type"
    >
      {{ currentFoodTypeName }}
    </h1>
    <section class="flex flex-wrap">
      <article
        v-for="food in foodData"
        :key="food.id"
        class="flex flex-wrap justify-start ml-10 gap-10"
        @click="openModal(food)"
      >
        <card-item :food="food" />
      </article>
      <modal v-if="showModal" :food="currentFood" @close="closeModal" />
    </section>
  </div>
</template>

<script setup>
import Loader from '../components/ui/Loader.vue';
import CardItem from '../components/CardItem.vue';
import Modal from '../components/Modal.vue';
import { computed, onMounted, ref, watch } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { getProductsStore } from '../stores/getProductsStore';

const route = useRoute();
const getProductStore = getProductsStore();
const foodData = ref({});

const currentFoodType = computed(() => route.params.type);
const currentFoodTypeName = ref('');

const switchName = () => {
  switch (getProductStore.type) {
    case 'pizza':
      currentFoodTypeName.value = 'Пицца';
      break;
    case 'snacks':
      currentFoodTypeName.value = 'Закуски';
      break;
    case 'desserts':
      currentFoodTypeName.value = 'Десерты';
      break;
    case 'combo':
      currentFoodTypeName.value = 'Комбо';
      break;
    case 'drinks':
      currentFoodTypeName.value = 'Напитки';
      break;
    case 'others':
      currentFoodTypeName.value = 'Другие товары';
      break;
  }
};

const fetchFeed = async () => {
  getProductStore.type = route.params.type;
  await getProductStore.getDataWithType();
  foodData.value = getProductStore.data;
  switchName();
  console.log(foodData.value);
};

const showModal = ref(false);
const closeModal = () => (showModal.value = false);

const currentFood = ref(null);

const openModal = (item) => {
  currentFood.value = item;
  showModal.value = true;
};

watch(currentFoodType, fetchFeed);

onMounted(async () => {
  fetchFeed();
});
</script>

<style lang="scss" scoped></style>
