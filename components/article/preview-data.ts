import "server-only";
import { createServerClient } from "@utils/supabase-server";
import { ArticlePreview } from "./article-preview-builder";

type ArticlePreviewType = {
  articleDate: string;
  title: string;
  description: string;
  slug: string;
  username: string;
  profilePic?: string;
  favorited: boolean;
  favoritesCount: number;
  tags: string[];
};

function toTags(arr: { tag_name: string }[] | null): string[] {
  return arr?.map((val) => val.tag_name) ?? [];
}

export async function fetchArticleData(
  searchQuery?: string,
  tagsQuery?: string[]
): Promise<ArticlePreviewType[]> {
  const supabase = createServerClient();
  let articlePreviews: ArticlePreview[] = [];
  const { data: authData, error: authError } = await supabase.auth.getSession();
  let articleQuery = supabase
    .from("articles")
    .select("id,updated_at,title,description,slug,profile_id")
    .eq("published", true);
  if (searchQuery) {
    articleQuery = articleQuery.textSearch("searchable", `${searchQuery}`);
  }

  const articleDB = (await articleQuery).data ?? [];
  for (let article of articleDB) {
    let articleBuilder = ArticlePreview.builder();
    articleBuilder.withArticleDate(article.updated_at!);
    articleBuilder.withDescription(article.description ?? "");
    articleBuilder.withTitle(article.title);
    articleBuilder.withSlug(article.slug);
    const profileDB = (
      await supabase
        .from("profiles")
        .select("username,image")
        .eq("id", article.profile_id)
        .limit(1)
        .single()
    ).data;
    articleBuilder.withUsername(profileDB?.username ?? "");
    articleBuilder.withProfilePic(profileDB?.image ?? undefined);
    if (authData.session) {
      const favoritedDB = (
        await supabase
          .from("favorites")
          .select()
          .eq("article_id", article.profile_id)
          .eq("auth_id", authData.session.user.id)
          .limit(1)
          .single()
      ).data;
      if (favoritedDB) {
        articleBuilder.withFavorited(true);
      } else {
        articleBuilder.withFavorited(false);
      }
    } else {
      articleBuilder.withFavorited(false);
    }
    const favoritesCount = (
      await supabase
        .from("favorites")
        .select("*", { count: "exact", head: true })
        .eq("article_id", article.profile_id)
    ).count;
    articleBuilder.withFavoritesCount(favoritesCount ?? 0);
    const articleTagsDB =
      (
        await supabase
          .from("articles_tags")
          .select()
          .eq("article_id", article.id)
      ).data ?? [];
    let tags: string[] = [];
    for (let articleTag of articleTagsDB) {
      const tagDB = (
        await supabase
          .from("tags")
          .select()
          .eq("id", articleTag.tag_id)
          .limit(1)
          .single()
      ).data;
      if (tagDB) {
        tags.push(tagDB.tag_name);
      }
    }
    articleBuilder.withTags(tags);
    articlePreviews.push(articleBuilder);
  }

  return articlePreviews.map((v) => ({
    articleDate: v.articleDate,
    description: v.description,
    favorited: v.favorited,
    favoritesCount: v.favoritesCount,
    slug: v.slug,
    tags: v.tags,
    title: v.title,
    username: v.username,
    profilePic: v.profilePic,
  }));
}
