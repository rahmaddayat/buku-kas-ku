'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { FiEye, FiEyeOff } from 'react-icons/fi';

type regApiResponse = {
  user: {
    name: string;
    email: string;
    password: string;
  };
  token: string;
};

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.name || !formData.password) {
      alert('Mohon isi semua kolom.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post<regApiResponse>(
        'https://buku-kas-ku-api.vercel.app/api/auth/register',
        formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      const { token, user } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      alert('Registrasi berhasil!');

      // Redirect sementara ke halaman landing
      router.push('/landingpage');

  

    } catch (error: any) {
      const message =
        error.response?.data?.message ||
        'Register gagal. Periksa nama, email, dan password.';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[900px] h-[500px] bg-white rounded-2xl shadow-xl flex">
        {/* Left Panel */}
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

        {/* Right Panel */}
        <div className="w-1/2 flex flex-col justify-center items-center px-10">
          <h2 className="text-2xl font-bold text-[#0b1f49] mb-6">Create Account</h2>
          <form onSubmit={handleRegister} className="w-full max-w-sm flex flex-col gap-4">
            {/* Name */}
            <input
              type="text"
              placeholder="Your name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
              required
            />

            {/* Email */}
            <input
              type="email"
              placeholder="example@mail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              className="p-3 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
              required
            />

            {/* Password */}
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password here"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full p-3 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0b1f49] text-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-2xl text-gray-500"
              >
                {showPassword ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-[#0b1f49] text-white py-2 rounded-full hover:bg-[#09203f] transition disabled:opacity-50"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'SIGN UP'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
