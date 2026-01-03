export interface Leave {
    leave_id: number;
    employee_id: number;
    leave_type: string;
    start_date: string;
    end_date: string;
    reason: string;
    status: "Pending" | "Approved" | "Rejected";
    createdAt: string;
  }
  