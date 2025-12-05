"use client";

import { useState, useEffect } from "react";
import Cookie from "js-cookie";
import { AuthContext } from "./AuthContext";
import type { UserType } from "@/types/user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserType | null>(null);

  useEffect(() => {
    const cookieUser = Cookie.get("user");
    if (cookieUser) setUser(JSON.parse(cookieUser));
  }, []);

  const login = (newUser: UserType) => {
    Cookie.set("user", JSON.stringify(newUser), { expires: 1, path: "/" });
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    Cookie.remove("user");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoggedIn: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
