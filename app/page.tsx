"use client";

import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function LandingPage() {
    const router = useRouter();
    
    const [userToken, setUserToken] = useState<string | null>(null);

    useEffect(() => {
        setUserToken(localStorage.getItem("token"));

        if (userToken) {
            router.push("/dashboard");
        }
    }, []);

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#0b1f49] p-6">
            <div className="bg-[#142F75] text-white rounded-xl border border-white/20 p-10 max-w-4xl w-full shadow-lg">
                <div className="flex flex-col gap-6">
                    <div className="inline-flex items-center gap-3 bg-blue-700 px-4 py-2 rounded-md w-max shadow-md">
                        <BookOpen className="w-5 h-5" />
                        <h1 className="text-xl font-bold">Buku Kas Ku</h1>
                    </div>

                    <p className="text-base leading-relaxed text-justify">
                        Buku Kas Ku adalah aplikasi pencatatan keuangan
                        sederhana yang memudahkan pengguna untuk mencatat
                        pemasukan dan pengeluaran, menghitung total saldo secara
                        otomatis. Dengan fitur untuk membuat, mengedit, membaca,
                        dan menghapus catatan keuangan, aplikasi ini dirancang
                        untuk membantu pengguna lebih bijak dan teratur dalam
                        mengelola keuangan pribadi.
                    </p>

                    <button onClick={() => {
                        userToken ? router.push("/dashboard") : router.push("/login")
                    }} className="bg-white text-blue-900 font-semibold rounded-full px-6 py-3 shadow-md hover:bg-blue-100 transition w-max">
                        {userToken ? "Buka Dashboard" : "Sign Up Sekarang"}
                    </button>

                    <small className="text-white/70 mt-10">
                        © 2025 Buku Kas Ku. All rights reserved.
                    </small>
                </div>
            </div>
        </main>
    );
}
