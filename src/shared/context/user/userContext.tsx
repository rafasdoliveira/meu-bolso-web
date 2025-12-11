import React, { createContext, useEffect, useMemo, useState } from 'react';
import { UserContextType } from './userContextType';

const UserContext = createContext<UserContextType>({} as UserContextType);

const UserContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<string>(() => {
    const userLocalStorage = localStorage.getItem('@user');
    if (!userLocalStorage) return '';
    return userLocalStorage;
  });
  const [perfil, setPerfil] = useState<string[]>(() => {
    const perfilLocalStorage = localStorage.getItem('@perfil');
    if (!perfilLocalStorage) return '';
    return JSON.parse(perfilLocalStorage);
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('@user', user);
    }
  }, [user]);

  useEffect(() => {
    if (perfil) {
      localStorage.setItem('@perfil', JSON.stringify(perfil));
    }
  }, [perfil]);

  const values = useMemo(
    () => ({
      user: {
        value: user,
        set: setUser,
      },
      perfil: {
        value: perfil,
        set: setPerfil,
      },
    }),
    [user, perfil, setUser, setPerfil],
  );
  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
};

export { UserContextProvider, UserContext };
