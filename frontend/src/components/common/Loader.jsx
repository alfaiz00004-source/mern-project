// src/components/ui/Loader.jsx
export default function Loader({ variant = "page", className = "" }) {
  const isInline = variant === "inline";
  const sizeClasses = isInline ? "w-6 h-6 border-2" : "w-12 h-12 border-4";
  const paddingClasses = isInline ? "py-2" : "py-10";

  return (
    <div className={`flex justify-center items-center ${paddingClasses} ${className}`.trim()}>
      <div
        className={`${sizeClasses} border-indigo-600 border-t-transparent rounded-full animate-spin`}
      ></div>
    </div>
  );
}
