export const DEPARTMENT_SALARY_RULES: Record<
  string,
  { basic: number; allowance: number }
> = {
  Engineering: { basic: 40000, allowance: 8000 },
  HR: { basic: 30000, allowance: 5000 },
  Finance: { basic: 35000, allowance: 6000 },
  Marketing: { basic: 28000, allowance: 4000 },
};

export const calculateLeaveDeduction = (
  basic: number,
  totalLeaves: number
) => {
  const allowedLeaves = 20;
  if (totalLeaves <= allowedLeaves) return 0;

  const perDay = basic / 30;
  return Math.round(perDay * (totalLeaves - allowedLeaves));
};
