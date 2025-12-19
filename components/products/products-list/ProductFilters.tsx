interface ProductFiltersProps {
  types: string[];
  selectedTypes: string[];
  onTypeToggle: (type: string) => void;
  crops: string[];
  selectedCrop: string;
  onCropChange: (crop: string) => void;
  priceRange: number[];
  onPriceChange: (range: number[]) => void;
  onApply: () => void;
  onReset: () => void;
}

export const ProductFilters = ({
  types,
  selectedTypes,
  onTypeToggle,
  crops,
  selectedCrop,
  onCropChange,
  priceRange,
  onPriceChange,
  onApply,
  onReset
}: ProductFiltersProps) => {
  return (
    <aside className="w-full lg:w-72 lg:shrink-0">
      <div className="bg-gray-50 lg:bg-transparent rounded-lg lg:rounded-none p-4 lg:p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4 lg:mb-6">Filter By</h2>
        
        {/* Mobile: Horizontal layout for filters */}
        <div className="lg:space-y-6 space-y-4">
          {/* Type Checkboxes */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3">Type</h3>
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
              {types.map(type => (
                <label key={type} className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => onTypeToggle(type)}
                    className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                  />
                  <span className="ml-2 text-sm lg:text-base text-gray-700">{type}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Crop Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Crop</label>
            <select
              value={selectedCrop}
              onChange={(e) => onCropChange(e.target.value)}
              className="w-full px-3 lg:px-4 py-2 lg:py-2.5 bg-white border border-gray-300 rounded-lg text-gray-700 text-sm lg:text-base focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Price Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-3 lg:mb-4">Price Range</h3>
            <input
              type="range"
              min="0"
              max="100"
              value={priceRange[1]}
              onChange={(e) => onPriceChange([0, parseInt(e.target.value)])}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-green-600 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-green-600 [&::-moz-range-thumb]:border-0"
            />
            <div className="flex justify-between text-sm text-gray-600 mt-2 lg:mt-3">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}+</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 lg:gap-3">
            <button
              onClick={onApply}
              className="flex-1 bg-green-600 text-white font-medium py-2 lg:py-2.5 px-3 lg:px-4 rounded-lg text-sm lg:text-base hover:bg-green-700 transition-colors"
            >
              Apply
            </button>
            <button
              onClick={onReset}
              className="flex-1 bg-white text-gray-700 font-medium py-2 lg:py-2.5 px-3 lg:px-4 rounded-lg text-sm lg:text-base border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};