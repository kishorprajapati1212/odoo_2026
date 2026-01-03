export interface Payroll {
    payroll_id: number;
    employee_id: number;
    basic_salary: number;
    allowances: number;
    deductions: number;
    net_salary: number;
    month: string; // YYYY-MM
  }
  