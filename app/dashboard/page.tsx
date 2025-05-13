import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";
import ExpensesGraph from "@/components/expenses-graph/graph";

export default function MainPage() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full h-screen bg-gray-100">
        <Header title="Finance Dashboard" />
        <main className="flex-1 p-8 flex flex-col">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card title="Total Balance" description="Rp0.00" />
            <Card title="Income" description="Rp0.00" />
            <Card title="Expenses" description="Rp0.00" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 flex-1 min-h-0">
            <div className="bg-white rounded shadow flex items-center justify-center h-full">
              <ExpensesGraph />
            </div>
            <div className="grid grid-rows-[5fr_1fr] gap-4 h-full">
              <div className="bg-white shadow p-4 rounded flex items-center justify-center">
                Content Atas
              </div>
              <div className="bg-white shadow p-4 rounded flex items-center justify-center">
                Content Bawah
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
