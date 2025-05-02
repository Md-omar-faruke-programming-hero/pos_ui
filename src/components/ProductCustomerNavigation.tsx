import { useState, useEffect } from "react";
export default function ProductCustomerNavigation() {
  const [counter, setCounter] = useState<number>(0);
  const [dateKey, setDateKey] = useState<string>("");

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
    setCounter(0); // reset counter on initial load or date change
  }, []);
  const handleNextInvoice = () => {
    setCounter((prev) => prev + 1);
  };
  const invoiceNumber = `${dateKey}${String(counter).padStart(3, "0")}`;
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Product & Customer Navigation</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Invoice Number</label>
          <p className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400">
            123454678676
          </p>
        </div> */}
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
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Product BarCode *</label>
          <input
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            placeholder="Name / BarCode"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Phone</label>
          <input
            placeholder="Phone"
            type="tel"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">MemberShipID</label>
          <input
            placeholder="MemberShipID"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Select Sales Person *</label>
          <select
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
            defaultValue="fixed"
          >
            <option value="fixed">Rifat </option>
            <option value="percentage">omar</option>
            <option value="none">Noman</option>
          </select>
        </div>
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

        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Enter The Discount Amount</label>
          <input
            placeholder="Enter The Discount Amount"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Enter The Vat Amount</label>
          <input
            placeholder="Enter The Vat Amount"
            type="text"
            className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </div>
  );
}
