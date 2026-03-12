export type AuthUser = {
  id: number;
  name: string;
  email: string;
};

type UserContextType = {
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
};

export type { UserContextType };
