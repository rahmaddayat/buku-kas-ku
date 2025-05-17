import { FC, useState } from "react";
import axios from "axios";

type inputTrans = {
  amount: number;
  type: string;
  category: string;
  date: string;
  description: string;
};

export default function InputTrans({
  amount,
  type,
  category,
  date,
  description,
}: inputTrans) {
  const [formData, setFormData] = useState({
    amount: 0,
    type: "",
    category: "",
    date: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (
        !formData.amount ||
        !formData.category ||
        !formData.date ||
        !formData.description ||
        !formData.type
      ) {
        alert("Form harus diisi.");
      }

      const newDate = formData.date.replace("/", "-");

      const response = await axios.post<inputTrans>(
        "https://buku-kas-ku-api.vercel.app/api/transaction",
        formData,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2ODI4NGVhNDcyNjA5ZTYyMTAwNDAzMjYiLCJpYXQiOjE3NDc0NzIxMzd9.h_KYQCMUqeJAszCkuvyQ5E3evTIc1YMPAvVl6DR1mOw",
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data);

      alert("Transaksi berhasil ditambah");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "Gagal menambahkan transaksi.";

      alert(message);
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
      <div className="fixed left-0 top-0 w-screen h-screen z-10 bg-black opacity-[0.5]"></div>
      <div className="z-100 fixed top-[50vh] left-[50vw] translate-x-[-50%] translate-y-[-50%] bg-white rounded-[16px] size-[80%]">
        <div className="flex flex-col justify-center h-full items-center">
          <ul className="text-black w-[50%] flex flex-col gap-4">
            <li className="w-full flex justify-between">
              <span>Amount</span>
              <input
                placeholder="Amount"
                value={formData.amount}
                onChange={(e) =>
                  setFormData({ ...formData, amount: Number(e.target.value) })
                }
                className="border w-[80%] border-black p-2"
                type="text"
              />
            </li>
            <li className="w-full flex justify-between">
              <span>Type</span>
              <div className="flex flex-row gap-4 items-center justify-center w-[80%]">
                <button
                  onClick={onIncomeClick}
                  className={
                    `flex-grow border p-2 border-green-700 ` +
                    `${formData.type === "income" ? "bg-green-300" : ""}`
                  }
                >
                  Income
                </button>
                <button
                  onClick={onExpenseClick}
                  className={
                    `flex-grow border p-2 border-red-700 ` +
                    `${formData.type === "expense" ? "bg-red-300" : ""}`
                  }
                >
                  Expense
                </button>
              </div>
            </li>
            <li className="w-full flex justify-between">
              <span>Category</span>
              <input
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="border w-[80%] border-black p-2"
                type="text"
              />
            </li>
            <li className="w-full flex justify-between">
              <span>Date</span>
              <input
                placeholder="Category"
                value={formData.date}
                onChange={(e) =>
                  setFormData({ ...formData, date: e.target.value })
                }
                className="border w-[80%] border-black p-2"
                type="date"
              />
            </li>
            <li className="w-full flex justify-between">
              <span>description</span>
              <input
                placeholder="Description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="border w-[80%] border-black p-2"
                type="text"
              />
            </li>
          </ul>
          <button
            onClick={handleSubmit}
            className="text-black border border-black"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}
