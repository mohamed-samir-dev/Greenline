import Image from "next/image";
import { Product } from "@/types/product";

interface ProductTableRowProps {
  product: Product;
  onDelete: (id: string) => void;
  onEdit: (product: Product) => void;
}

export default function ProductTableRow({ product, onDelete, onEdit }: ProductTableRowProps) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-gray-900 font-mono">{product.sequentialId || 'N/A'}</td>
      <td className="px-4 py-3">
        {product.mainImage && (
          <Image src={product.mainImage} alt={product.name} width={64} height={64} className="object-cover rounded" />
        )}
      </td>
      <td className="px-4 py-3 text-gray-900">{product.name}</td>
      <td className="px-4 py-3 text-gray-900">${product.price}</td>
      <td className="px-4 py-3 text-gray-900">{product.category}</td>
      <td className="px-4 py-3 text-gray-900">{product.stockQuantity
      }</td>
      <td className="px-4 py-3">
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(product)}
            className="text-blue-600 hover:text-blue-800"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(product.id)}
            className="text-red-600 hover:text-red-800"
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
}
