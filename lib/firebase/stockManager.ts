import { db } from './config';
import { doc, updateDoc, runTransaction } from 'firebase/firestore';
import { Product, ProductSize } from '@/types/product';

export class StockManager {
  static async decreaseStock(productId: string, size?: string, quantity: number = 1): Promise<boolean> {
    if (!db) {
      console.error('Firebase not initialized');
      return false;
    }
    
    try {
      const productRef = doc(db, 'products', productId);
      
      return await runTransaction(db, async (transaction) => {
        const productDoc = await transaction.get(productRef);
        
        if (!productDoc.exists()) {
          throw new Error('Product not found');
        }
        
        const product = productDoc.data() as Product;
        
        if (size) {
          // Handle size-specific stock
          const sizes = product.sizes || [];
          const sizeIndex = sizes.findIndex(s => s.size === size);
          
          if (sizeIndex === -1) {
            throw new Error('Size not found');
          }
          
          const currentSizeStock = sizes[sizeIndex].stockQuantity;
          if (currentSizeStock < quantity) {
            throw new Error('Insufficient stock for this size');
          }
          
          // Update size stock
          sizes[sizeIndex].stockQuantity -= quantity;
          
          // Update total stock
          const newTotalStock = Math.max(0, product.stockQuantity - quantity);
          
          transaction.update(productRef, {
            sizes,
            stockQuantity: newTotalStock,
            inStock: newTotalStock > 0
          });
        } else {
          // Handle general stock
          if (product.stockQuantity < quantity) {
            throw new Error('Insufficient stock');
          }
          
          const newStock = product.stockQuantity - quantity;
          
          transaction.update(productRef, {
            stockQuantity: newStock,
            inStock: newStock > 0
          });
        }
        
        return true;
      });
    } catch (error) {
      console.error('Error decreasing stock:', error);
      return false;
    }
  }

  static async increaseStock(productId: string, size?: string, quantity: number = 1): Promise<boolean> {
    if (!db) {
      console.error('Firebase not initialized');
      return false;
    }
    
    try {
      const productRef = doc(db, 'products', productId);
      
      return await runTransaction(db, async (transaction) => {
        const productDoc = await transaction.get(productRef);
        
        if (!productDoc.exists()) {
          throw new Error('Product not found');
        }
        
        const product = productDoc.data() as Product;
        
        if (size) {
          // Handle size-specific stock
          const sizes = product.sizes || [];
          const sizeIndex = sizes.findIndex(s => s.size === size);
          
          if (sizeIndex === -1) {
            throw new Error('Size not found');
          }
          
          // Update size stock
          sizes[sizeIndex].stockQuantity += quantity;
          
          // Update total stock
          const newTotalStock = product.stockQuantity + quantity;
          
          transaction.update(productRef, {
            sizes,
            stockQuantity: newTotalStock,
            inStock: true
          });
        } else {
          // Handle general stock
          const newStock = product.stockQuantity + quantity;
          
          transaction.update(productRef, {
            stockQuantity: newStock,
            inStock: true
          });
        }
        
        return true;
      });
    } catch (error) {
      console.error('Error increasing stock:', error);
      return false;
    }
  }
}