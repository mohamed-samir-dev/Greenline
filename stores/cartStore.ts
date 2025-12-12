import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartState } from '@/types/cart';
import { StockManager } from '@/lib/firebase/stockManager';

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,
      itemCount: 0,

      getItemKey: (id: string, size?: string) => size ? `${id}-${size}` : id,

      addItem: async (newItem) => {
        const { getItemKey } = get();
        const itemKey = getItemKey(newItem.id, newItem.size);
        
        // Check current stock before adding
        if (newItem.stockQuantity <= 0) {
          throw new Error('Item is out of stock');
        }
        
        // Decrease stock in database
        const stockDecreased = await StockManager.decreaseStock(newItem.id, newItem.size, 1);
        
        if (!stockDecreased) {
          throw new Error('Failed to update stock. Item may be out of stock.');
        }
        
        set((state) => {
          const existingItemIndex = state.items.findIndex(
            item => getItemKey(item.id, item.size) === itemKey
          );

          let updatedItems;
          if (existingItemIndex >= 0) {
            updatedItems = state.items.map((item, index) =>
              index === existingItemIndex
                ? { ...item, quantity: item.quantity + 1, stockQuantity: item.stockQuantity - 1 }
                : item
            );
          } else {
            updatedItems = [...state.items, { ...newItem, quantity: 1, stockQuantity: newItem.stockQuantity - 1 }];
          }

          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: updatedItems,
            total,
            itemCount
          };
        });
      },

      removeItem: async (id, size) => {
        const { getItemKey } = get();
        const itemKey = getItemKey(id, size);
        
        const state = get();
        const itemToRemove = state.items.find(item => getItemKey(item.id, item.size) === itemKey);
        
        if (itemToRemove) {
          // Restore stock when removing item
          await StockManager.increaseStock(id, size, itemToRemove.quantity);
        }
        
        set((state) => {
          const updatedItems = state.items.filter(
            item => getItemKey(item.id, item.size) !== itemKey
          );
          
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: updatedItems,
            total,
            itemCount
          };
        });
      },

      updateQuantity: async (id, quantity, size) => {
        if (quantity <= 0) {
          await get().removeItem(id, size);
          return;
        }

        const { getItemKey } = get();
        const itemKey = getItemKey(id, size);
        const state = get();
        const currentItem = state.items.find(item => getItemKey(item.id, item.size) === itemKey);
        
        if (!currentItem) return;
        
        const quantityDiff = quantity - currentItem.quantity;
        
        if (quantityDiff > 0) {
          // Check available stock before increasing
          if (currentItem.stockQuantity < quantityDiff) {
            throw new Error(`Only ${currentItem.stockQuantity} items available`);
          }
          
          const stockDecreased = await StockManager.decreaseStock(id, size, quantityDiff);
          if (!stockDecreased) {
            throw new Error('Insufficient stock for requested quantity');
          }
        } else if (quantityDiff < 0) {
          await StockManager.increaseStock(id, size, Math.abs(quantityDiff));
        }
        
        set((state) => {
          const updatedItems = state.items.map(item =>
            getItemKey(item.id, item.size) === itemKey
              ? { ...item, quantity, stockQuantity: item.stockQuantity - quantityDiff }
              : item
          );
          
          const total = updatedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
          const itemCount = updatedItems.reduce((sum, item) => sum + item.quantity, 0);

          return {
            items: updatedItems,
            total,
            itemCount
          };
        });
      },

      clearCart: async () => {
        const state = get();
        
        // Restore stock for all items in cart
        for (const item of state.items) {
          await StockManager.increaseStock(item.id, item.size, item.quantity);
        }
        
        set({
          items: [],
          total: 0,
          itemCount: 0
        });
      }
    }),
    {
      name: 'cart-storage'
    }
  )
);