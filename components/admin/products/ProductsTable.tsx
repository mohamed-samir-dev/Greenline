import { Product } from "@/types/product";
import ProductTableRow from "./ProductTableRow";

interface ProductsTableProps {
  products: Product[];
  onDelete: (id: string) => void;
}

export default function ProductsTable({ products, onDelete }: ProductsTableProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">SKU</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Image</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Name</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Price</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Category</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Stock</th>
            <th className="px-4 py-3 text-left text-gray-900 font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <ProductTableRow key={product.id} product={product} onDelete={onDelete} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
