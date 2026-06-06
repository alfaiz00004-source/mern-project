import { useContext, useEffect, useState } from "react";
import Loader from "../components/common/Loader";
import { AuthContext } from "../context/AuthContext";
import { getUserProfile, updateUserProfile } from "../services/userService";

function Profile() {
  const { user: savedUser, updateUser } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: savedUser?.name || "",
    email: savedUser?.email || "",
    phone: savedUser?.phone || "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let ignore = false;

    const loadProfile = async () => {
      try {
        setLoading(true);
        const data = await getUserProfile();

        if (ignore) return;

        setForm({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
        updateUser(data);
      } catch (error) {
        if (!ignore) {
          setMessage(error.response?.data?.message || "Failed to load profile");
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    loadProfile();

    return () => {
      ignore = true;
    };
  }, []);

  const updateField = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validate = () => {
    const nextErrors = {};

    if (!form.name.trim()) {
      nextErrors.name = "Name is required";
    }

    if (form.phone && !/^\d+$/.test(form.phone)) {
      nextErrors.phone = "Phone must contain digits only";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");

    if (!validate()) return;

    try {
      setLoading(true);
      const data = await updateUserProfile({
        name: form.name,
        phone: form.phone,
      });

      updateUser(data);
      setMessage("Profile updated successfully");
    } catch (error) {
      setMessage(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  if (loading && !form.email) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-lg border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={updateField}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={form.email}
              placeholder="Your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={updateField}
              placeholder="Your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
          </div>

          {message && <p className="text-center text-gray-700">{message}</p>}
          {loading && form.email && <Loader variant="inline" />}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Profile;
