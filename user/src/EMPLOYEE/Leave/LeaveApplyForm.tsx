import { useState } from "react";
import { applyLeave } from "./leave.service";

const LeaveApplyForm = ({ onSuccess }: { onSuccess: () => void }) => {
  const [form, setForm] = useState({
    leave_type: "",
    start_date: "",
    end_date: "",
    reason: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async () => {
    const { leave_type, start_date, end_date, reason } = form;

    if (!leave_type || !start_date || !end_date || !reason) {
      setError("All fields are required");
      return;
    }

    if (end_date < start_date) {
      setError("End date cannot be before start date");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await applyLeave(form);
      onSuccess();
      setForm({
        leave_type: "",
        start_date: "",
        end_date: "",
        reason: "",
      });
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to apply leave");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white border rounded-lg shadow-sm">
      <div className="px-6 py-4 border-b">
        <h3 className="text-base font-semibold text-gray-800">
          Apply for Leave
        </h3>
      </div>

      <div className="p-6 space-y-4">
        {error && (
          <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
            {error}
          </div>
        )}

        <select
          className="w-full border rounded px-3 py-2 text-sm"
          value={form.leave_type}
          onChange={(e) =>
            setForm({ ...form, leave_type: e.target.value })
          }
        >
          <option value="">Select Leave Type</option>
          <option value="Paid">Paid Leave</option>
          <option value="Sick">Sick Leave</option>
          <option value="Unpaid">Unpaid Leave</option>
        </select>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="date"
            className="border rounded px-3 py-2 text-sm"
            value={form.start_date}
            onChange={(e) =>
              setForm({ ...form, start_date: e.target.value })
            }
          />
          <input
            type="date"
            className="border rounded px-3 py-2 text-sm"
            value={form.end_date}
            onChange={(e) =>
              setForm({ ...form, end_date: e.target.value })
            }
          />
        </div>

        <textarea
          rows={3}
          className="w-full border rounded px-3 py-2 text-sm"
          placeholder="Reason for leave"
          value={form.reason}
          onChange={(e) =>
            setForm({ ...form, reason: e.target.value })
          }
        />

        <button
          onClick={submit}
          disabled={loading}
          className="bg-[#714B67] text-white px-4 py-2 rounded text-sm disabled:opacity-60"
        >
          {loading ? "Submitting..." : "Apply Leave"}
        </button>
      </div>
    </div>
  );
};

export default LeaveApplyForm;
