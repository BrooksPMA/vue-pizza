<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 flex justify-center items-center p-0"
    @click="$emit('close')"
  >
    <div class="flex">
      <div
        class="flex justify-between bg-white overflow-x-auto h-[388px] w-[776px] p-0 rounded-xl"
        @click.stop
      >
        <div class="flex m-auto w-[292px]">
          <img class="m-auto" :src="food.image" />
        </div>

        <div class="flex flex-col w-[324px] mr-5">
          <div>
            <h4 class="text-2xl text-black mt-4 mb-1">{{ food.name }}</h4>
            <p class="text-sm text-gray-500 mb-2">{{ food.weight }} г</p>
            <span class="text-m"> {{ food.description }} </span>
          </div>
          <button
            class="bg-pizzaorange hover:bg-orange-600 text-white font-bold py-2 px-20 rounded-full m-auto mb-7"
            @click.prevent="submit"
          >
            Добавить в корзину за {{ food.price }} ₽
          </button>
        </div>
      </div>
      <close-icon @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import CloseIcon from '../ui/CloseIcon.vue';

const props = defineProps({ food: Object });
const emit = defineEmits(['close', 'submit']);

const formData = ref({
  name: props.food.name,
  price: props.food.price,
  image: props.food.image,
});

const submit = () => {
  emit('submit', formData.value);
  emit('close');
};
</script>
