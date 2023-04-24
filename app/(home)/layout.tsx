import Navigation from "@components/navbar";

type Props = {
  children: React.ReactNode;
};

export default function HomeLayout({ children }: Props) {
  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <div className="col-span-full">
        <div className="bg-green-500 flex flex-col justify-center items-center py-8">
          <h1 className="text-white text-3xl font-bold">conduit</h1>
          <p className="text-white">A place to share knowledge</p>
        </div>
      </div>
      {children}
    </div>
  );
}
