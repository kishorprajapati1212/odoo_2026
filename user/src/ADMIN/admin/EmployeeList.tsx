import { useEffect, useState } from "react";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
} from "./employee.service";
import type { Employee } from "./employee.types";

/* ---------- CONSTANTS ---------- */

const DEPARTMENTS = [
  "Engineering",
  "HR",
  "Finance",
  "Operations",
];

const DESIGNATIONS = [
  "Junior Developer",
  "Senior Developer",
  "Team Lead",
  "Manager",
];

/* ---------- COMPONENT ---------- */

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selected, setSelected] = useState<Employee | null>(null);
  const [mode, setMode] = useState<"view" | "edit" | null>(null);
  const [loading, setLoading] = useState(false);

  const load = async () => {
    setLoading(true);
    const data = await getAllEmployees();
    setEmployees(data);
    setLoading(false);
  };

  useEffect(() => {
    load();
  }, []);

  const openView = async (id: number) => {
    const emp = await getEmployeeById(id);
    setSelected(emp);
    setMode("view");
  };

  const openEdit = async (id: number) => {
    const emp = await getEmployeeById(id);
    setSelected(emp);
    setMode("edit");
  };

  const closeModal = () => {
    setSelected(null);
    setMode(null);
  };

  const onSave = async () => {
    if (!selected) return;

    await updateEmployee(selected.employee_id, {
      name: selected.name,
      phone: selected.phone,
      address: selected.address,
      department: selected.department,
      designation: selected.designation,
      join_date: selected.join_date, // YYYY-MM-DD
    });

    closeModal();
    load();
  };

  const onDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    await deleteEmployee(id);
    load();
  };

  return (
    <div className="min-h-full bg-[#F8F7F6] p-6 space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-gray-800">
          Employees
        </h1>
        <p className="text-sm text-gray-500">
          Manage employee profiles
        </p>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-600">
            <tr>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-left">Department</th>
              <th className="px-6 py-3 text-left">Designation</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((e) => (
              <tr
                key={e.employee_id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 font-medium text-gray-800">
                  {e.name}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {e.department}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {e.designation}
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <Btn onClick={() => openView(e.employee_id)}>
                    View
                  </Btn>
                  <Btn primary onClick={() => openEdit(e.employee_id)}>
                    Edit
                  </Btn>
                  <Btn danger onClick={() => onDelete(e.employee_id)}>
                    Delete
                  </Btn>
                </td>
              </tr>
            ))}

            {!loading && employees.length === 0 && (
              <tr>
                <td colSpan={4} className="px-6 py-6 text-gray-500">
                  No employees found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {selected && mode && (
        <Modal onClose={closeModal}>
          <h3 className="text-lg font-semibold mb-4 capitalize">
            {mode} Employee
          </h3>

          <Field label="Name">
            <input
              value={selected.name}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, name: e.target.value })
              }
              className="input"
            />
          </Field>

          <Field label="Phone">
            <input
              value={selected.phone}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, phone: e.target.value })
              }
              className="input"
            />
          </Field>

          <Field label="Address">
            <input
              value={selected.address}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, address: e.target.value })
              }
              className="input"
            />
          </Field>

          <Field label="Department">
            <select
              value={selected.department}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, department: e.target.value })
              }
              className="input"
            >
              <option value="">Select Department</option>
              {DEPARTMENTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Designation">
            <select
              value={selected.designation}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, designation: e.target.value })
              }
              className="input"
            >
              <option value="">Select Designation</option>
              {DESIGNATIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </Field>

          <Field label="Join Date">
            <input
              type="date"
              value={selected.join_date?.slice(0, 10)}
              disabled={mode === "view"}
              onChange={(e) =>
                setSelected({ ...selected, join_date: e.target.value })
              }
              className="input"
            />
          </Field>

          <div className="flex justify-end gap-3 mt-6">
            <Btn onClick={closeModal}>Close</Btn>
            {mode === "edit" && (
              <Btn primary onClick={onSave}>Save</Btn>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EmployeeList;

/* ---------- SMALL UI HELPERS ---------- */

const Field = ({
  label,
  value,
  editable,
  children,
}: {
  label: string;
  value?: string;
  editable: boolean;
  children?: React.ReactNode;
}) => (
  <div className="grid grid-cols-3 items-center gap-4">
    <span className="text-sm text-gray-500">
      {label}
    </span>

    <div className="col-span-2">
      {editable ? (
        children
      ) : (
        <div className=" text-gray-800">
          {children || "—"}
        </div>
      )}
    </div>
  </div>
);


const Btn = ({
  children,
  primary,
  danger,
  onClick,
}: {
  children: React.ReactNode;
  primary?: boolean;
  danger?: boolean;
  onClick?: () => void;
}) => {
  let cls =
    "px-4 py-2 text-sm rounded-md border transition";

  if (primary)
    cls += " border-blue-300 text-blue-600 hover:bg-blue-50";
  else if (danger)
    cls += " border-red-300 text-red-600 hover:bg-red-50";
  else cls += " border-gray-300 text-gray-700 hover:bg-gray-100";

  return (
    <button onClick={onClick} className={cls}>
      {children}
    </button>
  );
};

const Modal = ({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) => (
  <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
    <div className="bg-white w-full max-w-2xl rounded-xl shadow-lg">
      
      {/* Header */}
      <div className="flex justify-between items-center px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-800">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 text-xl"
        >
          ×
        </button>
      </div>

      {/* Body */}
      <div className="px-6 py-5">
        {children}
      </div>
    </div>
  </div>
);

/* ---------- INPUT STYLE ---------- */
// Tailwind utility class used above:
// .input = "w-full mt-1 rounded-md border px-3 py-2 text-sm
//           focus:outline-none focus:ring-1 focus:ring-[#714B67]
//           disabled:bg-gray-100"
