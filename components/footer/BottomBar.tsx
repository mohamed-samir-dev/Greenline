import Link from 'next/link';

const legalLinks = [
  { href: '#', label: 'Privacy Policy' },
  { href: '#', label: 'Terms of Service' },
  { href: '#', label: 'Cookie Policy' }
];

export default function BottomBar() {
  return (
    <div className="border-t border-white/10 bg-black/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 text-xs sm:text-sm text-gray-400">
          <div className="text-center sm:text-left">
            © 2024 Green Line Agricultural Solutions. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-3 sm:gap-6">
            {legalLinks.map((link, index) => (
              <Link key={index} href={link.href} className="hover:text-green-400 transition-colors whitespace-nowrap">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}