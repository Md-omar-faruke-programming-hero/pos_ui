// productSearchContext.tsx
import React, { createContext, useState, useContext } from "react";
import { api } from "../api";
import { Product, ProductSearchContextType } from "./productTypes";

const ProductSearchContext = createContext<ProductSearchContextType | undefined>(undefined);

export const ProductSearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
      const res = await api.get("/purchase/get-purchase-single", {
        params: { search: sku },
      });

      const found = res.data.data?.[0];
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
