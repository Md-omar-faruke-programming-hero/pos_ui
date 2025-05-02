export default function CustomerInfo() {
  return (
    <div className="bg-white rounded shadow p-4">
      <h2 className="text-lg font-semibold mb-[42px]">Customer's Information</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Name
          </span>
          <input type="text" className=" border-0 outline-0" placeholder="Name" />
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Phone
          </span>
          <input type="tel" className=" border-0 outline-0" placeholder="Phone" />
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            MemberShip
          </span>
          <input type="tel" className=" border-0 outline-0" placeholder="" />
        </div>
        <div className="flex items-center border border-gray-400 rounded px-2 py-1 ">
          <span className="bg-[#f3f4f6] px-2 text-sm font-semibold text-gray-700 -ml-2 mr-2">
            Discount
          </span>
          <input type="tel" className=" border-0 outline-0" placeholder="" />
        </div>
      </div>
    </div>
  );
}
