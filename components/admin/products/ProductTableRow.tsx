import Image from "next/image";
import { Product } from "@/types/product";

interface ProductTableRowProps {
  product: Product;
  onDelete: (id: string) => void;
}

export default function ProductTableRow({ product, onDelete }: ProductTableRowProps) {
  return (
    <tr className="border-t">
      <td className="px-4 py-3 text-gray-900 font-mono">{product.sku}</td>
      <td className="px-4 py-3">
        {product.image && (
          <Image src={product.image} alt={product.name} width={64} height={64} className="object-cover rounded" />
        )}
      </td>
      <td className="px-4 py-3 text-gray-900">{product.name}</td>
      <td className="px-4 py-3 text-gray-900">${product.price}</td>
      <td className="px-4 py-3 text-gray-900">{product.category}</td>
      <td className="px-4 py-3 text-gray-900">{product.stock}</td>
      <td className="px-4 py-3">
        <button
          onClick={() => onDelete(product.id)}
          className="text-red-600 hover:text-red-800"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}
