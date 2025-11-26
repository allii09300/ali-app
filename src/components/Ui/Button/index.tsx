"use client";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  children,
  isLoading = false,
  variant = "primary",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`btn ${variant == "primary" ? "btn-primary":"btn-secondary"}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
}
