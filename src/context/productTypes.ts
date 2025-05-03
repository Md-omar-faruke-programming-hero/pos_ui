// productTypes.ts
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
  
  export type ProductSearchContextType = {
    products: Product[];
    searchBySku: (sku: string) => Promise<void>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    totalPrice: number;
    totalSKUs: number;
    discountAmount: number;
    vatAmount: number;
    payableAmount: number;
    setDiscountAmount: React.Dispatch<React.SetStateAction<number>>;
    setVatAmount: React.Dispatch<React.SetStateAction<number>>;
    membership: string;
    setMembership: React.Dispatch<React.SetStateAction<string>>;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
   
   
    
  };