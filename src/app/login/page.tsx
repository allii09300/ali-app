"use client";

import { Button } from "@/components/Ui/button";
import { Input } from "@/components/Ui/input";
import { Label } from "@/components/Ui/label";
import { useAuth } from "@/hooks/useAuth";
import { validateIranPhone } from "@/lib/validators/phone";
import { UserType } from "@/types/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateIranPhone(phoneNumber)) {
      setError("Please enter a valid mobile number.");
      return;
    }

    setError("");

    setIsLoading(true);

    try {
      const result = await fetch("/api/random-user");

      if (!result.ok) {
        const errorData = await result.json();
        console.error("API error:", errorData.error);
        return;
      }

      const data: UserType = await result.json();

      login(data);

      router.push("/dashboard");
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPhoneNumber(value);

    if (value.trim() === "") {
      setError("");
      return;
    }

    if (!validateIranPhone(value)) {
      setError("Please enter a valid mobile number.");
    } else {
      setError("");
    }
  };

  return (
    <div className="flex flex-col items-center gap-5 min-h-screen">
      <h1 className="text-center pt-10 text-blue-500 text-4xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full max-w-sm p-4 my-auto"
      >
        <Label className="mb-2 text-xl" htmlFor="phoneNum">Phone number:</Label>
        <Input
          type="text"
          id="phoneNum"
          placeholder="For example 0912..."
          value={phoneNumber}
          onChange={handleChange}
          className={error ? "focus-visible:ring-red-600" : ""}
        />
        {error && (
          <span className="text-sm font-medium text-red-600">{error}</span>
        )}
        <Button type="submit" disabled={!phoneNumber}>
          {isLoading ? "Loading..." : "Login"}
        </Button>
      </form>
    </div>
  );
}
