// ❗ ONLY TYPES HERE – NOTHING ELSE

export interface LoginPayload {
    email: string;
    password: string;
  }
  
  export interface LoginResponse {
    user_id: number;
    role: "ADMIN" | "EMPLOYEE";
    token: string;
  }
  