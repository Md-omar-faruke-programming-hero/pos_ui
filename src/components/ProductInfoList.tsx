import ProductCard from "./ProductCard";

export default function ProductInfoList() {
  const products = [
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
      skus: ["00025", "00026", "00027","00025", "00026", "00027"],
    },
  ];
  

  return (
    <div className="bg-white rounded shadow p-4 space-y-4">
      <h2 className="text-lg font-semibold">Products Information</h2>
      <div className="space-y-4">
        {products.map((prod, index) => (
          <ProductCard key={index} {...prod} />
        ))}
      </div>
    </div>
  );
}
