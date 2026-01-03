import { useEffect, useState } from "react";
import { getAllEmployees } from "../admin/employee.service";
import { getPayrollByEmployee, createPayroll } from "./payroll.service";
import PayrollDrawer from "./PayrollDrawer";

import type { Employee } from "../admin/employee.types";
import type { Payroll } from "./payroll.types";

const PayrollManagement = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<number | "">("");
  const [payrolls, setPayrolls] = useState<Payroll[]>([]);
  const [drawer, setDrawer] = useState(false);
  const [month, setMonth] = useState("");
  const [leaveCount] = useState(4); // demo value

  useEffect(() => {
    getAllEmployees().then(setEmployees);
  }, []);

  useEffect(() => {
    if (!selectedEmployee) return;
    getPayrollByEmployee(Number(selectedEmployee)).then(setPayrolls);
  }, [selectedEmployee]);

  const employee = employees.find(
    (e) => e.employee_id === selectedEmployee
  );

  const onSave = async (payload: any) => {
    await createPayroll({
      employee_id: Number(selectedEmployee),
      month,
      ...payload,
    });
    setDrawer(false);
    getPayrollByEmployee(Number(selectedEmployee)).then(setPayrolls);
  };

  return (
    <div className="min-h-full bg-[#F8F7F6] p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-800">
        Payroll Management
      </h1>

      <select
        className="input max-w-md"
        value={selectedEmployee}
        onChange={(e) => setSelectedEmployee(Number(e.target.value))}
      >
        <option value="">Select Employee</option>
        {employees.map((e) => (
          <option key={e.employee_id} value={e.employee_id}>
            {e.name} ({e.department})
          </option>
        ))}
      </select>

      <div className="flex gap-3">
        <input
          type="month"
          className="input max-w-xs"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
        />

        <button
          disabled={!selectedEmployee || !month}
          onClick={() => setDrawer(true)}
          className="px-4 py-2 bg-[#714B67] text-white rounded-md disabled:opacity-50"
        >
          Generate Payroll
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">Month</th>
              <th className="px-6 py-3 text-left">Net Salary</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p) => (
              <tr key={p.payroll_id} className="border-t">
                <td className="px-6 py-3">{p.month}</td>
                <td className="px-6 py-3 font-medium text-green-700">
                  ₹{p.net_salary}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <PayrollDrawer
        open={drawer}
        onClose={() => setDrawer(false)}
        employee={employee}
        month={month}
        leaveCount={leaveCount}
        onConfirm={onSave}
      />
    </div>
  );
};

export default PayrollManagement;
