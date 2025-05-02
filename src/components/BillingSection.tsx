import { useState } from "react";
import { Trash2, Plus } from "lucide-react"; // Optional: You can use emojis/icons too
import { useProductSearch } from "../context/ProductSearchContext";

type PaymentRow = {
  id: number;
  method: string;
  amount: string;
};
export default function BillingSection() {
  const [rows, setRows] = useState<PaymentRow[]>([{ id: Date.now(), method: "Cash", amount: "" }]);
  const { products, totalPrice, totalSKUs, discountAmount, vatAmount, payableAmount } =
    useProductSearch();

  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now(), method: "Cash", amount: "" }]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleChange = (id: number, field: keyof PaymentRow, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };
  return (
    <div className="bg-white rounded shadow p-4">
      <div className="space-y-1">
        <div className="flex justify-between border-b-[1px]">
          <span>Maximum Retail Price (MRP)</span>
          <span>{totalPrice}৳</span>
        </div>
        <div className="flex justify-between border-b-[1px]">
          <span>(+) Vat/Tax</span>
          <span>{vatAmount}৳</span>
        </div>
        <div className="flex justify-between border-b-[1px]">
          <span>(–) Discount</span>
          <span>{discountAmount}৳</span>
        </div>
        <div className="flex justify-between border-b-[1px]">
          <span>Number of Items</span>
          <span>{products?.length}</span>
        </div>
        <div className="flex justify-between border-b-[1px]">
          <span>Total Items Quantity</span>
          <span>{totalSKUs}</span>
        </div>
        <div className="flex justify-between font-bold text-lg ">
          <span>Total Payable Amount</span>
          <span>{payableAmount}৳</span>
        </div>
      </div>
      <div className="space-y-4 mt-4">
        {rows.map((row, index) => (
          <div key={row.id} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
            <div className="sm:w-[30px]">
              {index === 0 ? (
                <button
                  onClick={addRow}
                  className="p-[5px] border-2 text-[20px] rounded hover:bg-green-100"
                >
                  <Plus size={16} />
                </button>
              ) : (
                <button
                  onClick={() => removeRow(row.id)}
                  className="p-[5px] border-2 text-[18px] text-red-600 rounded hover:bg-red-100"
                >
                  <Trash2 size={16} />
                </button>
              )}
            </div>
            <div>
              <label className="block mb-1">Choose The Method</label>
              <select
                className="input mt-[5px]"
                value={row.method}
                onChange={(e) => handleChange(row.id, "method", e.target.value)}
              >
                <option value="Islami Bank">Islami Bank</option>
                <option value="Cash">Cash</option>
                <option value="Bkash">Bkash</option>
              </select>
            </div>
            <div>
              <label className="block mb-1">Enter Payment Amount *</label>
              <input
                className="input mt-2"
                placeholder="Enter Payment Amount"
                value={row.amount}
                onChange={(e) => handleChange(row.id, "amount", e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 space-y-1">
        <div className="flex justify-between">
          <span>Payable Amount</span>
          <span>4000.00৳</span>
        </div>
        <div className="flex justify-between">
          <span>Total Received Amount</span>
          <span>5000.00৳</span>
        </div>
        <div className="flex justify-between font-semibold">
          <span>Change</span>
          <span>1000.00৳</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button className="btn-red">Cancel & Clear</button>
        <button className="btn-green">Add POS</button>
        <button className="btn-dark">Hold</button>
        <button className="btn-brown">Hold List</button>
        <button className="btn-gray">Quotation</button>
        <button className="btn-light">Reattempt</button>
        <button className="btn-blue">SMS</button>
        <button className="btn-black">Reprint</button>
      </div>
    </div>
  );
}
