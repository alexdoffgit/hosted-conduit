import PreviewList from "@components/article/preview-list";

type Props = {
  searchParams: { [key: string]: string | string[] | undefined }
};

export const revalidate = 0

export default function Home({ searchParams }: Props) {
  return (
    <>
      <div className="col-start-2 col-end-9 flex flex-col gap-2">
        <div className="flex flex-col">
          <p className="text-green-500 ml-3">Global Feed</p>
        </div>
        {/* @ts-expect-error Server Component */}
        <PreviewList searchQuery={searchParams?.q} />
      </div>
    </>
  );
}
