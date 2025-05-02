import { useProductSearch } from "../context/ProductSearchContext";
import ProductCard from "./ProductCard";

export default function ProductInfoList() {
  const { products, setProducts } = useProductSearch();

  const deleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteSKU = (productIndex: number, sku: string) => {
    setProducts((prev) => {
      const newProducts = [...prev];
      const updatedSkus = newProducts[productIndex].skus.filter((s) => s !== sku);
  
      if (updatedSkus.length === 0) {
        // Remove the product entirely if no SKUs left
        newProducts.splice(productIndex, 1);
      } else {
        const discountPrice = newProducts[productIndex].discountPrice;
        newProducts[productIndex] = {
          ...newProducts[productIndex],
          skus: updatedSkus,
          subtotal: updatedSkus.length * discountPrice, 
        };
      }
  
      return newProducts;
    });
  };
  
  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Products Information</h2>
      <div className="space-y-4">
        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center min-h-[150px] text-center text-gray-500 font-medium text-sm sm:text-base px-4">
            <p className="font-bold">Product has not been selected yet.</p>
            <p>You can add a new product.</p>
          </div>
        ) : (
          products.map((prod, index) => (
            <ProductCard
              key={index}
              {...prod}
              index={index}
              onDelete={() => deleteProduct(index)}
              onDeleteSKU={(sku) => deleteSKU(index, sku)}
            />
          ))
        )}
      </div>
    </div>
  );
}
