import { useState, useContext, useCallback } from "react";
import { AuthContext } from "../context/AuthContext";
import { loginUser, registerUser } from "../services/userService";
import { handleRequest } from "../utils/handleRequest";

export const useAuth = () => {
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * 🔥 memoized auth handler
   */
  const handleAuth = useCallback((apiCall, data, errorMessage) => {
    return handleRequest({
      request: () => apiCall(data),
      setLoading,
      setError,
      errorMessage,
      onSuccess: (res) => {
        login(res);
      },
    });
  }, [login]); //  dependency (important)

  // LOGIN
  const loginHandler = useCallback(
    (data) => handleAuth(loginUser, data, "Login failed"),
    [handleAuth]
  );

  // REGISTER
  const registerHandler = useCallback(
    (data) => handleAuth(registerUser, data, "Registration failed"),
    [handleAuth]
  );

  return {
    loginHandler,
    registerHandler,
    loading,
    error,
  };
};