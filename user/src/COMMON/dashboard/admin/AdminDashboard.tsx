import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const attendanceData = [
  { day: "Mon", present: 42, absent: 3 },
  { day: "Tue", present: 40, absent: 5 },
  { day: "Wed", present: 45, absent: 2 },
  { day: "Thu", present: 43, absent: 4 },
  { day: "Fri", present: 41, absent: 6 },
];

const salaryReportData = [
  { month: "Jan", payroll: 520000 },
  { month: "Feb", payroll: 510000 },
  { month: "Mar", payroll: 540000 },
  { month: "Apr", payroll: 560000 },
  { month: "May", payroll: 590000 },
];

const leaveData = [
  { name: "Approved", value: 32 },
  { name: "Pending", value: 14 },
  { name: "Rejected", value: 6 },
];

const COLORS = ["#22c55e", "#facc15", "#ef4444"];

const AdminDashboard = () => {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">
        Admin Analytics & Reports
      </h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Total Employees</p>
          <p className="text-2xl font-bold">48</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Present Today</p>
          <p className="text-2xl font-bold text-green-600">42</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">On Leave</p>
          <p className="text-2xl font-bold text-yellow-500">5</p>
        </div>

        <div className="bg-white shadow rounded-xl p-4">
          <p className="text-sm text-gray-500">Monthly Payroll</p>
          <p className="text-2xl font-bold text-blue-600">₹5.9L</p>
        </div>
      </div>

      {/* CHARTS ROW 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Bar Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-4">Weekly Attendance Report</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={attendanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="present" fill="#22c55e" />
              <Bar dataKey="absent" fill="#ef4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Payroll Line Chart */}
        <div className="bg-white shadow rounded-xl p-4">
          <h2 className="font-semibold mb-4">Monthly Payroll Trend</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salaryReportData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="payroll"
                stroke="#3b82f6"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* CHARTS ROW 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Leave Status Pie Chart */}
        <div className="bg-white shadow rounded-xl p-4 col-span-1">
          <h2 className="font-semibold mb-4">Leave Requests Status</h2>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={leaveData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {leaveData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Reports Section */}
        <div className="bg-white shadow rounded-xl p-4 col-span-2">
          <h2 className="font-semibold mb-4">Reports & Downloads</h2>

          <ul className="space-y-3">
            <li className="flex justify-between items-center border-b pb-2">
              <span>📄 Attendance Report (May 2026)</span>
              <button className="text-blue-600 text-sm">Download</button>
            </li>

            <li className="flex justify-between items-center border-b pb-2">
              <span>📄 Salary Slips (April 2026)</span>
              <button className="text-blue-600 text-sm">Download</button>
            </li>

            <li className="flex justify-between items-center">
              <span>📄 Leave Summary Report</span>
              <button className="text-blue-600 text-sm">Download</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
