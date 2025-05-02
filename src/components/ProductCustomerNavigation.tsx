export default function ProductCustomerNavigation() {
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Product & Customer Navigation</h2>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col space-y-1 w-[auto]">
          <label className="text-sm font-semibold text-gray-700">Invoice Number</label>
          <p className="border border-gray-400 rounded px-3 py-1.5 text-center text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400">
            123454678676
          </p>
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
