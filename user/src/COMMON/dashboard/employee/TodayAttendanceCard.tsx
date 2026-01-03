import { useEffect, useState } from "react";
import {
  checkIn,
  checkOut,
  getMyAttendance,
} from "../../../EMPLOYEE/attendance/attendance.service";
import type { Attendance } from "../../../EMPLOYEE/attendance/attendance.types";

const TodayAttendanceCard = () => {
  const [today, setToday] = useState<Attendance | null>(null);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);

  const load = async () => {
    const data = await getMyAttendance();
    setToday(data[0] || null);
  };

  useEffect(() => {
    load();
  }, []);

  const onCheckIn = async () => {
    try {
      setLoading(true);
      await checkIn();
      setMsg("Checked in successfully");
      load();
    } catch (e: any) {
      setMsg(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const onCheckOut = async () => {
    try {
      setLoading(true);
      await checkOut();
      setMsg("Checked out successfully");
      load();
    } catch (e: any) {
      setMsg(e.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 flex flex-col justify-between">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-base font-semibold text-gray-800">
          Today Attendance
        </h3>
      </div>

      {msg && (
        <div className="mb-3 text-sm bg-blue-50 text-blue-700 p-2 rounded">
          {msg}
        </div>
      )}

      {/* Content */}
      <div className="flex flex-col gap-4">
        <div>
          <span
            className={`inline-block px-2 py-1 text-xs rounded ${
              today?.status === "Present"
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {today?.status || "Not Marked"}
          </span>

          <p className="text-sm text-gray-600 mt-2">
            Check-in:{" "}
            {today?.check_in
              ? new Date(today.check_in).toLocaleTimeString()
              : "—"}
          </p>
          <p className="text-sm text-gray-600">
            Check-out:{" "}
            {today?.check_out
              ? new Date(today.check_out).toLocaleTimeString()
              : "—"}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={onCheckIn}
            disabled={loading || !!today?.check_in}
            className="
              px-4 py-2 rounded-md
              bg-[#714B67] text-white text-sm
              disabled:opacity-50
            "
          >
            Check In
          </button>

          <button
            onClick={onCheckOut}
            disabled={loading || !today?.check_in || !!today?.check_out}
            className="
              px-4 py-2 rounded-md
              bg-gray-200 text-gray-700 text-sm
              disabled:opacity-50
            "
          >
            Check Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodayAttendanceCard;
