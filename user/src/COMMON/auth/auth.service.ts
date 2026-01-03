import api from "../shared/utils/api";
import type { LoginPayload, LoginResponse } from "./auth.types";

export const loginUser = async (
  payload: LoginPayload
): Promise<LoginResponse> => {
  const { data } = await api.post<LoginResponse>(
    "/login",
    payload
  );
  return data;
};
