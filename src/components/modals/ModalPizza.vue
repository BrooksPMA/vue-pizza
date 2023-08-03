<template>
  <div
    class="fixed top-0 bottom-0 left-0 right-0 bg-black bg-opacity-80 flex justify-center items-center p-0"
    @click="$emit('close')"
  >
    <div class="flex">
      <div
        class="bg-white overflow-x-auto flex p-0 h-[610px] w-[924px] rounded-xl"
        @click.stop
      >
        <div class="flex w-[530px] max-h-[610px]">
          <img
            class="m-auto justify-center"
            :src="food.image"
            :style="dynamicStyle"
          />
        </div>

        <div class="flex flex-col justify-between">
          <div class="w-[394px]">
            <h4 class="text-2xl text-black mt-4 mb-1">{{ food.name }}</h4>
            <p class="text-sm text-gray-500 mb-2">
              {{ sizeShow }} см, {{ computedDoughName }} тесто,
              {{ computedWeight }} г
            </p>
            <span class="text-m"> {{ food.description }} </span>
            <div
              class="grid m-auto mt-6 w-[350px] grid-cols-3 space-x-2 rounded-3xl bg-gray-100"
            >
              <div>
                <input
                  type="radio"
                  name="size"
                  value="small"
                  id="1"
                  v-model="formData.size"
                  @click="updateDough('small')"
                  class="peer hidden"
                  :disabled="checkDough"
                />
                <label
                  for="1"
                  class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-gray-200 peer-checked:font-bold peer-checked:text-black"
                  :style="{
                    color: checkDough ? 'gray' : 'black',
                    cursor: checkDough ? 'not-allowed' : 'pointer',
                  }"
                  >Маленькая</label
                >
              </div>

              <div>
                <input
                  type="radio"
                  name="size"
                  value="medium"
                  v-model="formData.size"
                  @click="updateDough('medium')"
                  id="2"
                  class="peer hidden"
                />
                <label
                  for="2"
                  class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-gray-200 peer-checked:font-bold peer-checked:text-black"
                  >Средняя</label
                >
              </div>

              <div>
                <input
                  type="radio"
                  name="size"
                  value="large"
                  v-model="formData.size"
                  @click="updateDough('large')"
                  id="3"
                  class="peer hidden"
                />
                <label
                  for="3"
                  class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-gray-200 peer-checked:font-bold peer-checked:text-blakc"
                  >Большая</label
                >
              </div>
            </div>
            <div
              class="grid m-auto mt-6 w-[350px] grid-cols-2 space-x-2 rounded-3xl bg-gray-100"
            >
              <div>
                <input
                  type="radio"
                  name="dough"
                  value="americanSizes"
                  id="10"
                  v-model="formData.dough"
                  class="peer hidden"
                />
                <label
                  for="10"
                  class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-gray-200 peer-checked:font-bold peer-checked:text-black"
                >
                  Традиционное
                </label>
              </div>
              <div>
                <input
                  type="radio"
                  name="dough"
                  value="italianSizes"
                  id="20"
                  v-model="formData.dough"
                  class="peer hidden"
                />
                <label
                  for="20"
                  class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-gray-200 peer-checked:font-bold peer-checked:text-black"
                  >Тонкое</label
                >
              </div>
            </div>
          </div>
          <button
            class="bg-pizzaorange hover:bg-orange-600 text-white font-bold py-2 px-20 rounded-full m-auto mb-7"
            @click.prevent="submit"
          >
            Добавить в корзину за {{ computedPrice }} ₽
          </button>
        </div>
      </div>
      <close-icon @click="$emit('close')" />
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue';
import CloseIcon from '../ui/CloseIcon.vue';

const props = defineProps({ food: Object });
const emit = defineEmits(['close', 'submit']);

const height = ref(350);
const width = ref(350);
const sizeShow = ref(25);

const formData = ref({
  name: props.food.name,
  size: 'small',
  dough: 'americanSizes',
  image: props.food.image,
  price: '',
});

const computedPrice = computed(() => {
  return props.food[formData.value.dough][formData.value.size].price;
});

const computedWeight = computed(() => {
  return props.food[formData.value.dough][formData.value.size].weight;
});

const computedDoughName = computed(() => {
  return formData.value.dough === 'americanSizes' ? 'традиционное' : 'тонкое';
});

const dynamicStyle = computed(() => {
  return {
    height: height.value + 'px',
    width: width.value + 'px',
  };
});

watch(formData.value, () => {
  if (
    formData.value.dough === 'italianSizes' &&
    formData.value.size === 'small'
  ) {
    formData.value.size = 'medium';
    updateDough('medium');
  }
  formData.value.price =
    props.food[formData.value.dough][formData.value.size].price;
});

const checkDough = computed(() => {
  return formData.value.dough === 'italianSizes' ? true : false;
});

const updateDough = (newInfo) => {
  switch (newInfo) {
    case 'small':
      height.value = 350;
      width.value = 350;
      sizeShow.value = 25;
      break;
    case 'medium':
      height.value = 450;
      width.value = 450;
      sizeShow.value = 30;
      break;
    case 'large':
      height.value = 500;
      width.value = 500;
      sizeShow.value = 35;
      break;
  }
};

const submit = () => {
  formData.value.doughName =
    formData.value.dough === 'americanSizes' ? 'традиционное' : 'тонкое';

  if (formData.value.size === 'small') {
    formData.value.sizeName = 25;
  } else if (formData.value.size === 'medium') {
    formData.value.sizeName = 30;
  } else {
    formData.value.sizeName = 35;
  }

  formData.value.price = computedPrice.value;
  emit('submit', formData.value);
  emit('close');
};
</script>
