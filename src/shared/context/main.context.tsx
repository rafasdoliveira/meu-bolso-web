import { UserContextProvider } from './user/userContext';

const ContextProviders = ({ children }: { children: React.ReactNode }) => {
  return <UserContextProvider>{children}</UserContextProvider>;
};

export { ContextProviders };
