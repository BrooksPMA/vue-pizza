import { defineStore } from 'pinia';
import { doc, setDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../plugins/firebase.js';

export const useCartStore = defineStore({
  id: 'useCartStore',

  state: () => ({
    items: JSON.parse(localStorage.getItem('items') || '[]'),
    isLoading: false,
    submitFailed: false,
  }),

  getters: {
    itemsPositionsCount() {
      return this.items.length;
    },
    itemsAllCount() {
      return this.items.reduce((sum, item) => sum + item.amount, 0);
    },
    cartItemsPrice() {
      return this.items.reduce(
        (total, item) => total + item.price * item.amount,
        0
      );
    },
    docName() {
      return Date.now();
    },
  },

  actions: {
    addToCart(item) {
      const existingItem = this.items.find(
        (i) =>
          i.name === item.name && i.dough === item.dough && i.size === item.size
      );
      if (existingItem) {
        existingItem.amount++;
      } else {
        this.items.push({ ...item, amount: 1 });
      }
      localStorage.setItem('items', JSON.stringify(this.items));
    },
    removeFromCart(item) {
      const index = this.items.findIndex(
        (i) =>
          i.name === item.name && i.dough === item.dough && i.size === item.size
      );
      if (index !== -1) {
        this.items.splice(index, 1);
        localStorage.setItem('items', JSON.stringify(this.items));
      }
    },
    increaseAmount(item) {
      const existingItem = this.items.find(
        (i) =>
          i.name === item.name && i.dough === item.dough && i.size === item.size
      );
      existingItem.amount++;
      localStorage.setItem('items', JSON.stringify(this.items));
    },
    decreaseAmount(item) {
      const existingItem = this.items.find(
        (i) =>
          i.name === item.name && i.dough === item.dough && i.size === item.size
      );
      existingItem.amount--;
      localStorage.setItem('items', JSON.stringify(this.items));
    },
    clearCart() {
      this.items = [];
      localStorage.removeItem('items');
    },
    async addActiveCount() {
      const ref = doc(db, 'statistics', 'orderStatus');
      await updateDoc(ref, {
        active: increment(1),
      });
    },
    async submitOrder() {
      this.isLoading = true;
      try {
        const docName = Date.now().toString();
        const data = { items: this.items, status: 'active', id: docName };
        console.log(data);
        await setDoc(doc(db, 'orders', docName), data);
        this.addActiveCount();
        this.clearCart();
        console.log('success');
      } catch (e) {
        this.submitFailed = true;
      }
      this.isLoading = false;
    },
  },
});
