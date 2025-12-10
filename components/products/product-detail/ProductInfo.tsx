import { useState } from "react";
import { Product } from "@/types/product";
import { FaHeart, FaShoppingBasket, FaCertificate, FaShieldAlt } from "react-icons/fa";

interface ProductInfoProps {
  product: Product;
}

export const ProductInfo = ({ product }: ProductInfoProps) => {
  const [selectedSize, setSelectedSize] = useState(
    product.sizes && product.sizes.length > 0 ? product.sizes[0].size : ""
  );
  const [quantity, setQuantity] = useState(1);
  
  const selectedSizeData = product.sizes?.find(s => s.size === selectedSize);
  const selectedPrice = selectedSizeData?.price || product.price;
  const selectedStock = selectedSizeData?.stockQuantity || product.stockQuantity;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-4">
        {product.name}
      </h1>
      <p className="text-green-600 mb-6">{product.description}</p>
   
      <p className="text-4xl text-green-600 font-bold mb-3">
        ${selectedPrice}
      </p>
      <div className="flex items-center gap-2 mb-6">
        <div className={`w-2 h-2 rounded-full ${
          selectedStock > 10 ? 'bg-green-500' : 
          selectedStock > 0 ? 'bg-yellow-500' : 'bg-red-500'
        }`}></div>
        <span className="text-sm font-medium text-gray-700">
          {selectedStock > 0 
            ? `${selectedStock} units in stock` 
            : 'Out of stock'
          }
        </span>
      </div>

      {/* Size Options */}
      {product.sizes && product.sizes.length > 0 && (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size
          </label>
          <div className="flex gap-3 flex-wrap">
            {product.sizes.map((sizeOption) => (
              <button
                key={sizeOption.size}
                onClick={() => setSelectedSize(sizeOption.size)}
                className={`px-6 py-2 border rounded-lg ${
                  selectedSize === sizeOption.size
                    ? "border-green-600 bg-green-50 text-green-600"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {sizeOption.size} 
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quantity, Heart, and Add to Cart */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <div className="flex items-center border border-gray-300 text-black rounded-lg">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-4 py-2 hover:bg-gray-50"
            >
              -
            </button>
            <span className="px-6 py-2 border-x border-gray-300">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-50"
            >
              +
            </button>
          </div>
          <button 
            disabled={selectedStock === 0}
            className={`flex-1 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 ${
              selectedStock > 0 
                ? 'bg-green-400 text-white hover:bg-green-700' 
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            <FaShoppingBasket className="w-5 h-5" />
            {selectedStock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
          <button className="p-3 border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-red-500 transition-colors">
            <FaHeart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Icons/Badges */}
      <div className="flex gap-4 mb-6">
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaCertificate className="text-green-600 w-4 h-4" />
          <span>Organic Certified</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-700">
          <FaShieldAlt className="text-green-600 w-4 h-4" />
          <span>Money-Back Guarantee</span>
        </div>
      </div>
    </div>
  );
};