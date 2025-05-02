import { useState, useEffect } from "react";
import { useProductSearch } from "../context/ProductSearchContext";
import { useEmployee } from "../context/employeeContext";

export default function ProductCustomerNavigation() {
  //  date-state
  const [counter, setCounter] = useState<number>(0);
  const [dateKey, setDateKey] = useState<string>("");
  const [value, setValue] = useState("");

  const { searchBySku, setDiscountAmount, setVatAmount } = useProductSearch();
  const { employees, salesmanId, setSalesmanId } = useEmployee();
  // Filter only Salesmen
  const salesmen = employees.filter((emp) => emp.employeeDesignation?.designation === "Salesman");
  // Generate date-based key: DDMMYYYY000
  const getTodayKey = (): string => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const year = today.getFullYear();
    return `${day}${month}${year}`;
  };

  useEffect(() => {
    setDateKey(getTodayKey());
    setCounter(0);
  }, []);

  const handleNextInvoice = () => {
    setCounter((prev) => prev + 1);
  };

  const invoiceNumber = `${dateKey}${String(counter).padStart(3, "0")}`;

  const handleSearch = async () => {
    await searchBySku(value.trim());
    setValue("");
  };

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
          <button
            onClick={handleNextInvoice}
            className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Generate Next Invoice
          </button>
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
        </div>

        {/* Phone Input */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Phone</label>
          <input
            placeholder="Phone"
            type="tel"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        {/* Membership ID */}
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">MemberShipID</label>
          <input
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
