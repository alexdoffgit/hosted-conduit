import "server-only"
import Link from "next/link";
import Navigation from "@components/navbar";
import { getDrafts } from "./get-drafts";

export default async function Drafts() {
  const { articles, error } = await getDrafts();

  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      <div className="col-start-3 col-span-8 flex flex-col my-6">
        {articles?.map((val) => (
            <Link key={val.id} href={`/draft/${val.id}`}>
                <div className="border border-slate-400 rounded p-2">
                    <p className="text-3xl text-slate-600">{val.title}</p>
                    <p className="text-slate-400">{val.description}</p>
                </div>
            </Link>
        ))}
      </div>
    </div>
  );
}
