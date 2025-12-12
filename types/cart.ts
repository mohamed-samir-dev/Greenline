export interface CartItem {
  id: string;
  name: string;
  price: number;
  size?: string;
  quantity: number;
  image: string;
  stockQuantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (item: Omit<CartItem, 'quantity'>) => Promise<void>;
  removeItem: (id: string, size?: string) => Promise<void>;
  updateQuantity: (id: string, quantity: number, size?: string) => Promise<void>;
  clearCart: () => Promise<void>;
  getItemKey: (id: string, size?: string) => string;
}