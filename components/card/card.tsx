type CardProps = {
  title: string;
  nominal: number;
};

export default function Card({ title, nominal }: CardProps) {
  return (
    <div className="bg-[#103b4d] p-6 rounded-lg shadow-md hover:shadow-lg shadow-[#0c2f3d] hover:scale-101 transition duration-300">
      <h3 className="text-[#ffffff] text-xl font-bold mb-">{title}</h3>
      <p className="text-gray-400">Rp{nominal}</p>
    </div>
  );
}
