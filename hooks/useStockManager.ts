import { useState } from 'react';

export const useStockManager = () => {
  const [isUpdating, setIsUpdating] = useState(false);

  const updateStock = async (
    productId: string, 
    action: 'decrease' | 'increase', 
    size?: string, 
    quantity: number = 1
  ): Promise<boolean> => {
    setIsUpdating(true);
    
    try {
      const response = await fetch(`/api/products/${productId}/stock`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, size, quantity }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update stock');
      }

      return true;
    } catch (error) {
      console.error('Stock update failed:', error);
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  return {
    updateStock,
    isUpdating,
  };
};