import Image from 'next/image';
import { Minus, Plus, Trash2, Heart, Star } from 'lucide-react';

interface CartItemProps {
  item: {
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
    size?: string;
    stockQuantity: number;
  };
  onUpdateQuantity: (id: string, quantity: number, size?: string) => Promise<void>;
  onRemoveItem: (id: string, size?: string) => Promise<void>;
}

export default function CartItem({ item, onUpdateQuantity, onRemoveItem }: CartItemProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-all duration-300">
      <div className="p-6">
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="relative w-32 h-32 shrink-0 bg-linear-to-br from-green-50 to-gray-50 rounded-xl overflow-hidden">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
            <div className="absolute top-2 right-2">
              <button className="bg-white/80 backdrop-blur-sm p-1.5 rounded-full shadow-sm hover:bg-white transition-colors">
                <Heart className="h-4 w-4 text-gray-600" />
              </button>
            </div>
          </div>
          
          {/* Product Details */}
          <div className="flex-1 min-w-0">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{item.name}</h3>
                <div className="flex items-center gap-2 mb-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">(4.8)</span>
                </div>
                {item.size && (
                  <div className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                    Size: {item.size}
                  </div>
                )}
              </div>
              <button
                onClick={async () => {
                  try {
                    await onRemoveItem(item.id, item.size);
                  } catch (error) {
                    console.error('Failed to remove item:', error);
                  }
                }}
                className="text-gray-400 hover:text-red-500 transition-colors p-2 hover:bg-red-50 rounded-full"
              >
                <Trash2 className="h-5 w-5" />
              </button>
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-4">
              <div className={`w-2 h-2 rounded-full ${
                item.stockQuantity > 10 ? 'bg-green-500' : 
                item.stockQuantity > 0 ? 'bg-yellow-500' : 'bg-red-500'
              }`}></div>
              <span className="text-sm text-gray-600">
                {item.stockQuantity > 10 ? 'In Stock' : 
                 item.stockQuantity > 0 ? `Only ${item.stockQuantity} left` : 'Out of Stock'
                }
              </span>
            </div>

            {/* Price and Quantity */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center bg-gray-50 rounded-xl border border-gray-200">
                  <button
                    onClick={async () => {
                      try {
                        await onUpdateQuantity(item.id, item.quantity - 1, item.size);
                      } catch (error) {
                        console.error('Failed to update quantity:', error);
                      }
                    }}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-l-xl"
                  >
                    <Minus className="h-4 w-4 text-gray-600" />
                  </button>
                  <span className="px-4 py-3 font-semibold text-gray-900 min-w-12 text-center">
                    {item.quantity}
                  </span>
                  <button
                    onClick={async () => {
                      try {
                        await onUpdateQuantity(item.id, item.quantity + 1, item.size);
                      } catch (error) {
                        console.error('Failed to update quantity:', error);
                      }
                    }}
                    className="p-3 hover:bg-gray-100 transition-colors rounded-r-xl"
                    disabled={item.quantity >= item.stockQuantity}
                  >
                    <Plus className="h-4 w-4 text-gray-600" />
                  </button>
                </div>
                <div className="text-sm text-gray-500">
                  ${item.price.toFixed(2)} each
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <div className="text-sm text-green-600 font-medium">
                  Save ${(item.quantity * 2.5).toFixed(2)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}