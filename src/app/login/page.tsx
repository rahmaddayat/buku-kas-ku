"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      alert("Login successful!");
      router.push("/dashboard"); // Ganti sesuai kebutuhan
    } else {
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[500px] bg-white rounded-2xl shadow-xl flex overflow-hidden">
        
        {/* Panel Sign In - SEKARANG di KANAN */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10 rounded-r-2xl bg-white">
          <h2 className="text-2xl font-bold text-[#0b1f49] mb-6">Sign In</h2>
          <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              SIGN IN
            </button>
          </form>
        </div>

        {/* Panel Sign Up - SEKARANG di KIRI */}
        <div className="w-1/2 bg-[#0b1f49] text-white flex flex-col items-center justify-center p-10 rounded-l-2xl">
          <h2 className="text-3xl font-bold mb-4 text-center">Hello, Friend!</h2>
          <p className="text-sm text-center mb-6">
            Enter your personal details and start your journey with us
          </p>
          <Link
            href="/register"
            className="border border-white px-6 py-2 rounded-full hover:bg-white hover:text-[#0b1f49] transition text-center"
          >
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
}
