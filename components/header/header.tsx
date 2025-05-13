type HeaderProps = {
  title: string;
};

export default function Header({ title }: HeaderProps) {
  return (
    <header className="h-18 bg-white shadow flex items-center justify-between px-6">
      <h1 className="text-[#103b4d] text-3xl ml-3 font-bold">{title}</h1>
    </header>
  );
}
