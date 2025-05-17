"use client";
import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";
import ExpensesGraph from "@/components/expenses-graph/graph";
import { useState } from "react";

export default function MainPage() {
  const [nominal, setNominal] = useState<any>([0, 0, 0]);

  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
        <Header title="Finance Dashboard" />
        <main className="flex-1 p-8 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card title="Total Balance" nominal={nominal[0]} />
            <Card title="Income" nominal={nominal[1]} />
            <Card title="Expenses" nominal={nominal[2]} />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="bg-white border-2 border-[#103b4d] rounded shadow flex items-center justify-center h-full">
              <ExpensesGraph />
            </div>
            <div className="grid grid-rows-[5fr_1fr] gap-4 h-full">
              <div className="bg-white border-2 border-[#103b4d] shadow p-4 rounded flex items-center justify-center">
                Content Atas
              </div>
              <button className="bg-[#103b4d] font-bold p-4 rounded flex items-center justify-center shadow-md hover:scale-102 transition duration-50">
                + Add Transaction
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
