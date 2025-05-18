"use client";

import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";
import Card from "@/components/card/cardTransactions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

type transactionType = {
    _id: string;
    amount: number;
    type: string;
    category: string;
    date: string;
    description: string;
};

type FilterOption = "all" | "income" | "expense";

export default function TransactionsPage() {
    const router = useRouter();

    const [userToken, setUserToken] = useState<string | null>(null);
    const [transactions, setTransactions] = useState<transactionType[]>([]);

    useEffect(() => {
        const currentUserToken = localStorage.getItem("token");
        if (!currentUserToken) {
            router.push("/login");
            return;
        }

        setUserToken(currentUserToken);
    }, [router]);

    const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

    const handleFilterChange = (filter: FilterOption) => {
        setActiveFilter(filter);
    };

    useEffect(() => {
        const getTransactions = async () => {
            if (userToken) {
                try {
                    const response = await axios.get(
                        "https://buku-kas-ku-api.vercel.app/api/transaction",
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                            },
                        }
                    );

                    setTransactions(response.data);
                } catch (error: any) {
                    console.error(error);
                }
            }
        };

        getTransactions();
    }, [userToken]);

    const ShowTransactions = () => {
        const filteredTransactions = transactions.filter((txn) => {
            if (activeFilter === "all") return true;
            return txn.type === activeFilter;
        });

        return filteredTransactions.map((txn) => (
            <Card
                key={txn._id}
                elementId={txn._id}
                nominal={txn.amount}
                description={txn.description}
                date={txn.date}
                status={txn.type === "income"}
                category={txn.category}
                type={txn.type}
            />
        ));
    };

    return (
        <div className="flex">
            <Navbar />
            <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100 pb-10">
                <Header title="Finance Transactions" />
                <div className="w-full px-8 pt-4 pb-2">
                    <div className="flex justify-center bg-white rounded-lg shadow-sm">
                        <button
                            onClick={() => handleFilterChange("all")}
                            className={`cursor-pointer flex-1 py-3 text-center font-medium transition-colors rounded-l-lg ${
                                activeFilter === "all"
                                    ? "bg-blue-500 font-bold text-white"
                                    : "hover:bg-gray-200 font-bold text-[#103b4d]"
                            }`}
                        >
                            All
                        </button>
                        <button
                            onClick={() => handleFilterChange("income")}
                            className={`cursor-pointer flex-1 py-3 text-center font-medium transition-colors ${
                                activeFilter === "income"
                                    ? "bg-green-500 font-bold text-white"
                                    : "hover:bg-gray-200 font-bold text-[#103b4d]"
                            }`}
                        >
                            Income
                        </button>
                        <button
                            onClick={() => handleFilterChange("expense")}
                            className={`cursor-pointer flex-1 py-3 text-center font-medium transition-colors rounded-r-lg ${
                                activeFilter === "expense"
                                    ? "bg-red-500 font-bold text-white"
                                    : "hover:bg-gray-200 font-bold text-[#103b4d]"
                            }`}
                        >
                            Expense
                        </button>
                    </div>
                </div>
                {transactions.length > 0 ? (
                    <ShowTransactions />
                ) : (
                    <p className="text-center text-gray-500 p-4">Tidak ada transaksi</p>
                )}
            </div>
        </div>
    );
}
