export const handleErrors = (err, setError) => {
  if (err.response?.data?.errors) {
    err.response.data.errors.forEach((e) => {
      setError(e.param, {
        type: "manual",
        message: e.msg,
      });
    });
  } else {
    setError("form", {
      type: "manual",
      message: err.response?.data?.message || "Something went wrong",
    });
  }
};