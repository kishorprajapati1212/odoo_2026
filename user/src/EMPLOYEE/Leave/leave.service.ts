import api from "../../COMMON/shared/utils/api";
import type { Leave } from "./leave.types";

/* EMPLOYEE */

export const applyLeave = (payload: {
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
}) => api.post("/leave", payload);

export const getMyLeaves = async (): Promise<Leave[]> => {
  const { data } = await api.get("/leave/me");
  return data;
};

export const cancelLeave = (leave_id: number) =>
  api.delete(`/leave/${leave_id}`);
