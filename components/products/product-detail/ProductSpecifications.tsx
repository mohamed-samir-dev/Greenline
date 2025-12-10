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
                <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                  NUTRIENT
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                  PERCENTAGE
                </th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 bg-gray-50">
                  SOURCE
                </th>
              </tr>
            </thead>
            <tbody>
              {specifications.map((spec) => (
                <tr key={spec.id} className="border-b border-gray-100 last:border-0">
                  <td className="py-3 px-4 text-gray-900">
                    {spec.nutrient}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {spec.percentage}
                  </td>
                  <td className="py-3 px-4 text-gray-700">
                    {spec.source}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">
          No specifications available for this product.
        </p>
      )}
    </div>
  );
};