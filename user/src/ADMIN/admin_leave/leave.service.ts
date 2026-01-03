import api from "../../COMMON/shared/utils/api";

export const getAllLeaves = async () => {
  const { data } = await api.get("/leave");
  return data;
};

export const approveLeave = async (id: number) => {
  await api.get(`/leave/${id}/approve`);
};

export const rejectLeave = async (id: number) => {
  await api.get(`/leave/${id}/reject`);
};
