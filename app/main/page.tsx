import Navbar from "@/components/navbar/navbar";
import Card from "@/components/card/card";
import Header from "@/components/header/header";

export default function MainPage() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
        <Header title="Finance Dashboard" />
        <main className="p-8 flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <Card title="Total Balance" description="Rp0.00" />
            <Card title="Income" description="Rp0.00" />
            <Card title="Expenses" description="Rp0.00" />
          </div>
        </main>
      </div>
    </div>
  );
}
