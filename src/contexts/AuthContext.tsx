import { createContext, useContext } from "react";

type AuthContextType = {
  isAuth: boolean;
  setIsAuth: (isAuth: boolean) => void;
  token: string | null;
  setToken: (token: string) => void;
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
  login: () => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  isAuth: false,
  setIsAuth: () => {},
  token: null,
  setToken: () => {},
  isLoading: true,
  setIsLoading: () => {},
  login: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return useContext(AuthContext);
};
