"use client";

import { FC, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";
import { useRouter } from "next/navigation";

type inputTrans = {
    amount: number;
    type: string;
    category: string;
    date: string;
    description: string;
};

export default function TransactionHandler({
    elementId,
    onClick,
    eventType,
}: {
    elementId?: string;
    onClick: any;
    eventType: string;
}) {
    const [formData, setFormData] = useState({
        amount: 0,
        type: "",
        category: "",
        date: "",
        description: "",
    });

    const router = useRouter();

    const userToken = localStorage.getItem("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userToken) {
            try {
                if (eventType === "add") {
                    if (
                        !formData.amount ||
                        !formData.category ||
                        !formData.date ||
                        !formData.description ||
                        !formData.type
                    ) {
                        alert("Form tidak boleh kosong.");
                    }

                    formData.date = formData.date.replace("/", "-");

                    const response = await axios.post<inputTrans>(
                        "https://buku-kas-ku-api.vercel.app/api/transaction",
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    alert("Transaksi berhasil ditambah");
                } else if (eventType === "edit") {
                    if (
                        !formData.amount ||
                        !formData.category ||
                        !formData.date ||
                        !formData.description ||
                        !formData.type
                    ) {
                        alert("Form tidak.");
                    }

                    formData.date = formData.date.replace("/", "-");

                    const response = await axios.put<inputTrans>(
                        `https://buku-kas-ku-api.vercel.app/api/transaction/${elementId}`,
                        formData,
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    alert("Transaksi berhasil diedit");

                    router.push("/transactions");
                } else {
                    const response = await axios.delete(
                        `https://buku-kas-ku-api.vercel.app/api/transaction/${elementId}`,
                        {
                            headers: {
                                Authorization: `Bearer ${userToken}`,
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    alert(response.data.message);

                    router.push("/transactions");
                }
            } catch (error: any) {
                const message =
                    error.response?.data?.message ||
                    "Gagal menambahkan transaksi.";

                alert(message);
            }
        }
    };

    const onIncomeClick = () => {
        setFormData({ ...formData, type: "income" });
    };

    const onExpenseClick = () => {
        setFormData({ ...formData, type: "expense" });
    };

    return (
        <>
            <div
                className="fixed left-0 top-0 w-screen h-screen z-10 bg-black opacity-[0.5]"
                onClick={onClick}
            ></div>
            {eventType === "delete" ? (
                <div className="z-100 fixed top-[50vh] left-[50vw] gap-4 flex flex-col justify-center items-center translate-x-[-50%] translate-y-[-50%] bg-white rounded-[16px] w-[35%] px-12 py-8">
                    <p className="text-black text-lg text-center">Apakah anda ingin menghapus transaksi ini?</p>
                    <div className="w-full flex flex-row items-center justify-center gap-4">
                        <button onClick={handleSubmit} className="p-2 flex-grow rounded-lg bg-green-500">
                            Iya
                        </button>
                        <button onClick={onClick} className="p-2 flex-grow rounded-lg bg-red-500">
                            Tidak
                        </button>
                    </div>
                </div>
            ) : (
                <div className="z-100 fixed top-[50vh] left-[50vw] gap-4 flex flex-col justify-center items-center translate-x-[-50%] translate-y-[-50%] bg-white rounded-[16px] w-[50%] px-12 pb-12 pt-8">
                    <div className="w-full flex justify-end text-grey-500">
                        <AiOutlineClose
                            size={20}
                            color="grey"
                            onClick={onClick}
                            className="cursor-pointer"
                        />
                    </div>
                    <div className="flex flex-col w-full justify-center h-full items-center gap-8">
                        <ul className="text-black w-full flex flex-col gap-4">
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">Amount</span>
                                <input
                                    placeholder="Amount"
                                    value={formData.amount}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            amount: Number(e.target.value),
                                        })
                                    }
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="text"
                                />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">Type</span>
                                <div className="flex flex-row gap-4 items-center justify-center w-[80%]">
                                    <button
                                        onClick={onIncomeClick}
                                        className={
                                            `cursor-pointer text-base rounded-lg flex-grow border p-2 border-green-700 ` +
                                            `${
                                                formData.type === "income"
                                                    ? "bg-green-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Income
                                    </button>
                                    <button
                                        onClick={onExpenseClick}
                                        className={
                                            `cursor-pointer text-base rounded-lg flex-grow border p-2 border-red-700 ` +
                                            `${
                                                formData.type === "expense"
                                                    ? "bg-red-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Expense
                                    </button>
                                </div>
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">Category</span>
                                <input
                                    placeholder="Category"
                                    value={formData.category}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            category: e.target.value,
                                        })
                                    }
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="text"
                                />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">Date</span>
                                <input
                                    placeholder="Category"
                                    value={formData.date}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            date: e.target.value,
                                        })
                                    }
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="date"
                                />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">description</span>
                                <input
                                    placeholder="Description"
                                    value={formData.description}
                                    onChange={(e) =>
                                        setFormData({
                                            ...formData,
                                            description: e.target.value,
                                        })
                                    }
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="text"
                                />
                            </li>
                        </ul>
                        <button
                            onClick={handleSubmit}
                            className="cursor-pointer text-white hover:bg-blue-400 bg-blue-500 p-2 rounded-full w-full transition"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
