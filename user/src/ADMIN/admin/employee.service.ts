import api from "../../COMMON/shared/utils/api";
import type { Employee } from "./employee.types";

export const getAllEmployees = async (): Promise<Employee[]> => {
  const { data } = await api.get("/employees/get");
  return data;
};

export const getEmployeeById = async (id: number): Promise<Employee> => {
  const { data } = await api.get(`/employees/${id}`);
  return data;
};

export const updateEmployee = async (
  id: number,
  payload: Partial<Employee>
) => {
  const { data } = await api.get(`/employees/${id}/update`, payload);
  return data;
};

export const deleteEmployee = async (id: number) => {
  await api.delete(`/employees/${id}`);
};
