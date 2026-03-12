import React, { createContext, useMemo, useState } from 'react';
import { AuthUser, UserContextType } from './userContextType';

const USER_KEY = '@auth_user';

function loadUser(): AuthUser | null {
  try {
    const raw = localStorage.getItem(USER_KEY);
    return raw ? (JSON.parse(raw) as AuthUser) : null;
  } catch {
    return null;
  }
}

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUserState] = useState<AuthUser | null>(loadUser);

  const setUser = (next: AuthUser | null) => {
    setUserState(next);
    if (next) {
      localStorage.setItem(USER_KEY, JSON.stringify(next));
    } else {
      localStorage.removeItem(USER_KEY);
    }
  };

  const values = useMemo(() => ({ user, setUser }), [user]);

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
