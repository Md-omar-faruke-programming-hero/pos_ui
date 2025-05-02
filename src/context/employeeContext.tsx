import React, { createContext, useContext, useEffect, useState } from "react";
import { api } from "../api";

type Employee = {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  name: string;
  avatar?: string;
  employeeDesignation?: {
    id: number;
    designation: string;
  };
};

type EmployeeContextType = {
  employees: Employee[];
  salesmen: Employee[];
  salesmanId: number | null;
  setSalesmanId: (id: number | null) => void;
};

const EmployeeContext = createContext<EmployeeContextType | undefined>(undefined);

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [salesmen, setSalesmen] = useState<Employee[]>([]);
  const [salesmanId, setSalesmanId] = useState<number | null>(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await api.get("/employee/get-employee-all");
        const allEmployees = res.data.data || [];

        setEmployees(allEmployees);

        // Filter only "Salesman"
        const filteredSalesmen = allEmployees.filter(
          (emp: Employee) => emp.employeeDesignation?.designation === "Salesman"
        );
        setSalesmen(filteredSalesmen);
      } catch (err) {
        console.error("Failed to fetch employees", err);
      }
    };

    fetchEmployees();
  }, []);

  return (
    <EmployeeContext.Provider value={{ employees, salesmen, salesmanId, setSalesmanId }}>
      {children}
    </EmployeeContext.Provider>
  );
};

export const useEmployee = () => {
  const context = useContext(EmployeeContext);
  if (!context) {
    throw new Error("useEmployee must be used within EmployeeProvider");
  }
  return context;
};
