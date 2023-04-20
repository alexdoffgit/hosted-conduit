import PreviewList from "@components/article/preview-list";
import Navigation from "@components/navbar";

export default function Home() {
  return (
    <div className="grid grid-cols-12">
      <Navigation />
      <div className="col-span-full">
        <div className="bg-green-500 flex flex-col justify-center items-center py-8">
          <h1 className="text-white text-3xl font-bold">conduit</h1>
          <p className="text-white">A place to share knowledge</p>
        </div>
      </div>
      <div className="col-start-2 col-end-9 flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-green-500 ml-3">Global Feed</p>
        </div>
        <PreviewList />
      </div>
    </div>
  );
}
