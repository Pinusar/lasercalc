import { defineStore } from 'pinia';

export const useItemsStore = defineStore('itemsStore', {
  state: () => ({
    items: [
      {
        id: 1,
        material: 'Iron steel',
        length: 0,
        width: 0,
        thickness: 0,
        cutInType: 'Square',
        cutInLength: 0,
        cutInWidth: 0,
        cutInRadius: 0,
        currentCutInQuantity: 0,
        cutIns: [],
        costOfCutData: 'materialData', // Replace 'materialData' with the actual data or import it
        costOfMaterialPerKg: 0,
        pricingCoefficient: 1,
      },
      {
        id: 2,
        material: 'Carbon steel',
        length: 0,
        width: 0,
        thickness: 0,
        cutInType: 'Square',
        cutInLength: 0,
        cutInWidth: 0,
        cutInRadius: 0,
        currentCutInQuantity: 0,
        cutIns: [],
        costOfCutData: 'materialData', // Replace 'materialData' with the actual data or import it
        costOfMaterialPerKg: 0,
        pricingCoefficient: 1,
      },
      {
        id: 3,
        material: 'Carbon steel',
        length: 0,
        width: 0,
        thickness: 0,
        cutInType: 'Square',
        cutInLength: 0,
        cutInWidth: 0,
        cutInRadius: 0,
        currentCutInQuantity: 0,
        cutIns: [],
        costOfCutData: 'materialData', // Replace 'materialData' with the actual data or import it
        costOfMaterialPerKg: 0,
        pricingCoefficient: 1,
      },
    ],
  }),
  persist: true,

  getters: {
    getItems: (state) => state.items,
  },

  actions: {
    addItem(newItem) {
      this.items.push(newItem);
    },
    updateItem(id, updatedItem) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index !== -1) {
        this.items[index] = { ...this.items[index], ...updatedItem };
      }
    },
    removeItem(id) {
      this.items = this.items.filter((item) => item.id !== id);
    },
  },
});
