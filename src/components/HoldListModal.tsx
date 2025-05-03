import React from "react";
import Modal from "react-modal";

type HeldProduct = {
  variationProductId: number;
  quantity: number;
  unitPrice: number;
  discount: number;
  subTotal: number;
};
type HeldPayment = { paymentAmount: number | null; accountId: number };

export type HoldInvoice = {
  invoiceNo: string;
  salesmenId: string | null;
  discountType: "Fixed" | "Percentage";
  discount: number;
  phone: string;
  totalPrice: number;
  totalPaymentAmount: number;
  changeAmount: number;
  vat: number;
  products: HeldProduct[];
  payments: HeldPayment[];
  sku: string[];
  timestamp: string;
};

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onRestore: (payload: HoldInvoice) => void;
  onDelete: (timestamp: string) => void; // update from invoiceNo to timestamp
  holdList: HoldInvoice[];
};

Modal.setAppElement("#root");

export const HoldListModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onRestore,
  onDelete,
  holdList,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Held POS Invoices"
      className="bg-white p-5 rounded shadow max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-start"
    >
      <h2 className="text-lg font-bold mb-4">Held POS Invoices</h2>
      <table className="w-full text-sm border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-2 py-1">#</th>
            <th className="border px-2 py-1">Invoice No</th>
            <th className="border px-2 py-1">Total</th>
            <th className="border px-2 py-1">Time</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {holdList.map((item, index) => (
            <tr key={item.timestamp}>
              <td className="border px-2 py-1 text-center">{index + 1}</td>
              <td className="border px-2 py-1 text-center">{item.invoiceNo}</td>
              <td className="border px-2 py-1 text-center">{item.totalPrice}</td>
              <td className="border px-2 py-1 text-center">
                {new Date(item.timestamp).toLocaleTimeString()}
              </td>
              <td className="border px-2 py-1 text-center space-x-2">
                <button
                  onClick={() => onRestore(item)}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Restore
                </button>
                <button
                  onClick={() => onDelete(item.timestamp)}
                  className="bg-red-600 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-300 rounded">
        Close
      </button>
    </Modal>
  );
};
