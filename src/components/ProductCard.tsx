import type { Product } from "../context/productTypes";

type ProductCardProps = Product & {
  subtotal:number;
  index: number;
  onDelete: () => void;
  onDeleteSKU: (sku: string) => void;
};

export default function ProductCard({
  productName,
  size,
  sellPrice,
  discountPrice,
  stock,
  skus,
  subtotal,
  onDelete,
  onDeleteSKU,
}: ProductCardProps) {
  return (
    <div className="bg-gray-100 rounded p-4 relative">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <p>
            <strong>Name</strong> {productName}
          </p>
          <p>
            <strong>Size</strong> {size}
          </p>
          <p>
            <strong>Color</strong> Not found
          </p>
          <p>
            <strong>Available Stock</strong> {stock} Units
          </p>
          <p>
            <strong>SKU</strong>{" "}
            {skus.length > 0 ? (
              skus.map((sku, idx) => (
                <span
                  key={idx}
                  className="inline-block  rounded mr-2 cursor-pointer hover:bg-red-100 hover:text-red-600"
                  onClick={() => onDeleteSKU(sku)}
                  title="Click to remove SKU"
                >
                  {sku.slice(-5)}
                </span>
              ))
            ) : (
              <span className="text-red-500">No SKU</span>
            )}
          </p>
        </div>

        <div className="flex justify-between items-center mt-2">
          {discountPrice == sellPrice ? (
            <div className="relative flex items-center w-[160px] mr-[10px] bg-white">
              <p className="input">{`Tk. ${discountPrice}`}</p>
            </div>
          ) : (
            <div className="relative flex items-center w-[160px] mr-[10px] bg-white">
              <p className="input">{`Tk. ${discountPrice}`}</p>
              <span className="absolute left-[85px]">
                <del>{sellPrice}</del>
              </span>
            </div>
          )}

          <span className="font-semibold">Subtotal: Tk {subtotal.toFixed(2)}</span>
        </div>

        <div>
          <button
            onClick={onDelete}
            className="absolute cursor-pointer top-2 right-2 bg-red-600 text-white rounded p-1 hover:bg-red-700"
          >
            🗑
          </button>
        </div>
      </div>
    </div>
  );
}
