import { useState, useEffect, useCallback } from "react";
import { getUserProfile, updateUserProfile } from "../services/userService";
import { handleRequest } from "../utils/handleRequest"; 

export const useUser = () => {
  // ---------- State ----------
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // ---------- Generic executor ----------
  const executeRequest = useCallback(async (apiCall, onSuccess, errorMessage) => {
    try {
      // ❌ ab ye handleRequest karega → remove nahi kiya (flow same rakha)
      setLoading(true);
      setError(null);

      // ✅ NEW handleRequest usage
      const data = await handleRequest({
        request: apiCall,
        setLoading,
        setError,
        errorMessage,
        onSuccess,
      });

      return data;
    } catch (err) {
      // optional fallback (mostly handle ho chuka hoga)
      setError(err.response?.data?.message || errorMessage || "Request failed");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // ---------- Fetch profile ----------
  const fetchUser = useCallback(() =>
    executeRequest(
      () => getUserProfile(),
      (data) => setUser(data),
      "Failed to fetch user profile"
    ), [executeRequest]);

  // ---------- Update profile ----------
  const updateUser = useCallback((payload) =>
    executeRequest(
      () => updateUserProfile(payload),
      (data) => {
        setUser(data);
        if (data) {
          const { token, ...userData } = data;
          localStorage.setItem("user", JSON.stringify(userData));
          if (token) {
            localStorage.setItem("token", token);
          }
        }
      },
      "Failed to update profile"
    ), [executeRequest]);

  // ---------- Auto-fetch on mount ----------
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  // ---------- Return ----------
  return {
    user,
    loading,
    error,
    fetchUser,
    updateUser,
  };
};