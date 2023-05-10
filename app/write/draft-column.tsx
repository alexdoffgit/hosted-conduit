import "server-only";
import Link from "next/link";
import { getDrafts } from "./get-drafts";
import PlusIcon from "@components/icons/plus";
import { NewDraftAction } from "./new-draft-action";

export async function DraftsColumn() {
  const { articles, error } = await getDrafts();

  if (error) {
    throw error;
  }

  if (articles) {
    return (
      <div className="col-start-3 col-span-4 flex flex-col my-3">
        {articles.map((val) => (
          <Link key={val.id} href={`/draft/${val.id}`}>
            <div className="border border-slate-400 rounded p-2 m-3">
              <p className="text-3xl text-slate-600">{val.title}</p>
              <p className="text-slate-400">{val.description}</p>
            </div>
          </Link>
        ))}
        <NewDraftAction />
      </div>
    );
  }

  return (
    <NewDraftAction />
  );
}
