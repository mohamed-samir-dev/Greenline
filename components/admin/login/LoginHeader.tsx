export default function LoginHeader() {
  return (
    <div className="text-center mb-8">
      <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-green-600 to-emerald-600 rounded-2xl shadow-lg mb-4 transform hover:scale-105 transition-transform duration-300">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      </div>
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Portal</h1>
      <p className="text-gray-600">Sign in to manage your store</p>
    </div>
  );
}
