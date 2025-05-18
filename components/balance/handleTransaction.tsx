"use client";

import { FC, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import axios from "axios";

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
    inputAmount,
    inputType,
    inputCategory,
    inputDate,
    inputDescription,
}: {
    elementId?: string;
    onClick: any;
    eventType: string;
    inputAmount?: number;
    inputType?: string;
    inputCategory?: string;
    inputDate?: Date | string;
    inputDescription?: string;
}) {
    const [formData, setFormData] = useState({
        amount: 0,
        type: "",
        category: "",
        date: "",
        description: "",
    });
    const [isLoading, setIsLoading] = useState(false);

    const [thisInputAmount, setThisInputAmount] = useState<number>(0);
    const [thisInputCategory, setThisInputCategory] = useState<string>("");
    const [thisInputDate, setThisInputDate] = useState<string | Date>(
        "0000-00-00"
    );
    const [thisInputDescription, setThisInputDescription] =
        useState<string>("");
    const [thisInputType, setThisInputType] = useState<string>("");

    const userToken = localStorage.getItem("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (userToken) {
            try {
                setIsLoading(true);

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

                    window.location.reload();
                } else if (eventType === "edit") {
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

                    window.location.reload();
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

                    window.location.reload();
                }
            } catch (error: any) {
                const message =
                    error.response?.data?.message ||
                    "Gagal menambahkan transaksi.";

                alert(message);
            } finally {
                setIsLoading(false);
            }
        }
    };

    const onIncomeClick = () => {
        setFormData({ ...formData, type: "income" });
    };

    const onExpenseClick = () => {
        setFormData({ ...formData, type: "expense" });
    };

    const onSelect = (e: any) => {
        setFormData({ ...formData, category: e.target.textContent });
    };

    useEffect(() => {
        if (eventType == "edit") {
            if (
                inputAmount ||
                inputCategory ||
                inputDate ||
                inputDescription ||
                inputType
            ) {
                setFormData({
                    ...formData,
                    type: inputType ? inputType : "",
                    amount: inputAmount ? inputAmount : 0,
                    category: inputCategory ? inputCategory : "",
                    date: inputDate ? inputDate.toString() : "0000-00-00",
                    description: inputDescription ? inputDescription : "",
                });
            }

            setThisInputAmount(inputAmount || 0);
            setThisInputCategory(inputCategory || "");
            setThisInputDate(inputDate || "0000-00-00");
            setThisInputType(inputType || "");
            setThisInputDescription(inputDescription || "");
        }
    }, [eventType]);

    return (
        <>
            <div
                className="fixed left-0 top-0 w-screen h-screen z-10 bg-black opacity-[0.5]"
                onClick={onClick}
            ></div>
            {eventType === "delete" ? (
                <div className="z-100 fixed top-[50vh] left-[50vw] gap-4 flex flex-col justify-center items-center translate-x-[-50%] translate-y-[-50%] bg-white rounded-[16px] w-[35%] px-12 py-8">
                    <p className="text-black text-lg text-center">
                        Apakah anda ingin menghapus transaksi ini?
                    </p>
                    <div className="w-full flex flex-row items-center justify-center gap-4">
                        <button
                            onClick={handleSubmit}
                            className="p-2 flex-grow rounded-lg bg-green-500"
                        >
                            Iya
                        </button>
                        <button
                            onClick={onClick}
                            className="p-2 flex-grow rounded-lg bg-red-500"
                        >
                            Tidak
                        </button>
                    </div>
                </div>
            ) : (
                <div className="z-100 fixed top-[50vh] left-[50vw] gap-4 flex flex-col justify-center items-center translate-x-[-50%] translate-y-[-50%] bg-white rounded-[16px] w-[60%] px-12 pb-12 pt-8">
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
                                    value={
                                        thisInputAmount
                                            ? thisInputAmount
                                            : formData.amount
                                    }
                                    onChange={(e) => {
                                        const value = Number(e.target.value);

                                        setFormData({
                                            ...formData,
                                            amount: value,
                                        });
                                        setThisInputAmount(value);
                                    }}
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
                                <div className="flex flex-row gap-4 items-center justify-center w-[80%]">
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category === "Makanan"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Makanan
                                    </button>
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category ===
                                                "Transportasi"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Transportasi
                                    </button>
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category === "Belanja"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Belanja
                                    </button>
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category === "Hiburan"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Hiburan
                                    </button>
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category === "Gaji"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Gaji
                                    </button>
                                    <button
                                        onClick={onSelect}
                                        className={
                                            `cursor-pointer text-sm rounded-lg flex-grow border border-blue-700 p-2 ` +
                                            `${
                                                formData.category === "Lainnya"
                                                    ? "bg-blue-300"
                                                    : ""
                                            }`
                                        }
                                    >
                                        Lainnya
                                    </button>
                                </div>
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">Date</span>
                                <input
                                    placeholder="Category"
                                    value={
                                        thisInputDate
                                            ? thisInputDate
                                                  .toString()
                                                  .split("T")[0]
                                            : formData.date
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setFormData({
                                            ...formData,
                                            date: value,
                                        });
                                        setThisInputDate(e.target.value);
                                    }}
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="date"
                                />
                            </li>
                            <li className="w-full flex items-center justify-between">
                                <span className="text-lg">description</span>
                                <input
                                    placeholder="Description"
                                    value={
                                        thisInputDescription
                                            ? thisInputDescription
                                            : formData.description
                                    }
                                    onChange={(e) => {
                                        const value = e.target.value;

                                        setFormData({
                                            ...formData,
                                            description: value,
                                        });
                                        setThisInputDescription(value);
                                    }}
                                    className="rounded-lg border w-[80%] border-black p-2"
                                    type="text"
                                />
                            </li>
                        </ul>
                        <button
                            onClick={handleSubmit}
                            className={`cursor-pointer text-white p-2 rounded-full w-full transition ${
                                isLoading
                                    ? "pointer-events-none bg-blue-300"
                                    : "hover:bg-blue-400 bg-blue-500"
                            }`}
                        >
                            {isLoading ? "Submit..." : "Submit"}
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
