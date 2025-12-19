import CompanyInfo from "./CompanyInfo";
import QuickLinks from "./QuickLinks";
import ProductsSupport from "./ProductsSupport";
import Newsletter from "./Newsletter";
import CertificationsBar from "./CertificationsBar";
import BottomBar from "./BottomBar";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-12">
          <div className="sm:col-span-2 lg:col-span-1">
            <CompanyInfo />
          </div>
          <QuickLinks />
          <ProductsSupport />
          <div className="sm:col-span-2 lg:col-span-1">
            <Newsletter />
          </div>
        </div>
      </div>
      <CertificationsBar />
      <BottomBar />
    </footer>
  );
}
