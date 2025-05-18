"use client";

export default function Navbar() {
    return (
        <nav className="h-screen w-64 bg-[#0b1f49] text-gray-100 p-6 fixed">
            <h2 className="text-3xl font-bold mb-6">Buku Kas Ku</h2>
            <div className="h-[2px] bg-gray-300 opacity-30 mb-6 w-11/11 mx-auto" />

            <ul className="space-y-1">
                <li>
                    <a
                        href="/dashboard"
                        className="block hover:bg-white hover:text-[#0b1f49] rounded text-xl font-bold p-2 transition"
                    >
                        Dashboard
                    </a>
                </li>
                <li>
                    <a
                        href="/transactions"
                        className="block hover:bg-white hover:text-[#0b1f49] rounded text-xl font-bold p-2 transition"
                    >
                        Transactions
                    </a>
                </li>
                <li>
                    <a
                        href="/profile"
                        className="block hover:bg-white hover:text-[#0b1f49] rounded text-xl font-bold p-2 transition"
                    >
                        Profile
                    </a>
                </li>
            </ul>
        </nav>
    );
}
