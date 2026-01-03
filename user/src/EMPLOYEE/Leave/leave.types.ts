export type LeaveStatus = "Pending" | "Approved" | "Rejected";

export interface Leave {
  leave_id: number;
  leave_type: string;
  start_date: string;
  end_date: string;
  reason: string;
  status: LeaveStatus;
  createdAt: string;
}
