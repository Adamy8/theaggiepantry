import { create } from 'zustand';

export const useItemStore = create((set) => ({
    items: [],
    addItem: (item) => set((state) => ({ items: [...state.items, item] })),
    removeItem: (itemId) => set((state) => ({
        items: state.items.filter(item => item.id !== itemId)
    })),
    updateItem: (updatedItem) => set((state) => ({
        items: state.items.map(item =>
            item.id === updatedItem.id ? updatedItem : item
        )
    })),
    clearItems: () => set({ items: [] }),

    

}));