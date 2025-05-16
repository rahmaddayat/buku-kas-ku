// src/app/register/page.tsx
"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Registration logic (placeholder)
    if (name && email && password) {
      alert("Registration successful!");
      router.push("/login");
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[500px] bg-white rounded-2xl shadow-xl flex">
        {/* Left Side */}
        <div className="w-1/2 bg-[#0b1f49] text-white rounded-l-2xl flex flex-col items-center justify-center p-10">
          <h2 className="text-3xl font-bold mb-2">Welcome Back!</h2>
          <p className="text-sm text-center mb-6">
            To keep connected with us, please login with your personal info.
          </p>
          <Link href="/login">
            <button className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0b1f49] transition">
              SIGN IN
            </button>
          </Link>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10">
          <h2 className="text-2xl font-bold text-[#0b1f49] mb-6">Create Account</h2>
          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
              required
            />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
              required
            />
            <button
              type="submit"
              className="bg-[#0b1f49] text-white py-2 rounded-full hover:bg-[#09203f] transition"
            >
              SIGN UP
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}