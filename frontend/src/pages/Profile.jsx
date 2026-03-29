import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useUser } from "../hooks/useUser";
import Loader from "../components/common/Loader";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().matches(/^\d*$/, "Phone must be digits only").nullable(),
});

function Profile() {
  const { user, updateUser, loading, error } = useUser();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (user) {
      setValue("name", user.name || "");
      setValue("phone", user.phone || "");
    }
  }, [user, setValue]);

  const onSubmit = async (data) => {
    try {
      await updateUser(data);
      // optional: show toast / success message
    } catch (err) {
      setError("form", {
        type: "manual",
        message: err.response?.data?.message || "Update failed",
      });
    }
  };

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
        <Loader />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 md:px-8">
      <div className="max-w-lg mx-auto bg-white shadow-md rounded-xl border border-gray-200 p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Name</label>
            <input
              type="text"
              {...register("name")}
              placeholder="Your name"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Email</label>
            <input
              type="email"
              value={user?.email || ""}
              placeholder="Your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none bg-gray-100"
              disabled
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Phone</label>
            <input
              type="tel"
              {...register("phone")}
              placeholder="Your phone number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>

        {errors.form && <p className="text-red-500 text-center">{errors.form.message}</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {loading && user && <Loader variant="inline" />}

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
