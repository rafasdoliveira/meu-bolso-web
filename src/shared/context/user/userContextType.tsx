type UserContextType = {
  user: {
    value: string;
    set: React.Dispatch<string>;
  };
  perfil: {
    value: string[];
    set: React.Dispatch<string[]>;
  };
};

export type { UserContextType };
