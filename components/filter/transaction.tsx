"use client";

import { useState } from "react";

type FilterOption = "all" | "income" | "expense";

export default function TransactionFilter() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  const handleFilterChange = (filter: FilterOption) => {
    setActiveFilter(filter);
  };

  return (
    <div className="w-full px-8 pt-4 pb-2">
      <div className="flex justify-center bg-white rounded-lg shadow-sm">
        <button
          onClick={() => handleFilterChange("all")}
          className={`flex-1 py-3 text-center font-medium transition-colors rounded-l-lg ${
            activeFilter === "all"
              ? "bg-blue-500 font-bold text-white"
              : "hover:bg-gray-200 font-bold text-lg text-[#103b4d]"
          }`}
        >
          All
        </button>
        <button
          onClick={() => handleFilterChange("income")}
          className={`flex-1 py-3 text-center font-medium transition-colors ${
            activeFilter === "income"
              ? "bg-green-500 font-bold text-white"
              : "hover:bg-gray-200 font-bold text-lg text-[#103b4d]"
          }`}
        >
          Income
        </button>
        <button
          onClick={() => handleFilterChange("expense")}
          className={`flex-1 py-3 text-center font-medium transition-colors rounded-r-lg ${
            activeFilter === "expense"
              ? "bg-red-500 font-bold text-white"
              : "hover:bg-gray-200 font-bold text-lg text-[#103b4d]"
          }`}
        >
          Expense
        </button>
      </div>
    </div>
  );
}
