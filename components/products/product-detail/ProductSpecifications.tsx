import { Specification } from "@/types/product";

interface ProductSpecificationsProps {
  specifications: Specification[];
}

export const ProductSpecifications = ({ specifications }: ProductSpecificationsProps) => {
  return (
    <div>
      {specifications.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-900 bg-gray-50 text-sm sm:text-base">
                  NUTRIENT
                </th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-900 bg-gray-50 text-sm sm:text-base">
                  PERCENTAGE
                </th>
                <th className="text-left py-2 sm:py-3 px-2 sm:px-4 font-medium text-gray-900 bg-gray-50 text-sm sm:text-base">
                  SOURCE
                </th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((spec) => (
                <tr key={spec.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-900 text-sm sm:text-base">
                    {spec.nutrient}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">
                    {spec.percentage}
                  </td>
                  <td className="py-2 sm:py-3 px-2 sm:px-4 text-gray-700 text-sm sm:text-base">
                    {spec.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500 text-sm sm:text-base">
          No specifications available for this product.
        </p>
      )}
    </div>
  );
};