// productSearchContext.tsx
import React, { createContext, useState, useContext } from "react";
//import { api } from "../api";
import { Product, ProductSearchContextType } from "./productTypes";
const dummyProducts = [
  {
    id: 11,
    variationProductId: 11,
    branchId: 3,
    productName: "SL-101",
    productId: 7,
    sku: "01007-00025",
    size: "xl",
    color: null,
    stock: 138,
    category: "Pant",
    subCategory: "Formal Pant",
    price: 100,
    sellPrice: 1200,
    discount: 0,
    discountPrice: 1200,
    wholePrice: 1200,
    unique: true,
  },
  {
    id: 12,
    variationProductId: 12,
    branchId: 3,
    productName: "SL-101",
    productId: 7,
    sku: "01007-00026",
    size: "xl",
    color: null,
    stock: 140,
    category: "Pant",
    subCategory: "Formal Pant",
    price: 105,
    sellPrice: 1250,
    discount: 2,
    discountPrice: 1225,
    wholePrice: 1225,
    unique: true,
  },
  {
    id: 13,
    variationProductId: 13,
    branchId: 3,
    productName: "SL-101",
    productId: 7,
    sku: "01007-00143",
    size: "l",
    color: null,
    stock: 125,
    category: "Pant",
    subCategory: "Formal Pant",
    price: 98,
    sellPrice: 1100,
    discount: 3,
    discountPrice: 1067,
    wholePrice: 1067,
    unique: true,
  },
  {
    id: 14,
    variationProductId: 14,
    branchId: 3,
    productName: "SL-202",
    productId: 8,
    sku: "01007-00144",
    size: "xl",
    color: null,
    stock: 80,
    category: "Pant",
    subCategory: "Casual Pant",
    price: 115,
    sellPrice: 1300,
    discount: 5,
    discountPrice: 1235,
    wholePrice: 1235,
    unique: true,
  },
  {
    id: 15,
    variationProductId: 15,
    branchId: 3,
    productName: "SL-202",
    productId: 8,
    sku: "01004-00015",
    size: "l",
    color: null,
    stock: 75,
    category: "Pant",
    subCategory: "Casual Pant",
    price: 110,
    sellPrice: 1280,
    discount: 8,
    discountPrice: 1177.6,
    wholePrice: 1177.6,
    unique: true,
  },
  {
    id: 16,
    variationProductId: 16,
    branchId: 3,
    productName: "SL-303",
    productId: 9,
    sku: "01004-00016",
    size: "xl",
    color: null,
    stock: 90,
    category: "Pant",
    subCategory: "Jogger Pant",
    price: 120,
    sellPrice: 1400,
    discount: 10,
    discountPrice: 1260,
    wholePrice: 1260,
    unique: true,
  },
];

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

export const ProductSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [value, setValue] = useState<string>("");
  const [products, setProducts] = useState<Product[]>([]);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [vatAmount, setVatAmount] = useState<number>(0);

  const [membership, setMembership] = useState<string>("");

  // Maximum Retail Price (MRP) fine here
  const totalPrice = products.reduce((acc, p) => acc + p.subtotal, 0);
  // total item quantity
  const totalSKUs = products.reduce((sum, p) => sum + p.skus.length, 0);
  // Total Payable Amount
  const payableAmount = totalPrice - discountAmount + vatAmount;

  const searchBySku = async (sku: string) => {
    try {
      const found = dummyProducts.find((item) => item.sku === sku);
      if (!found) {
        throw new Error("Product not found");
      }

      setProducts((prev) => {
        const matchIndex = prev.findIndex(
          (p) => p.productName === found.productName && p.size === found.size
        );

        if (matchIndex !== -1) {
          const alreadyExists = prev[matchIndex].skus.includes(found.sku);
          if (alreadyExists) return prev;

          const updated = [...prev];
          const newSkus = [...updated[matchIndex].skus, found.sku];

          updated[matchIndex] = {
            ...updated[matchIndex],
            skus: newSkus,
            subtotal: newSkus.length * updated[matchIndex].discountPrice,
          };

          return updated;
        } else {
          return [
            ...prev,
            {
              id: found.id,
              branchId: found.branchId,
              productId: found.productId,
              productName: found.productName,
              size: found.size,
              color: found.color,
              stock: found.stock,
              category: found.category,
              subCategory: found.subCategory,
              price: found.price,
              sellPrice: found.sellPrice,
              discount: found.discount,
              discountPrice: found.discountPrice,
              wholePrice: found.wholePrice,
              unique: found.unique,
              skus: [found.sku],
              subtotal: found.discountPrice,
            },
          ];
        }
      });
    } catch (err) {
      console.error("SKU search failed", err);
      throw err;
    }
  };

  return (
    <ProductSearchContext.Provider
      value={{
        products,
        searchBySku,
        setProducts,
        totalPrice,
        totalSKUs,
        payableAmount,
        setDiscountAmount,
        setVatAmount,
        discountAmount,
        vatAmount,
        membership,
        setMembership,
        value,
        setValue,
      }}
    >
      {children}
    </ProductSearchContext.Provider>
  );
};

export const useProductSearch = () => {
  const context = useContext(ProductSearchContext);
  if (!context) {
    throw new Error("useProductSearch must be used within ProductSearchProvider");
  }
  return context;
};
