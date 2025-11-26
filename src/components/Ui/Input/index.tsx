"use client";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function Input({ label, error, ...props }: InputProps) {
  return (
    <div className="flex flex-col w-full max-w-sm mb-4 ">
      <label className="mb-1 text-xl font-semibold text-gray-700 ">
        {label}
      </label>
      <input className={`input ${error ? "input-error" : ""}`} {...props} />
      {error && (
        <span className="mt-1 text-sm font-medium  text-red-600">{error}</span>
      )}
    </div>
  );
}
