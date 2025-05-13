import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";

export default function MainPage() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
        <Header title="Profile" />
        <main className="p-8 flex-1"></main>
      </div>
    </div>
  );
}
