import {
    DEPARTMENT_SALARY_RULES,
    calculateLeaveDeduction,
  } from "./payroll.rules";
  
  const PayrollDrawer = ({
    open,
    onClose,
    employee,
    month,
    leaveCount,
    onConfirm,
  }: any) => {
    if (!open || !employee) return null;
  
    const rule =
      DEPARTMENT_SALARY_RULES[employee.department] ||
      { basic: 0, allowance: 0 };
  
    const basic = rule.basic;
    const allowance = rule.allowance;
    const deduction = calculateLeaveDeduction(basic, leaveCount);
    const net = basic + allowance - deduction;
  
    return (
      <div className="fixed inset-0 z-50 flex">
        <div
          className="flex-1 bg-black/40"
          onClick={onClose}
        />
  
        <div className="w-[420px] bg-white h-full shadow-xl p-6">
          <h2 className="text-lg font-semibold">
            Generate Payroll
          </h2>
          <p className="text-sm text-gray-500 mb-6">
            {employee.name} • {employee.department}
          </p>
  
          <div className="space-y-3 text-sm">
            <Row label="Month" value={month} />
            <Row label="Basic Salary" value={`₹${basic}`} />
            <Row label="Allowances" value={`₹${allowance}`} />
            <Row
              label="Leave Deduction"
              value={`- ₹${deduction}`}
              danger
            />
  
            <div className="border-t pt-4 flex justify-between font-semibold">
              <span>Net Salary</span>
              <span className="text-green-700">
                ₹{net}
              </span>
            </div>
          </div>
  
          <div className="mt-8 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 border rounded-md py-2"
            >
              Cancel
            </button>
  
            <button
              onClick={() =>
                onConfirm({
                  basic_salary: basic,
                  allowances: allowance,
                  deductions: deduction,
                })
              }
              className="flex-1 bg-[#714B67] text-white rounded-md py-2"
            >
              Confirm & Save
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  const Row = ({ label, value, danger }: any) => (
    <div className="flex justify-between">
      <span className="text-gray-500">{label}</span>
      <span className={danger ? "text-red-600" : ""}>
        {value}
      </span>
    </div>
  );
  
  export default PayrollDrawer;
  