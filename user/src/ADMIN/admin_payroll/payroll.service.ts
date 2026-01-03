import api from "../../COMMON/shared/utils/api";
import type { Payroll } from "./payroll.types";

export const getPayrollByEmployee = async (
  employeeId: number
): Promise<Payroll[]> => {
  const { data } = await api.get(`/payroll/employee/${employeeId}`);
  return data;
};

export const createPayroll = async (payload: {
  employee_id: number;
  month: string;
  basic_salary: number;
  allowances: number;
  deductions: number;
}) => {
  const { data } = await api.post("/payroll", payload);
  return data;
};

export const deletePayroll = async (id: number) => {
  await api.delete(`/payroll/${id}`);
};
