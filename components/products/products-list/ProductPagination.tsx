interface ProductPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onPrevPage: () => void;
  onNextPage: () => void;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  showPagination: boolean;
}

export const ProductPagination = ({
  currentPage,
  totalPages,
  onPageChange,
  onPrevPage,
  onNextPage,
  hasPrevPage,
  hasNextPage,
  showPagination
}: ProductPaginationProps) => {
  if (!showPagination) return null;

  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button 
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-lg ${
            page === currentPage
              ? 'bg-green-600 text-white'
              : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
          }`}
        >
          {page}
        </button>
      ))}
      
      <button 
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};