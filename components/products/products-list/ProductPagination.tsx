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
    <div className="flex flex-wrap justify-center items-center gap-2 mt-6 sm:mt-8">
      <button 
        onClick={onPrevPage}
        disabled={!hasPrevPage}
        className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Previous
      </button>
      
      <div className="flex gap-1 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`px-3 sm:px-4 py-2 rounded-lg text-sm sm:text-base ${
              page === currentPage
                ? 'bg-green-600 text-white'
                : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      
      <button 
        onClick={onNextPage}
        disabled={!hasNextPage}
        className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700 text-sm sm:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Next
      </button>
    </div>
  );
};