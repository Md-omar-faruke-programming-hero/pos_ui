import React, { createContext, useContext, useState /* useEffect */ } from "react";
// import { api } from "../api"; // ❌ API not needed if using static data

type Employee = {
  id: number;
  firstName: string;
  lastName: string | null;
  phone: string;
  name: string;
  
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

// ✅ Static employee list instead of fetching from API
const staticEmployees: Employee[] = [
  {
    id: 9,
    firstName: "Rifat",
    lastName: null,
    name: "Rifat",
    phone: "01850557056",
    
    employeeDesignation: {
      id: 4,
      designation: "Salesman",
    },
  },
  
];

export const EmployeeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // const [employees, setEmployees] = useState<Employee[]>([]);
  // const [salesmen, setSalesmen] = useState<Employee[]>([]);
  const [salesmanId, setSalesmanId] = useState<number | null>(null);

  // ❌ No need to fetch if using static data
  // useEffect(() => {
  //   const fetchEmployees = async () => {
  //     try {
  //       const res = await api.get("/employee/get-employee-all");
  //       const allEmployees = res.data.data || [];
  //       setEmployees(allEmployees);
  //       const filteredSalesmen = allEmployees.filter(
  //         (emp: Employee) => emp.employeeDesignation?.designation === "Salesman"
  //       );
  //       setSalesmen(filteredSalesmen);
  //     } catch (err) {
  //       console.error("Failed to fetch employees", err);
  //     }
  //   };
  //   fetchEmployees();
  // }, []);

  const salesmen = staticEmployees.filter(
    (emp) => emp.employeeDesignation?.designation === "Salesman"
  );

  return (
    <EmployeeContext.Provider
      value={{
        employees: staticEmployees,
        salesmen,
        salesmanId,
        setSalesmanId,
      }}
    >
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
