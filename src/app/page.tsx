"use client";

import Button from "@/components/Ui/Button";
import Input from "@/components/Ui/Input";
import Cookie from "js-cookie";
import { validateIranPhone } from "@/lib/validators/phone";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      const data = await result.json();

      if (!result.ok) {
        console.error("API error:", data.error);
        return;
      }

      localStorage.setItem("user", JSON.stringify(data));

      Cookie.set("user", JSON.stringify(data), { expires: 1, path: "/" });

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
      <h1 className="text-center pt-10 text-primary text-4xl">Login</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col justify-center w-full max-w-sm p-4 my-auto"
      >
        <Input
          label="phone number:"
          type="text"
          placeholder="For example 0912..."
          value={phoneNumber}
          onChange={handleChange}
          error={error}
        />
        <Button isLoading={isLoading} type="submit" disabled={!phoneNumber}>
          Login
        </Button>
      </form>
    </div>
  );
}
