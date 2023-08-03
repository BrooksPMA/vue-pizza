import { defineStore } from 'pinia';
import { collection, doc, getDocs, getDoc } from 'firebase/firestore';
import { db } from '../plugins/firebase.js';

export const getProductsStore = defineStore({
  id: 'getProductStore',

  state: () => ({
    data: [],
    docData: {},
    docType: '',
    type: '',
    docName: '',
    isLoading: false,
  }),

  actions: {
    async getDataWithType() {
      this.isLoading = true;
      this.data = [];
      try {
        const querySnapshot = await getDocs(collection(db, this.type));
        querySnapshot.forEach((doc) => {
          this.data.push(doc.data());
        });
        this.isLoading = false;
      } catch (error) {
        console.error('Ошибка: ', error);
      }
    },
    async getDocWithName() {
      this.isLoading = true;
      this.docData = [];
      try {
        const docRef = doc(db, this.docType, this.docName);
        this.docData = await getDoc(docRef);
        this.isLoading = false;
      } catch (error) {
        console.log(error);
      }
    },
  },
});
