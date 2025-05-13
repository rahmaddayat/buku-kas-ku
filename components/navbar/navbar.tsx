import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="h-screen w-64 bg-[#103b4d] text-gray-100 p-6 fixed">
      <h2 className="text-3xl font-bold mb-6">Buku KasKu</h2>
      <div className="h-[2px] bg-gray-300 opacity-30 mb-6 w-11/11 mx-auto" />

      <ul className="space-y-1">
        <li>
          <Link
            href="/dashboard"
            className="block hover:bg-[#ffffff28] rounded text-xl font-bold p-2 transition"
          >
            Dashboard
          </Link>
        </li>
        <li>
          <Link
            href="/transactions"
            className="block hover:bg-[#ffffff28] rounded text-xl font-bold p-2 transition"
          >
            Transactions
          </Link>
        </li>
        <li>
          <Link
            href="/profile"
            className="block hover:bg-[#ffffff28] rounded text-xl font-bold p-2 transition"
          >
            Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}
