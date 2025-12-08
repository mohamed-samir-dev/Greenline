export default function Footer() {
  return (
    <footer className="bg-green-100 py-8 sm:py-10 lg:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {/* Green Line Section */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-green-800 mb-2 sm:mb-3">Green Line</h3>
            <p className="text-gray-700 text-xs sm:text-sm">
              Your trusted partner in plant nutrition. We provide high-quality fertilizers to help your garden thrive.
            </p>
          </div>

          {/* Shop Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Shop</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li><a href="#" className="hover:text-green-600">Organic Fertilizers</a></li>
              <li><a href="#" className="hover:text-green-600">Chemical Products</a></li>
              <li><a href="#" className="hover:text-green-600">Liquid Concentrates</a></li>
              <li><a href="#" className="hover:text-green-600">Granules/Others</a></li>
            </ul>
          </div>

          {/* Customer Service Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Customer Service</h3>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-700">
              <li><a href="#" className="hover:text-green-600">Contact Us</a></li>
              <li><a href="#" className="hover:text-green-600">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-green-600">FAQ</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 sm:mb-3">Newsletter</h3>
            <p className="text-gray-600 text-xs sm:text-sm mb-3 sm:mb-4">Subscribe for tips, new products, and special offers.</p>
            <div className="flex flex-col gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full text-black px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <button className="bg-green-600 hover:bg-green-700 text-white px-3 sm:px-4 py-2 sm:py-2.5 rounded-lg text-xs sm:text-sm font-semibold transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-300 text-center text-xs sm:text-sm text-gray-600">
          © 2024 Green Line. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
