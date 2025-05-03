import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useProductSearch } from "../context/ProductSearchContext";
import { useInvoice } from "../context/invoiceContext";

import { api } from "../api";
import { useEmployee } from "../context/employeeContext";

type PaymentRow = {
  id: number;
  method: string;
  amount: string;
};

type Account = {
  id: number;
  bankName: string;
  accountName: string;
};

export default function BillingSection() {
  const [rows, setRows] = useState<PaymentRow[]>([{ id: Date.now(), method: "", amount: "" }]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const discountType = "Fixed";

  const { products, setProducts, totalPrice, totalSKUs, discountAmount, vatAmount, payableAmount } =
    useProductSearch();
  const { invoiceNumber, handleNextInvoice, phone } = useInvoice();
  const { salesmanId } = useEmployee();

  const totalReceived = rows.reduce((total, r) => total + (parseFloat(r.amount) || 0), 0);
  const changeAmount = totalReceived - payableAmount;

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get("/account/get-accounts?type=All");
        setAccounts(res.data?.data || []);
      } catch (error) {
        console.error("Failed to fetch payment methods:", error);
      }
    };
    fetchAccounts();
  }, []);

  const addRow = () => {
    setRows((prev) => [...prev, { id: Date.now(), method: "", amount: "" }]);
  };

  const removeRow = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  const handleChange = (id: number, field: keyof PaymentRow, value: string) => {
    setRows((prev) => prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)));
  };

  const handleSubmit = async () => {
    if (totalReceived >= payableAmount) {
      setLoading(true);
      const formattedProducts = products.map((p) => ({
        variationProductId: p.id,
        quantity: p.skus.length,
        unitPrice: p.discountPrice,
        discount: p.sellPrice - p.discountPrice,
        subTotal: p.subtotal,
      }));

      const formattedPayments = rows.map((r) => ({
        paymentAmount: parseFloat(r.amount),
        accountId: accounts.find((a) => a.bankName === r.method)?.id || 0,
      }));

      const skuList = products.flatMap((p) => (Array.isArray(p.skus) ? p.skus : []));

      const payload = {
        invoiceNo: invoiceNumber,
        salesmenId: salesmanId,
        discountType,
        discount: discountAmount,
        phone,
        totalPrice,
        totalPaymentAmount: totalReceived,
        changeAmount,
        vat: vatAmount,
        products: formattedProducts,
        payments: formattedPayments,
        sku: skuList,
      };
      console.log("/sell/create-sell", payload);

      try {
        const res = await api.post("/sell/create-sell", payload);
        console.log("✅ Sell created:", res.data);
        alert("Sell created successfully!");
        handleNextInvoice();
        setProducts([]);
      } catch (err) {
        console.error("❌ Sell submission failed:", err);
        alert("Sell failed. See console for details.");
      } finally {
        setLoading(false);
      }
    } else {
      alert("Need Amount");
    }
  };

  const clearProducts = () => {
    setProducts([]);
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
        <div className="flex justify-between font-bold text-lg">
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
                className="input mt-[5px] w-full"
                value={row.method}
                onChange={(e) => handleChange(row.id, "method", e.target.value)}
              >
                <option value="" disabled>
                  Select Method
                </option>
                {accounts.map((account) => (
                  <option key={account.id} value={account.bankName}>
                    {account.bankName}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block mb-1">Enter Payment Amount *</label>
              <input
                className="input mt-2 w-full"
                placeholder="Enter Payment Amount"
                type="number"
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
          <span>{payableAmount}৳</span>
        </div>
        <div className="flex justify-between">
          <span>Total Received Amount</span>
          <span>{totalReceived.toFixed(2)}৳</span>
        </div>
        {totalReceived < payableAmount ? (
          <div className="flex justify-between font-semibold">
            <span>Need</span>
            <span>{Math.abs(changeAmount).toFixed(2)}৳</span>
          </div>
        ) : (
          <div className="flex justify-between font-semibold">
            <span>Change</span>
            <span>{changeAmount.toFixed(2)}৳</span>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button onClick={clearProducts} className="btn-red cursor-pointer">
          Cancel & Clear
        </button>
        <button className="btn-green cursor-pointer" onClick={handleSubmit} disabled={loading}>
          {loading ? "Processing..." : "Add POS"}
        </button>
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
