"use client";

import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";
import TransactionHandler from "@/components/balance/handleTransaction";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ListTransaction from "@/components/card/listCard";

type sumDataType = {
    balance: number;
    income: number;
    expense: number;
};

type transactionType = {
    _id: string;
    amount: number;
    type: string;
    category: string;
    date: string;
    description: string;
};

export default function MainPage() {
    const [popup, setPopup] = useState(false);
    const [sumData, setSumData] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });
    const [currentUserToken, setCurrentUserToken] = useState<string | null>("");
    const [transactions, setTransactions] = useState<transactionType[]>([]);

    const showInputPopup = () => {
        if (popup) {
            setPopup(false);
        } else {
            setPopup(true);
        }
    };

    const router = useRouter();

    useEffect(() => {
        const userToken = localStorage.getItem("token");
        setCurrentUserToken(userToken);

        if (!userToken) {
            router.push("/login");
        }

        const getTransactionSum = async () => {
            if (userToken) {
                try {
                    const response = await axios.get<sumDataType>(
                        "https://buku-kas-ku-api.vercel.app/api/transaction/summary",
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    setSumData(response.data);
                } catch (error: any) {
                    console.error(error);
                }
            }
        };

        getTransactionSum();
    }, []);

    useEffect(() => {
        const getTransactions = async () => {
            if (currentUserToken) {
                try {
                    const response = await axios.get(
                        "https://buku-kas-ku-api.vercel.app/api/transaction",
                        {
                            headers: {
                                Authorization: `Bearer ${currentUserToken}`,
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
    }, [currentUserToken]);

    return (
        <div className="flex">
            <Navbar />
            <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
                <Header title="Finance Dashboard" />
                <main className="flex-1 p-8 flex flex-col">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                        <Card title="Balance" nominal={sumData.balance} />
                        <Card title="Income" nominal={sumData.income} />
                        <Card title="Expense" nominal={sumData.expense} />
                    </div>

                    <div className="flex flex-col w-full items-center justify-center flex-grow gap-8">
                        <div className="w-full flex-grow flex flex-col gap-2">
                            {transactions.map((txn) => {
                                return (
                                    <ListTransaction
                                        key={txn._id}
                                        nominal={txn.amount}
                                        category={txn.category}
                                        type={txn.type}
                                        description={txn.description}
                                        date={txn.date}
                                    />
                                );
                            })}
                        </div>
                        <button
                            onClick={showInputPopup}
                            className="cursor-pointer bg-[#0b1f49] font-bold py-4 w-full rounded flex items-center justify-center shadow-md hover:scale-102 transition duration-50"
                        >
                            + Add Transaction
                        </button>
                    </div>
                </main>
            </div>
            {popup ? (
                <>
                    <TransactionHandler
                        eventType="add"
                        onClick={showInputPopup}
                    />
                </>
            ) : null}
        </div>
    );
}
