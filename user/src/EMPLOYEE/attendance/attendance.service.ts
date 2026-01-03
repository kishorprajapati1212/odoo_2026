import api from "../../COMMON/shared/utils/api";
import type { Attendance } from "./attendance.types";

export const checkIn = () =>
  api.post("/attendence/check-in");

export const checkOut = () =>
  api.post("/attendence/check-out");

export const getMyAttendance = async (): Promise<Attendance[]> => {
  const { data } = await api.get("/attendence/me");
  return data;
};
