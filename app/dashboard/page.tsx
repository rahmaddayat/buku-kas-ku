"use client";
import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";
import ExpensesGraph from "@/components/expenses-graph/graph";
import InputTrans from "@/components/Modal/addTransaction";
import { useEffect, useState } from "react";
import axios from "axios";

type sumDataType = {
  balance: number;
  income: number;
  expense: number;
};

export default function MainPage() {
  const [popup, setPopup] = useState(false);
  const [sumData, setSumData] = useState({ balance: 0, income: 0, expense: 0 });

  const showModal = () => {
    if (popup) {
      setPopup(false);
    } else {
      setPopup(true);
    }
  };

  useEffect(() => {
    const getTransactionSum = async () => {
      try {
        const response = await axios.get<sumDataType>(
          "https://buku-kas-ku-api.vercel.app/api/transaction/summary",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4NGVhNDcyNjA5ZTYyMTAwNDAzMjYiLCJpYXQiOjE3NDc0NzIxMzd9.h_KYQCMUqeJAszCkuvyQ5E3evTIc1YMPAvVl6DR1mOw",
              "Content-Type": "application/json",
            },
          }
        );

        setSumData(response.data);
      } catch (error: any) {}
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
            <Card title="Total Balance" nominal={sumData.balance} />
            <Card title="Income" nominal={sumData.income} />
            <Card title="Expenses" nominal={sumData.expense} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="bg-white border-2 border-[#103b4d] rounded shadow flex items-center justify-center h-full">
              <ExpensesGraph />
            </div>
            <div className="grid grid-rows-[5fr_1fr] gap-4 h-full">
              <div className="bg-white border-2 border-[#103b4d] shadow p-4 rounded flex items-center justify-center">
                Content Atas
              </div>
              <button
                onClick={showModal}
                className="bg-[#103b4d] font-bold p-4 rounded flex items-center justify-center shadow-md hover:scale-102 transition duration-50"
              >
                + Add Transaction
              </button>
            </div>
          </div>
        </main>
      </div>
      {popup ? (
        <>
          <InputTrans
            amount={10000}
            type="income"
            category="Gaji"
            date="17-05-2025"
            description="none"
          />
          <button onClick={showModal} className="fixed z-110 top-10 right-10">
            Close
          </button>
        </>
      ) : null}
    </div>
  );
}
