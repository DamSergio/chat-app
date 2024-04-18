import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

interface SignupInputs {
  fullName: string;
  username: string;
  password: string;
  confirmPassword: string;
  gender: string;
}

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async (inputs: SignupInputs) => {
    const success = handleInputsError(inputs);
    if (!success) return;

    setLoading(true);
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(inputs),
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

  return { loading, signup };
};

const handleInputsError = (inputs: SignupInputs) => {
  if (
    !inputs.fullName ||
    !inputs.username ||
    !inputs.password ||
    !inputs.confirmPassword ||
    !inputs.gender
  ) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (inputs.password !== inputs.confirmPassword) {
    toast.error("Passwords do not match");
    return false;
  }

  if (inputs.password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
};

export default useSignup;
