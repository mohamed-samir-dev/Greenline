import Link from 'next/link';

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' }
];

export default function BottomBar() {
  return (
    <div className="border-t border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row items-center justify-between text-sm text-gray-400">
          <div className="mb-2 md:mb-0">
            © 2024 Green Line Agricultural Solutions. All rights reserved.
          </div>
          <div className="flex space-x-6">
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className="hover:text-green-400 transition-colors">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}