import { useState, useEffect } from "react";
import { useProductSearch } from "../context/ProductSearchContext";
import { useEmployee } from "../context/employeeContext";
import { useInvoice } from "../context/invoiceContext";

export default function ProductCustomerNavigation() {
  
  //  loding state
  const [isLoading, setIsLoading] = useState(false);
  //  check allredy added state
  const [isDuplicate, setIsDuplicate] = useState(false);
  //item added state
  const [isAdded, setIsAdded] = useState(false);
  //not found state
  const [notFound, setNotFound] = useState(false);

  const { products, searchBySku, setDiscountAmount, setVatAmount, setMembership,value, setValue } =
    useProductSearch();
  const { employees, salesmanId, setSalesmanId } = useEmployee();
  const { invoiceNumber, phone, setPhone } = useInvoice();
  // Filter only Salesmen
  const salesmen = employees.filter((emp) => emp.employeeDesignation?.designation === "Salesman");

  const handleSearch = async () => {
    const trimmed = value.trim();
    if (trimmed.length !== 11) return;

    const alreadyExists = products.some((p) => p.skus.includes(trimmed));
    if (alreadyExists) {
      setIsDuplicate(true);
      return;
    }

    try {
      setIsDuplicate(false);
      setIsLoading(true);
      await searchBySku(trimmed);
      setIsAdded(true);
      setValue("");
      setTimeout(() => setIsAdded(false), 2000);
    } catch (err) {
      console.error("Search failed", err);
      setNotFound(true);
      setTimeout(() => setNotFound(false), 2000);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (value.trim().length === 11) {
      handleSearch();
    }
    if (value.length == 0) {
      setIsDuplicate(false);
    }
  }, [value]);

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Product & Customer Navigation</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Invoice */}
        <div className="flex flex-col space-y-2 w-auto items-center">
          <label className="text-sm font-semibold text-gray-700">Invoice Number</label>
          <p className="border border-gray-400 rounded px-4 py-2 text-center text-gray-800">
            {invoiceNumber}
          </p>
        </div>

        {/* SKU Input */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Product BarCode *</label>
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name / BarCode"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          {isLoading && <p className="text-blue-500 text-sm mt-1">Searching product...</p>}
          {isDuplicate && <p className="text-red-500 text-sm mt-1">Already added</p>}
          {isAdded && <p className="text-sm text-green-600">Item added</p>}
          {notFound && <p className="text-red-500 text-sm mt-1">Product not found</p>}
        </div>

        {/* Phone Input */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Phone</label>
          <input
            placeholder="Phone"
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Membership ID */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">MemberShipID</label>
          <input
            onChange={(e) => setMembership?.(e.target.value)}
            placeholder="MemberShipID"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Salesman Dropdown */}
        <div className="flex flex-col space-y-1 w-auto">
          <label className="text-sm font-semibold text-gray-700">Select Sales Person *</label>
          <select
            value={salesmanId ?? ""}
            onChange={(e) => setSalesmanId(Number(e.target.value))}
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="" disabled>
              Select a Salesman
            </option>
            {salesmen.map((emp) => (
              <option key={emp.id} value={emp.id}>
                {emp.firstName || "Unnamed"} {emp.lastName ?? ""}
              </option>
            ))}
          </select>
        </div>

        {/* Discount Type */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Select Discount Type</label>
          <select
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue="fixed"
          >
            <option value="fixed">Fixed</option>
            <option value="percentage">Percentage</option>
            <option value="none">None</option>
          </select>
        </div>

        {/* Discount Amount */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Enter The Discount Amount</label>
          <input
            onChange={(e) => setDiscountAmount(Number(e.target.value))}
            placeholder="Enter The Discount Amount"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* VAT Amount */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Enter The Vat Amount</label>
          <input
            onChange={(e) => setVatAmount(Number(e.target.value))}
            placeholder="Enter The Vat Amount"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
