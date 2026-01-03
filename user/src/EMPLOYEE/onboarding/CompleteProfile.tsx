import { useEffect, useState } from "react";
import api from "../../COMMON/shared/utils/api";
import { useNavigate } from "react-router-dom";

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [userId, setUserId] = useState<number | null>(null);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    designation: "",
    department: "",
    join_date: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /* ---------------- GET USER ID FROM /me ---------------- */
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await api.get("/me");
        setUserId(data.user_id);
      } catch {
        setError("Unable to fetch user information");
      }
    };

    fetchUser();
  }, []);

  /* ---------------- HANDLE INPUT ---------------- */
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  /* ---------------- SUBMIT ---------------- */
  const submit = async () => {
    const { name, phone, address, designation, department, join_date } = form;

    if (!userId) {
      setError("User not authenticated");
      return;
    }

    if (
      !name ||
      !phone ||
      !address ||
      !designation ||
      !department ||
      !join_date
    ) {
      setError("All fields are required");
      return;
    }

    if (phone.length !== 10) {
      setError("Mobile number must be exactly 10 digits");
      return;
    }

    const today = new Date().toISOString().split("T")[0];
    if (join_date > today) {
      setError("Join date cannot be in the future");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      await api.post("/employees", {
        user_id: userId, // ✅ derived securely
        ...form,
      });

      navigate("/employee");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to save profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F7F6] flex justify-center items-center">
      <div className="w-full max-w-md bg-white rounded-lg shadow-sm border">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">
            Complete Your Profile
          </h2>
          <p className="text-sm text-gray-500">
            HR-related details will be verified later
          </p>
        </div>

        {/* Form */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-2 rounded">
              {error}
            </div>
          )}

          <Input label="Full Name" name="name" value={form.name} onChange={handleChange} />

          {/* Mobile – numeric & 10 digits */}
          <Input
            label="Mobile Number"
            name="phone"
            value={form.phone}
            onChange={(e: any) => {
              if (/^\d{0,10}$/.test(e.target.value)) {
                handleChange(e);
              }
            }}
          />

          {/* Address */}
          <div>
            <label className="text-sm text-gray-600">Address</label>
            <textarea
              name="address"
              rows={3}
              value={form.address}
              onChange={handleChange}
              className="w-full mt-1 border rounded px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#714B67]"
            />
          </div>

          {/* Department */}
          <Select
            label="Department"
            name="department"
            value={form.department}
            onChange={handleChange}
            options={["HR", "IT", "Sales", "Finance"]}
          />

          {/* Designation */}
          <Select
            label="Designation"
            name="designation"
            value={form.designation}
            onChange={handleChange}
            options={["Junior", "Senior", "Lead", "Manager"]}
          />

          {/* Join Date – past only */}
          <Input
            label="Join Date"
            name="join_date"
            type="date"
            max={new Date().toISOString().split("T")[0]} // ✅ no future dates
            value={form.join_date}
            onChange={handleChange}
          />

          {/* Submit */}
          <button
            onClick={submit}
            disabled={loading}
            className="
              w-full mt-2 py-2 rounded
              bg-[#714B67] text-white text-sm font-medium
              hover:bg-[#5f3e56]
              disabled:opacity-60
              transition
            "
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CompleteProfile;

/* ---------- REUSABLE INPUTS ---------- */

const Input = ({
  label,
  name,
  value,
  type = "text",
  onChange,
  max,
}: any) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      max={max}
      onChange={onChange}
      className="
        w-full mt-1 border rounded px-3 py-2 text-sm
        focus:outline-none focus:ring-1 focus:ring-[#714B67]
      "
    />
  </div>
);

const Select = ({
  label,
  name,
  value,
  options,
  onChange,
}: any) => (
  <div>
    <label className="text-sm text-gray-600">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="
        w-full mt-1 border rounded px-3 py-2 text-sm bg-white
        focus:outline-none focus:ring-1 focus:ring-[#714B67]
      "
    >
      <option value="">Select {label}</option>
      {options.map((opt: string) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  </div>
);
