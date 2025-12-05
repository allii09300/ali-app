"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";

export default function Navigation() {
  const pathName = usePathname();

  const { isLoggedIn } = useAuth();

  return (
    <div className="bg-gray-300 p-4">
      <Link
        href="/"
        className={`mx-4 text-2xl ${pathName === "/" ? "text-blue-500" : ""}`}
      >
        Home
      </Link>

      {isLoggedIn ? (
        <Link
          href="/dashboard"
          className={`mx-4 text-2xl ${
            pathName === "/dashboard" ? "text-blue-500" : ""
          }`}
        >
          Dashboard
        </Link>
      ) : (
        <Link
          href="/login"
          className={`mx-4 text-2xl ${
            pathName === "/login" ? "text-blue-500" : ""
          }`}
        >
          Login
        </Link>
      )}
    </div>
  );
}
