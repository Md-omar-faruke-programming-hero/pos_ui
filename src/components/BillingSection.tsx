import { useEffect, useState } from "react";
import { Trash2, Plus } from "lucide-react";
import { useProductSearch } from "../context/ProductSearchContext";
import { useInvoice } from "../context/invoiceContext";

//  import { api } from "../api";
import { useEmployee } from "../context/employeeContext";
import { HoldListModal, HoldInvoice } from "./HoldListModal";
// import type { Product as ContextProduct } from "../context/productTypes";

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
export type Product = {
  id: number;
  branchId: number;
  productId: number;
  productName: string;
  size: string;
  color: string | null;
  stock: number;
  category: string;
  subCategory: string;
  price: number;
  sellPrice: number;
  discount: number;
  discountPrice: number;
  wholePrice: number;
  unique: boolean;
  skus: string[];
  subtotal: number;
};

export default function BillingSection() {
  const [rows, setRows] = useState<PaymentRow[]>([{ id: Date.now(), method: "", amount: "" }]);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState(false);

  const discountType = "Fixed";

  const {
    products,
    setProducts,
    totalPrice,
    totalSKUs,
    discountAmount,
    vatAmount,
    payableAmount,
    setMembership,
    setDiscountAmount,
    setVatAmount,
    setValue,
  } = useProductSearch();
  const { invoiceNumber, handleNextInvoice, phone, setPhone, setRestorinv } = useInvoice();
  const { salesmanId, setSalesmanId } = useEmployee();

  const totalReceived = rows.reduce((total, r) => total + (parseFloat(r.amount) || 0), 0);
  const changeAmount = totalReceived - payableAmount;

  // useEffect(() => {
  //   const fetchAccounts = async () => {
  //     try {
  //       const res = await api.get("/account/get-accounts?type=All");
  //       setAccounts(res.data?.data || []);
  //     } catch (error) {
  //       console.error("Failed to fetch payment methods:", error);
  //     }
  //   };
  //   fetchAccounts();
  // }, []);
  useEffect(() => {
    setAccounts([
      {
        id: 1,
        bankName: "Bank of America",
        accountName: "John Doe",
      },
      {
        id: 2,
        bankName: "Chase Bank",
        accountName: "Jane Smith",
      },
      {
        id: 3,
        bankName: "Wells Fargo",
        accountName: "Emily Davis",
      },
      {
        id: 7,
        bankName: "Nagad",
        accountName: "Nagad Account",
      },
      {
        id: 2,
        bankName: "Cash",
        accountName: "Cash Account",
      },
    ]);
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

  // add pos handler
  const clearPOSState = () => {
    setProducts([]);
    setPhone("");
    setMembership("");
    setDiscountAmount(0);
    setVatAmount(0);
    setSalesmanId(null);
    setValue("");
    setRestorinv("");
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

      try {
        //  const res = await api.post("/sell/create-sell", payload);
        //  console.log("✅ Sell created:", res.data);
      
        if (products.length !== 0) {
          alert("Sell created successfully!");
          handleNextInvoice();

          clearPOSState();
          setProducts([]);
          setRows([{ id: Date.now(), method: "", amount: "" }]);
        }
      } catch (err) {
        console.error("❌ Sell submission failed:", err);
        alert("Sell failed. See console for details.");
      } finally {
        setLoading(false);
        setProducts([]);
      }
    } else {
      alert("Need Amount");
    }
  };
  // clear and cancel handler
  const clearProducts = () => {
    setProducts([]);
    clearPOSState();
    setRows([{ id: Date.now(), method: "", amount: "" }]);
  };

  // hold  handler

  const handleHold = () => {
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
      timestamp: new Date().toISOString(), // i just keep it  for tracking purpose
    };

    const isvalid = products.length == 0;
    if (isvalid) {
      alert("Nothing to add on hold");
      return;
    }
    const heldSales = JSON.parse(localStorage.getItem("heldSales") || "[]");
    heldSales.push(payload);
    localStorage.setItem("heldSales", JSON.stringify(heldSales));
    handleNextInvoice();
    clearPOSState();
    setRows([{ id: Date.now(), method: "", amount: "" }]);
    alert("Hold  successfully!");
  };

  // hold list  handler
  const [isModalOpen, setModalOpen] = useState(false);
  const [holdList, setHoldList] = useState<HoldInvoice[]>([]);
  const openHoldList = () => {
    const stored = localStorage.getItem("heldSales");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setHoldList(parsed);
        setModalOpen(true);
      } catch (err) {
        console.error("Invalid hold data", err);
      }
    }
  };

  const handleRestore = (invoice: HoldInvoice) => {
    console.log(invoice);
    const mappedProducts: Product[] = invoice.products.map((p) => ({
      id: p.variationProductId,
      branchId: 0,
      productId: 0,
      productName: "",
      size: "",
      color: null,
      stock: 0,
      category: "",
      subCategory: "",
      price: p.unitPrice + p.discount,
      sellPrice: p.unitPrice + p.discount,
      discount: p.discount,
      discountPrice: p.unitPrice,
      wholePrice: 0,
      unique: false,
      skus: invoice.sku || [],
      subtotal: p.subTotal,
    }));

    setProducts(mappedProducts);
    setRestorinv(invoice.invoiceNo);

    setModalOpen(false);
  };

  const handleDelete = (timestamp: string) => {
    const updated = holdList.filter((item) => item.timestamp !== timestamp);
    setHoldList(updated);
    localStorage.setItem("heldSales", JSON.stringify(updated));
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
          {products.length == 0 ? <span>0৳</span> : <span>{totalReceived.toFixed(2)}৳</span>}
        </div>
        {totalReceived < payableAmount ? (
          <div className="flex justify-between font-semibold">
            <span>Need More</span>
            {products.length == 0 ? (
              <span>0৳</span>
            ) : (
              <span>{Math.abs(changeAmount).toFixed(2)}৳</span>
            )}
          </div>
        ) : (
          <div className="flex justify-between font-semibold">
            <span>Change</span>
            {products.length == 0 ? <span>0৳</span> : <span>{changeAmount.toFixed(2)}৳</span>}
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
        <button onClick={handleHold} className="btn-dark">
          Hold
        </button>
        <button onClick={openHoldList} className="btn-brown">
          Hold List
        </button>
        <button className="btn-gray">Quotation</button>
        <button className="btn-light">Reattempt</button>
        <button className="btn-blue">SMS</button>
        <button className="btn-black">Reprint</button>
      </div>
      <HoldListModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onRestore={handleRestore}
        onDelete={handleDelete}
        holdList={holdList}
      />
    </div>
  );
}
