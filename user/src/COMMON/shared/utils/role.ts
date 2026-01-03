export const setRole = (role: string) =>
    localStorage.setItem("role", role);
  
  export const getRole = (): string | null =>
    localStorage.getItem("role");
  