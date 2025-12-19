export default function Newsletter() {
  return (
    <div>
      <h4 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Stay Connected</h4>
      <p className="text-gray-300 mb-3 sm:mb-4 text-sm sm:text-base">Get expert tips and exclusive offers delivered to your inbox.</p>
      <div className="space-y-3 mb-4 sm:mb-6">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-3 sm:px-4 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-lg sm:rounded-l-lg sm:rounded-r-none text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm sm:text-base"
          />
          <button className="px-4 sm:px-6 py-2 sm:py-3 bg-linear-to-r from-green-500 to-emerald-500 text-white rounded-lg sm:rounded-l-none sm:rounded-r-lg font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 text-sm sm:text-base">
            Subscribe
          </button>
        </div>
      </div>
      <div className="space-y-2 text-xs sm:text-sm text-gray-300">
        <div className="flex items-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          <span className="break-all">+1 (555) 123-4567</span>
        </div>
        <div className="flex items-center">
          <svg className="w-3 h-3 sm:w-4 sm:h-4 mr-2 sm:mr-3 text-green-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          <span className="break-all">info@greenline.com</span>
        </div>
      </div>
    </div>
  );
}