import { useInvoice } from "../context/invoiceContext";
import { useProductSearch } from "../context/ProductSearchContext";
export default function CustomerInfo() {
  const { phone } = useInvoice();
  const { membership, discountAmount } = useProductSearch();
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-[42px]">Customer's Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Name
          </span>
          <input value={"N/A"} type="text" className=" border-0 outline-0" placeholder="Name" />
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Phone
          </span>
          <input value={phone} type="tel" className=" border-0 outline-0" placeholder="Phone" />
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            MemberShip
          </span>
          {membership ? (
            <input value={membership} type="text" className=" border-0 outline-0" placeholder="" />
          ) : (
            <input value={"NOt found"} type="text" className=" border-0 outline-0" placeholder="" />
          )}
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Discount
          </span>
          <input
            value={discountAmount || "Not found"}
            type="text"
            className=" border-0 outline-0"
            placeholder=""
          />
        </div>
      </div>
    </div>
  );
}
