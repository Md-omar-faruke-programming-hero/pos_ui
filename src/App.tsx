import ProductCustomerNavigation from "./components/ProductCustomerNavigation";
import CustomerInfo from "./components/CustomerInfo";
import BillingSection from "./components/BillingSection";
import ProductInfoList from "./components/ProductInfoList";

export default function App() {
  return (
    <div className="p-4 bg-gray-100 min-h-screen space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ProductCustomerNavigation />
        <CustomerInfo />
        <ProductInfoList />
        <BillingSection />
      </div>
    </div>
  );
}
