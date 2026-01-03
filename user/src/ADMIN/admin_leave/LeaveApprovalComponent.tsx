import { useEffect, useState } from "react";
import {
  getAllLeaves,
  approveLeave,
  rejectLeave,
} from "./leave.service";
import type { Leave } from "./leave.types";

/* ---------- HELPERS ---------- */

const statusBadge = (status: string) => {
  if (status === "Approved")
    return "bg-green-100 text-green-700";
  if (status === "Rejected")
    return "bg-red-100 text-red-700";
  return "bg-yellow-100 text-yellow-700";
};

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString();

/* ---------- COMPONENT ---------- */

const LeaveApprovalComponent = () => {
  const [leaves, setLeaves] = useState<Leave[]>([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    setLoading(true);
    const data = await getAllLeaves();
    setLeaves(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const onApprove = async (id: number) => {
    await approveLeave(id);
    load();
  };

  const onReject = async (id: number) => {
    await rejectLeave(id);
    load();
  };

  return (
    <div className="min-h-full bg-[#F8F7F6] p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Leave Approvals
        </h1>
        <p className="text-sm text-gray-500">
          Review, approve, or reject employee leave requests
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Employee</th>
              <th className="px-6 py-3 text-left">Leave Type</th>
              <th className="px-6 py-3 text-left">Date Range</th>
              <th className="px-6 py-3 text-left">Reason</th>
              <th className="px-6 py-3 text-left">Status</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr
                key={l.leave_id}
                className="border-t hover:bg-gray-50 transition"
              >
                {/* Employee */}
                <td className="px-6 py-4 font-medium text-gray-800">
                  #{l.employee_id}
                </td>

                {/* Leave Type */}
                <td className="px-6 py-4 text-gray-600">
                  {l.leave_type}
                </td>

                {/* Date Range */}
                <td className="px-6 py-4 text-gray-600">
                  {formatDate(l.start_date)} →{" "}
                  {formatDate(l.end_date)}
                </td>

                {/* Reason / Description */}
                <td className="px-6 py-4 text-gray-600 max-w-xs truncate">
                  {l.reason}
                </td>

                {/* Status */}
                <td className="px-6 py-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${statusBadge(
                      l.status
                    )}`}
                  >
                    {l.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="px-6 py-4 text-right space-x-2">
                  {l.status === "Pending" ? (
                    <>
                      <button
                        onClick={() => onApprove(l.leave_id)}
                        className="px-4 py-2 rounded-md text-sm border border-green-300 text-green-700 hover:bg-green-50"
                      >
                        Approve
                      </button>

                      <button
                        onClick={() => onReject(l.leave_id)}
                        className="px-4 py-2 rounded-md text-sm border border-red-300 text-red-600 hover:bg-red-50"
                      >
                        Reject
                      </button>
                    </>
                  ) : (
                    <span className="text-sm text-gray-400">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}

            {!loading && leaves.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No leave requests found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeaveApprovalComponent;
