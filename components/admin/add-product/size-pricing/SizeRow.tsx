interface SizeRowProps {
  size: { size: string; price: string; stockQuantity: string };
  index: number;
  onUpdate: (index: number, field: string, value: string) => void;
  onRemove: (index: number) => void;
  canRemove: boolean;
}

export const SizeRow = ({ size, index, onUpdate, onRemove, canRemove }: SizeRowProps) => {
  return (
    <div className="grid grid-cols-4 gap-3 p-3 bg-gray-50 rounded-lg">
      <div>
        <input
          type="text"
          value={size.size}
          onChange={(e) => onUpdate(index, 'size', e.target.value)}
          onBlur={(e) => {
            let value = e.target.value.trim();
            if (value && !value.toLowerCase().endsWith('kg')) {
              onUpdate(index, 'size', value + 'kg');
            }
          }}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          placeholder="e.g., 1kg"
          required
        />
      </div>
      <div>
        <input
          type="number"
          step="0.01"
          value={size.price}
          onChange={(e) => onUpdate(index, 'price', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          placeholder="Price"
          required
        />
      </div>
      <div>
        <input
          type="number"
          value={size.stockQuantity}
          onChange={(e) => onUpdate(index, 'stockQuantity', e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded text-gray-900"
          placeholder="Stock"
          required
        />
      </div>
      <div>
        {canRemove && (
          <button
            type="button"
            onClick={() => onRemove(index)}
            className="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Remove
          </button>
        )}
      </div>
    </div>
  );
};