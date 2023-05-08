import "server-only";
import { createServerClient } from "@utils/supabase-server";
import addClasses from "./add-classes";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSanitize from "rehype-sanitize";

type Article = {
  id: number;
  title: string;
  body: string;
  updatedAt: string;
  author: {
    username: string;
    image: string | null | undefined;
  };
};

type FetchedArticle = {
  article: Article | null;
  error: Error | null;
};

export async function fetchArticleData(slug: string): Promise<FetchedArticle> {
  const supabase = createServerClient();
  const articleDB = await supabase
    .from("articles")
    .select(`id,updated_at,title,body,author_id,profile_id`)
    .eq("slug", slug)
    .limit(1)
    .single();
  if (articleDB.data) {
    const profileDB = await supabase
      .from("profiles")
      .select("username,image")
      .eq("id", articleDB.data.profile_id)
      .limit(1)
      .single();
    if (profileDB.data) {
      const processor = unified()
        .use(remarkParse)
        .use(remarkRehype)
        .use(addClasses)
        // @ts-expect-error
        .use(rehypeSanitize)
        .use(rehypeStringify);

      return {
        article: {
          author: {
            username: profileDB.data.username,
            image: profileDB.data.image,
          },
          body: processor.processSync(articleDB.data.body).toString(),
          id: articleDB.data.id,
          title: articleDB.data.title,
          updatedAt: articleDB.data.updated_at!,
        },
        error: null,
      };
    }

    return {
      article: null,
      error: new Error(profileDB.error?.message),
    };
  }

  return {
    article: null,
    error: new Error(articleDB.error?.message),
  };
}
