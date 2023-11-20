import localForage from "localforage";
import { AuthContext } from "../contexts/AuthContext";
import { useEffect, ReactNode, useState } from "react";

const apiBaseUrl = import.meta.env.VITE_API_URL;

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuth, setIsAuth] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localForage.getItem("token").then(async (res) => {
      if (!res) return setIsLoading(false);
      if (res !== token) setToken(res as string);

      try {
        const response = await fetch(`${apiBaseUrl}/verifyToken`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${res}`,
          },
        });

        if (response.status === 400 || response.status === 401) {
          localForage.removeItem("token");
          setIsAuth(false);
          return;
        }

        if (response.status === 200) {
          setIsAuth(true);
        }
      } catch (error) {
        console.error("Error verifying token:", error);
        setIsAuth(false);
      } finally {
        setIsLoading(false);
      }
    });
  }, [token, isAuth]);

  const login = () => {
    setIsAuth(true);
    setIsLoading(false);
  };

  const logout = () => {
    setIsAuth(false);
    localForage.removeItem("token");
  };

  const value = {
    isAuth,
    setIsAuth,
    token,
    setToken,
    isLoading,
    setIsLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
