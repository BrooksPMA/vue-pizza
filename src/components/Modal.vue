<template>
  <component
    :is="tabs[foodType]"
    :food="food"
    @close="$emit('close')"
    @submit="addToCart"
  />
</template>

<script setup>
import ModalPizza from './modals/ModalPizza.vue';
import ModalSnacks from './modals/ModalSnacks.vue';
import ModalDesserts from './modals/ModalDesserts.vue';
import ModalDrinks from './modals/ModalDrinks.vue';
import ModalOthers from './modals/ModalOthers.vue';

import { onMounted, ref } from 'vue';
import { useCartStore } from '../stores/useCartStore';

const props = defineProps({ food: Object });
const emit = defineEmits(['close']);

const foodType = ref('');
const cartStore = useCartStore();

const tabs = {
  ModalPizza,
  ModalSnacks,
  ModalDesserts,
  ModalDrinks,
  ModalOthers,
};

const addToCart = (formData) => {
  cartStore.addToCart(formData);
};

onMounted(() => {
  const type = props.food.type;
  foodType.value = 'Modal' + type.charAt(0).toUpperCase() + type.slice(1);
});
</script>
