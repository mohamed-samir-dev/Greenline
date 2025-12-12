interface SizeHeaderProps {
  onAddSize: () => void;
}

export const SizeHeader = ({ onAddSize }: SizeHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <label className="block text-sm font-semibold text-gray-700">
        Size-Based Pricing <span className="text-red-500">*</span>
      </label>
      <button
        type="button"
        onClick={onAddSize}
        className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
      >
        Add Size
      </button>
    </div>
  );
};