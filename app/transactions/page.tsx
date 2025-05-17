import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";
import Card from "@/components/card/card-transactions";
import TransactionFilter from "@/components/filter/transaction";

export default function TransactionsPage() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
        <Header title="Finance Transactions" />
        <TransactionFilter />
        <Card
          nominal={300000}
          description="Pengeluaran makan"
          date={new Date("2025-05-13T12:00:00")}
          status={true}
        />
        <Card
          nominal={10000}
          description="Lorem, ipsum vinwid oneifnef ivewnaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa"
          date={new Date("2025-05-13T12:00:00")}
          status={false}
        />
        <main className="p-8 flex-1"></main>
      </div>
    </div>
  );
}
