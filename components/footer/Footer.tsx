import CompanyInfo from "./CompanyInfo";
import QuickLinks from "./QuickLinks";
import ProductsSupport from "./ProductsSupport";
import Newsletter from "./Newsletter";
import CertificationsBar from "./CertificationsBar";
import BottomBar from "./BottomBar";

export default function Footer() {
  return (
    <footer className="bg-linear-to-br from-gray-900 via-green-900 to-emerald-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <CompanyInfo />
          <QuickLinks />
          <ProductsSupport />
          <Newsletter />
        </div>
      </div>
      <CertificationsBar />
      <BottomBar />
    </footer>
  );
}
