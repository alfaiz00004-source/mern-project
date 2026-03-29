import api from "./api";

// REGISTER USER
export const registerUser = (userData) => api.post("/user/register", userData);

// LOGIN USER
export const loginUser = (userData) => api.post("/user/login", userData);

// GET USER PROFILE
export const getUserProfile = () => api.get("/user/profile");

// UPDATE USER PROFILE
export const updateUserProfile = (updates) =>
  api.put("/user/profile", updates);
