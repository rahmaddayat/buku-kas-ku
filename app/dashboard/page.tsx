"use client";

import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";
import TransactionHandler from "@/components/balance/handleTransaction";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

type sumDataType = {
    balance: number;
    income: number;
    expense: number;
};

export default function MainPage() {
    const [popup, setPopup] = useState(false);
    const [sumData, setSumData] = useState({
        balance: 0,
        income: 0,
        expense: 0,
    });

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
                        <img
                            src="https://wp.coinvestasi.com/wp-content/uploads/2021/05/Satoshi-Nakamoto-1024x576.jpg"
                            className="h-100 bg-black w-full rounded-xl object-cover"
                        />
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
