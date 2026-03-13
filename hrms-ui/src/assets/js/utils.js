/* =========================================
   Salary Calculation
========================================= */

export const calculateNetSalary = (salary, bonus, deductions) => {

  const basic = Number(salary) || 0;
  const extra = Number(bonus) || 0;
  const subtract = Number(deductions) || 0;

  const total = basic + extra - subtract;

  return total;

};


/* =========================================
   Currency Formatter (₹)
========================================= */

export const formatCurrency = (amount) => {

  const value = Number(amount) || 0;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR"
  }).format(value);

};


/* =========================================
   Date Formatter
========================================= */

export const formatDate = (dateString) => {

  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

};


/* =========================================
   Date + Time Formatter
========================================= */

export const formatDateTime = (dateString) => {

  if (!dateString) return "N/A";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date";

  return date.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

};


/* =========================================
   Generate Random ID
========================================= */

export const generateId = () => {

  return Date.now() + Math.floor(Math.random() * 1000);

};


/* =========================================
   Status Badge Helper
========================================= */

export const getStatusClass = (status) => {

  if (!status) return "";

  switch (status.toLowerCase()) {

    case "present":
      return "status-present";

    case "absent":
      return "status-absent";

    case "leave":
      return "status-leave";

    case "pending":
      return "status-pending";

    case "approved":
      return "status-approved";

    case "rejected":
      return "status-rejected";

    default:
      return "";

  }

};