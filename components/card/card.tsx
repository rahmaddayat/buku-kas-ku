type CardProps = {
  title: string;
  description: string;
};

export default function Card({ title, description }: CardProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 w-full">
      <h3 className="text-[#103b4d] text-xl font-bold mb-">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  );
}
