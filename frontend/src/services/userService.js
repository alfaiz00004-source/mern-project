import api from "./api";

export const registerUser = async (userData) => {
  const { data } = await api.post("/user/register", userData);
  return data;
};

export const loginUser = async (userData) => {
  const { data } = await api.post("/user/login", userData);
  return data;
};

export const getUserProfile = async () => {
  const { data } = await api.get("/user/profile");
  return data;
};

export const updateUserProfile = async (updates) => {
  const { data } = await api.put("/user/profile", updates);
  return data;
};
