"use client";

type CardProps = {
    title: string;
    nominal: number;
};

export default function Card({ title, nominal }: CardProps) {
    return (
        <div className="bg-[#0b1f49] p-6 rounded-lg shadow-md hover:shadow-lg shadow-grey-500 hover:scale-101 transition duration-300">
            <h3 className="text-white text-xl font-bold mb-">{title}</h3>
            <p className="text-grey-500">
              {nominal == 0 ? "Rp0" : `Rp${nominal}`}
            </p>
        </div>
    );
}
