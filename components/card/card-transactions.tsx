import { FC } from "react";

type TransCardProps = {
  nominal: number;
  description: string;
  date: Date;
  status: boolean;
};

const TransCard: FC<TransCardProps> = ({
  nominal,
  description,
  date,
  status,
}) => {
  return (
    <div className="text-black bg-white rounded-lg shadow-md hover:shadow-xl hover:scale-100 transition duration-300s p-6 ml-10 mr-10 mt-5 flex flex-row">
      <div className="grid grid-cols-[5fr_1fr] items-center h-full w-full">
        <div>
          <div className="flex items-center gap-2">
            <span
              className={`text-2xl font-bold ${
                status ? `text-green-500` : `text-red-600`
              }`}
            >
              {status ? "+ " : "- "}
            </span>
            <h1
              className={`text-2xl font-bold ${
                status ? `text-green-500` : `text-red-600`
              }`}
            >
              Rp{nominal.toLocaleString("id-ID")}
            </h1>
          </div>
          <p className="text-gray-600">{description}</p>
          <div className="text-m font-bold text-gray-500">
            {date.toLocaleDateString("id-ID", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button className="border border-blue-700 rounded shadow-md hover:scale-105 transition duration-50 bg-blue-500 text-white">
            Edit
          </button>
          <button className="border border-red-800 rounded shadow-md  hover:scale-105 transition duration-50 bg-red-600 text-white">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransCard;
