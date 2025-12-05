"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { UserType } from "@/types/user";
import { Button } from "@/components/Ui/button";

export default function Dashboard() {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const { logout } = useAuth();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="min-h-screen p-5">
      <div className="flex justify-between">
        <h1 className="text-3xl font-semibold text-blue-500">
          welcome , {user.name}
        </h1>
        <Button variant="destructive" onClick={handleLogout}>
          Logout
        </Button>
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
