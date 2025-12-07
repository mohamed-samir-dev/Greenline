interface ProductFormActionsProps {
  uploading: boolean;
  onClear: () => void;
}

export default function ProductFormActions({ uploading, onClear }: ProductFormActionsProps) {
  return (
    <div className="flex gap-4 pt-4">
      <button
        type="submit"
        disabled={uploading}
        className="flex-1 bg-linear-to-r from-green-600 to-emerald-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl hover:from-green-700 hover:to-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transform transition-all duration-200 hover:scale-[1.02]"
      >
        {uploading ? "Adding Product..." : "Add Product"}
      </button>
      <button
        type="button"
        onClick={onClear}
        className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-200"
      >
        Clear Form
      </button>
    </div>
  );
}
