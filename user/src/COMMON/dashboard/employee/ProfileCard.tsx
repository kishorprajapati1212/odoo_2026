import { useEffect, useState } from "react";
import { getMyProfile } from "../../../EMPLOYEE/user/user.service";
import type { UserProfile } from "../../../EMPLOYEE/user/user.types";

const ProfileCard = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    getMyProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      {/* Header */}
      <div className="mb-5">
        <h3 className="text-base font-semibold text-gray-800">
          Employee Profile
        </h3>
        <p className="text-sm text-gray-500">
          Personal & organizational details
        </p>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
        <Info label="Name" value={profile.name} />
        <Info label="Email" value={profile.email} />
        <Info label="Phone" value={profile.phone || "—"} />

        <HRInfo label="Department" value={profile.department} />
        <HRInfo label="Designation" value={profile.designation} />
        <HRInfo
          label="Join Date"
          value={
            profile.join_date
              ? new Date(profile.join_date).toLocaleDateString()
              : null
          }
        />
      </div>
    </div>
  );
};

export default ProfileCard;

/* ---------- Small UI helpers ---------- */

const Info = ({ label, value }: { label: string; value?: string }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    <p className="font-medium text-gray-800">{value}</p>
  </div>
);

const HRInfo = ({ label, value }: { label: string; value?: string | null }) => (
  <div>
    <p className="text-gray-500">{label}</p>
    {value ? (
      <p className="font-medium text-gray-800">{value}</p>
    ) : (
      <span className="inline-block mt-1 px-2 py-0.5 text-xs rounded bg-gray-100 text-gray-500">
        Assigned by HR
      </span>
    )}
  </div>
);
