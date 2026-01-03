import type { Leave } from "./leave.types";
import { cancelLeave } from "./leave.service";

/* ---------- HELPERS ---------- */

const formatDate = (date: string) =>
  new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const statusStyle = (status: string) => {
  switch (status) {
    case "Approved":
      return "bg-green-100 text-green-700";
    case "Rejected":
      return "bg-red-100 text-red-700";
    default:
      return "bg-yellow-100 text-yellow-700";
  }
};

/* ---------- COMPONENT ---------- */

const LeaveListTable = ({
  leaves,
  reload,
}: {
  leaves: Leave[];
  reload: () => void;
}) => {
  const onCancel = async (id: number) => {
    await cancelLeave(id);
    reload();
  };

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Header */}
      <div className="px-6 py-4 border-b">
        <h3 className="text-base font-semibold text-gray-800">
          My Leave Requests
        </h3>
        <p className="text-sm text-gray-500">
          Track your leave status and history
        </p>
      </div>

      {/* Table */}
      <div className="p-6 overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="text-left text-gray-500 border-b">
            <tr>
              <th className="pb-3">Type</th>
              <th className="pb-3">Duration</th>
              <th className="pb-3">Status</th>
              <th className="pb-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((l) => (
              <tr
                key={l.leave_id}
                className="border-b last:border-0 hover:bg-gray-50 transition"
              >
                {/* Leave Type */}
                <td className="py-3 font-medium text-gray-800">
                  {l.leave_type}
                </td>

                {/* Dates */}
                <td className="py-3 text-gray-600">
                  {formatDate(l.start_date)}{" "}
                  <span className="mx-1 text-gray-400">→</span>{" "}
                  {formatDate(l.end_date)}
                </td>

                {/* Status */}
                <td className="py-3">
                <span
  className={`px-4 py-1.5 text-sm rounded-full font-semibold ${statusStyle(
    l.status
  )}`}
>
  {l.status}
</span>

                </td>

                {/* Action */}
                <td className="py-3 text-right">
                  {l.status === "Pending" ? (
                    <button
                    onClick={() => onCancel(l.leave_id)}
                    className="
                      px-4 py-2 text-sm font-medium rounded-md
                      border border-red-300
                      text-red-600
                      hover:bg-red-50
                      transition
                      cursor-pointer
                    "
                  >
                    Cancel
                  </button>
                  
                  ) : (
                    <span className="text-xs text-gray-400">
                      —
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Empty State */}
        {leaves.length === 0 && (
          <div className="text-center py-10 text-gray-500 text-sm">
            No leave requests found
          </div>
        )}
      </div>
    </div>
  );
};

export default LeaveListTable;
