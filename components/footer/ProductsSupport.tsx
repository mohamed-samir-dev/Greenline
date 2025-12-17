import Link from 'next/link';

const links = [
  { href: '#', label: 'Organic Fertilizers' },
  { href: '#', label: 'Liquid Concentrates' },
  { href: '#', label: 'Granular Formulas' },
  { href: '#', label: 'Customer Support' },
  { href: '#', label: 'Shipping Info' }
];

export default function ProductsSupport() {
  return (
    <div>
      <h4 className="text-lg font-semibold text-white mb-6">Products & Support</h4>
      <ul className="space-y-3">
        {links.map((link, index) => (
          <li key={index}>
            <Link href={link.href} className="text-gray-300 hover:text-green-400 transition-colors flex items-center group">
              <span className="w-1.5 h-1.5 bg-green-400 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity"></span>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}