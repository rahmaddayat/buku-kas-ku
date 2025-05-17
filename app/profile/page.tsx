import Navbar from "@/components/navbar/navbar";
import Header from "@/components/header/header";

export default function MainPage() {
  return (
    <div className="flex">
      <Navbar />
      <div className="flex flex-col ml-64 w-full min-h-screen bg-gray-100">
        <Header title="Profile" />
        <main className="px-4 py-8 flex-grow flex justify-center items-center">
          <div className="bg-gray-300 border-2 border-[#103b4d] p-12 w-full max-w-4xl rounded-xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
            <div className="p-6 flex justify-center items-center border-b-2 lg:border-b-0 lg:border-r-2 border-[#103b4d]">
              <img
                src="/img/profile_default.png"
                alt="Profile Image"
                className="rounded-full w-40 h-40 md:w-48 md:h-48 object-cover"
              />
            </div>
            <div className="flex flex-col justify-center items-start h-full pl-12">
              <ul className="text-black font-bold text-lg md:text-2xl">
                <li className="mb-2 mt-2">User Name : </li>
                <li className="mb-2 mt-2">Email : </li>
                <li className="mb-2 mt-2">Created At : </li>
              </ul>
              <button className="mt-2 border border-red-700 bg-red-600 rounded px-4 py-2 font-bold shadow-md hover:shadow-xl hover:scale-105 transition duration-300 text-white">
                Log Out
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
