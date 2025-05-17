"use client";

import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function MainPage() {
    const [userData, setUserData] = useState({ _id: "", name: "", email: "" });
    const [userToken, setUserToken] = useState<string | null>("");

    useEffect(() => {
        const userDataString = localStorage.getItem("user");
        setUserData(userDataString ? JSON.parse(userDataString) : null);
    }, []);

    const router = useRouter();

    useEffect(() => {
        const currentUserToken = localStorage.getItem("token");
        setUserToken(currentUserToken);

        if (!currentUserToken) {
            router.push("/login");
        }
    }, []);

    const handleLogout = async () => {
        if (userToken) {
            try {
                const response = await axios.post(
                    "https://buku-kas-ku-api.vercel.app/api/auth/logout",
                    null,
                    {
                        headers: {
                            Authorization: `Bearer ${userToken}`,
                        },
                    }
                );

                localStorage.removeItem("token");
                localStorage.removeItem("user");

                router.push("/");
            } catch (error: any) {
                console.error(error);
            }
        }
    };

    return (
        <div className="flex">
            <Navbar />
            <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
                <Header title="Profile" />
                <main className="px-4 py-8 flex-grow flex justify-center items-center">
                    <div className="bg-gray-200 border-2 border-[#103b4d] p-12 w-full max-w-4xl rounded-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
                        <div className="p-6 flex justify-center items-center border-b-2 lg:border-b-0 lg:border-r-2 border-[#103b4d]">
                            <img
                                src="/img/profile_default.png"
                                alt="Profile Image"
                                className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover"
                            />
                        </div>
                        <div className="flex flex-col justify-center items-start h-full pl-12 gap-2">
                            <ul className="text-black font-bold text-base md:text-2xl">
                                <li className="mb-2 mt-2">
                                    User Name : {userData?.name}
                                </li>
                                <li className="mb-2 mt-2">
                                    Email : {userData?.email}
                                </li>
                            </ul>
                            <button
                                onClick={handleLogout}
                                className="cursor-pointer mt-2 border border-red-700 bg-red-600 rounded px-4 py-2 font-bold shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-white"
                            >
                                Log Out
                            </button>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
