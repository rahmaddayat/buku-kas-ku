"use client";

const ListTransaction = ({
    nominal,
    category,
    type,
    description,
    date,
}: {
    nominal: number;
    category: string;
    type: string;
    description: string;
    date: string;
}) => {
    return (
        <div className="w-full h-fit py-2 px-4 border border-gray-300 rounded-lg shadow shadow-gray-200 shadow-sm hover:shadow-md transition flex flex-row items-center justify-center">
            <div className="h-fit flex-grow">
                <h1
                    className={`text-lg font-bold ${
                        type === "income" ? "text-green-500" : "text-red-500"
                    }`}
                >
                    {type === "income" ? "+ " : "- "}
                    {nominal === 0 ? "Loading" : `Rp${nominal} (${category})`}
                </h1>
                <p className="text-sm text-gray-500">{description}</p>
            </div>
            <div className="w-fit h-fit">
                <p className="text-sm text-gray-500">{date.split("T")[0]}</p>
            </div>
        </div>
    );
};

export default ListTransaction;
