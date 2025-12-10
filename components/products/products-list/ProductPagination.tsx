export const ProductPagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-8">
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Previous</button>
      <button className="px-4 py-2 bg-green-600 text-white rounded-lg">1</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">2</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">3</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">4</button>
      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-gray-700">Next</button>
    </div>
  );
};