import { useEffect, useState } from "react";
import LeaveApplyForm from "../../EMPLOYEE/Leave/LeaveApplyForm";
import LeaveListTable from "../../EMPLOYEE/Leave/LeaveListTable";
import { getMyLeaves } from "../../EMPLOYEE/Leave/leave.service";
import type { Leave } from "../../EMPLOYEE/Leave/leave.types";

const EmployeeLeavePage = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);

  const load = async () => {
    const data = await getMyLeaves();
    setLeaves(data);
  };

  useEffect(() => {
    load();
  }, []);

  return (
    <div className="min-h-full bg-[#F8F7F6] p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Leave Management
      </h1>

      <LeaveApplyForm onSuccess={load} />
      <LeaveListTable leaves={leaves} reload={load} />
    </div>
  );
};

export default EmployeeLeavePage;
