import { useState } from "react";
import { AuthContext } from "./AuthContext";

const readStoredUser = () => {
  const token = localStorage.getItem("token");
  const storedUser = localStorage.getItem("user");

  if (!token) {
    localStorage.removeItem("user");
    return null;
  }

  if (!storedUser) {
    return { token };
  }

  try {
    return { ...JSON.parse(storedUser), token };
  } catch {
    localStorage.removeItem("user");
    return token ? { token } : null;
  }
};

const saveStoredUser = (data) => {
  const { token, ...user } = data;

  if (token) {
    localStorage.setItem("token", token);
  }

  localStorage.setItem("user", JSON.stringify(user));
  return { ...user, token: token || localStorage.getItem("token") };
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(readStoredUser);

  const login = (data) => {
    setUser(saveStoredUser(data));
  };

  const updateUser = (data) => {
    setUser((currentUser) => {
      const token = currentUser?.token || localStorage.getItem("token");
      return saveStoredUser({ ...currentUser, ...data, token });
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        updateUser,
        logout,
        isAuthenticated: Boolean(user),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
