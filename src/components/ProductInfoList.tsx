import ProductCard from "./ProductCard";
import { useState } from "react";
type Product = {
  name: string;
  size: string;
  price: number;
  subtotal: number;
  stock: number;
  skus: string[];
};
export default function ProductInfoList() {
  const [products, setProducts] = useState<Product[]>([
    {
      name: "SI-801",
      size: "SM",
      price: 350,
      subtotal: 700,
      stock: 10,
      skus: ["00015", "00016"],
    },
    {
      name: "SI-101",
      size: "SM",
      price: 450,
      subtotal: 900,
      stock: 30,
      skus: ["00143", "00144"],
    },
    {
      name: "SI-101",
      size: "XL",
      price: 12000,
      subtotal: 2400,
      stock: 138,
      skus: ["00025", "00026", "00027"],
    },
  ]);

  const deleteProduct = (index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  const deleteSKU = (productIndex: number, sku: string) => {
    setProducts((prev) =>
      prev.map((product, i) =>
        i === productIndex
          ? {
              ...product,
              skus: product.skus.filter((s) => s !== sku),
            }
          : product
      )
    );
  };

  return (
    // <div className="bg-white rounded shadow p-4 space-y-4">
    //   <h2 className="text-lg font-semibold">Products Information</h2>
    //   <div className="space-y-4">
    //     {products.map((prod, index) => (
    //       <ProductCard key={index} {...prod} />
    //     ))}
    //   </div>
    // </div>
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Products Information</h2>
      <div className="space-y-4">
        {products.map((prod, index) => (
          <ProductCard
            key={index}
            {...prod}
            index={index}
            onDelete={() => deleteProduct(index)}
            onDeleteSKU={(sku) => deleteSKU(index, sku)}
          />
        ))}
      </div>
    </div>
  );
}
