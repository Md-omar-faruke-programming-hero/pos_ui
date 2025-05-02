import { createContext, useContext, useState, useEffect } from "react";

interface InvoiceContextProps {
  invoiceNumber: string;
  handleNextInvoice: () => void;
  setPhone: (phone: string) => void;
  phone: string;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

const getTodayKey = (): string => {
  const today = new Date();
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}${month}${year}`;
};

export const InvoiceProvider = ({ children }: { children: React.ReactNode }) => {
  const [counter, setCounter] = useState<number>(0);
  const [dateKey, setDateKey] = useState<string>("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    setDateKey(getTodayKey());
    setCounter(0);
  }, []);

  const handleNextInvoice = () => {
    setCounter((prev) => prev + 1);
  };

  const invoiceNumber = `${dateKey}${String(counter).padStart(3, "0")}`;

  return (
    <InvoiceContext.Provider value={{ invoiceNumber, handleNextInvoice,phone, setPhone  }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextProps => {
  const context = useContext(InvoiceContext);
  if (!context) throw new Error("useInvoice must be used within an InvoiceProvider");
  return context;
};
