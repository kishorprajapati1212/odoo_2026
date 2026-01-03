export const ROLES = {
    ADMIN: "ADMIN",
    EMPLOYEE: "EMPLOYEE",
  } as const;
  
  export type Role = keyof typeof ROLES;
  