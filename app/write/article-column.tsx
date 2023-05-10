import Link from "next/link";
import { getUserArticles } from "./get-user-article";

export async function ArticlesColumn() {
  const { articles, error } = await getUserArticles();

  if (error) {
    throw error;
  }

  if (articles) {
    return (
      <div className="col-span-4 flex flex-col my-3">
        {articles.map((val) => (
          <Link key={val.id} href={`/editor/${val.id}`}>
            <div className="border border-slate-400 rounded p-2 m-3">
              <p className="text-3xl text-slate-600">{val.title}</p>
              <p className="text-slate-400">{val.description}</p>
            </div>
          </Link>
        ))}
      </div>
    );
  }

  return null;
}
