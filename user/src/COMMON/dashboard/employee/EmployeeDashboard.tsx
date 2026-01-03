import ProfileCard from "./ProfileCard";
import TodayAttendanceCard from "./TodayAttendanceCard";

const EmployeeDashboard = () => {
  return (
    <div className="space-y-6 bg-[#F8F7F6] min-h-full">
      <ProfileCard />
      <TodayAttendanceCard />
    </div>
  );
};

export default EmployeeDashboard;
