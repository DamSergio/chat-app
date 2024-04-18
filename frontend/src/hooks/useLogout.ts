import * as React from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";
import useConversation from "../store/useConversation";

const useLogout = () => {
  const [loading, setLoading] = React.useState(false);
  const { setAuthUser } = useAuthContext();
  const { setSelectedConversation } = useConversation() as {
    setSelectedConversation: (conversation: object | null) => void;
  };

  const logout = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.removeItem("chat-user");
      setAuthUser(null);
    } catch (error: Error | unknown) {
      toast.error((error as Error).message);
    }

    setLoading(false);
    setSelectedConversation(null);
  };

  return { loading, logout };
};

export default useLogout;
