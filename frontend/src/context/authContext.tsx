import { createContext, ReactNode, useContext, useState } from "react";
import User from "../models/user.model";

export const AuthContext = createContext({
  authUser: {} as User,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setAuthUser: (authUser: User | null) => {},
});
// eslint-disable-next-line react-refresh/only-export-components
export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chat-user") as string) || null
  );
  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  );
};
