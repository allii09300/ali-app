"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookie from "js-cookie";

export default function Dashboard() {
  const [user, setUser] = useState<any>();
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    Cookie.remove("user");
    router.push("/")
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-primary">
          welcome , {user.name}
        </h1>
        <button
          className="px-6 py-2 rounded font-semibold bg-danger text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="flex flex-col items-center gap-4 mt-6">
        <img
          src={user.avatar}
          alt="avatar"
          className="w-32 h-32 rounded-full border"
        />

        <div>
          <p className="font-madium">{user.email}</p>
        </div>
      </div>
    </div>
  );
}
