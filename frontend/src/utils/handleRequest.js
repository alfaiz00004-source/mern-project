export const handleRequest = async ({
  request,
  setLoading,
  setError,
  onSuccess,
  errorMessage,
}) => {
  try {
    if (setLoading) setLoading(true);
    if (setError) setError(null);

    const { data } = await request();

    if (onSuccess) onSuccess(data);

    return data;
  } catch (error) {
    const message =
      error.response?.data?.message ||
      errorMessage ||
      "Something went wrong";

    if (setError) setError(message);

    console.error("API Error:", message);

    throw error;
  } finally {
    if (setLoading) setLoading(false);
  }
};