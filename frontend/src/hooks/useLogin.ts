import * as React from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username: string, password: string) => {
    const success = handleInputsError(username, password);
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data.data.user));
      setAuthUser(data.data.user);
    } catch (error: Error | unknown) {
      toast.error((error as Error).message);
    }
    setLoading(false);
  };

  return { loading, login };
};

const handleInputsError = (username: string, password: string) => {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  return true;
};

export default useLogin;
