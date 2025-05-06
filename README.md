# POS Frontend Task

This project is a Point of Sale (POS) front-end implementation built using **React + TypeScript + TailwindCSS** based on provided video instructions, API resources, and UI design.

## ✅ Features Implemented

According to the instructions from the provided videos:

- ✅ Salesman dropdown using static or API-fetched employee list
- ✅ Product search via SKU (auto-trigger when 11 characters are typed or pasted)
- ✅ "Already added" and "Item added" alerts with dynamic UI feedback
- ✅ Invoice number generation (`DDMMYYYY000` format)
- ✅ Dynamic product card list with:
  - SKU grouping
  - Real-time subtotal updates
  - Delete product / delete individual SKU
- ✅ Calculation of:
  - Total items
  - Total SKU quantity
  - VAT, Discount, Payable Amount
  - Total Received and Change / Need
- ✅ Multi-payment entry with dynamic row addition/removal
- ✅ API integration to `/sell/create-sell` using correct payload structure
- ✅ State managed using React Context (Product, Employee, Invoice)
- ✅ Fully responsive UI (mobile & desktop)
- ✅ Data types handled strictly using TypeScript

## 📦 Tech Stack

- React
- TypeScript
- TailwindCSS
- Axios
- Vite (optional) or CRA
- Context API (for product, invoice, employee)

## 📁 Folder Structure (Simplified)


## 🔗 APIs Used

- [x] GET `/api/v1/account/get-accounts?type=All` – fetch payment methods
- [x] GET `/api/v1/employee/get-employee-all` – fetch employee list
- [x] GET `/api/v1/purchase/get-purchase-single` – product search by SKU
- [x] POST `/api/v1/sell/create-sell` – submit POS data

## 📄 Notes

- All data (e.g., salesmen) can be switched between static and API-based based on environment.
- Error handling and basic validation are included.
- Each interaction matches the functional requirements demonstrated in the videos.

---

## 🚀 How to Run

```bash
npm install
npm run dev
