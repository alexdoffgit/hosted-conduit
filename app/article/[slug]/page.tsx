// fetch title,username,profile pic,updated at,body,comments username,comments updated at,comments body
// convert body markdown to html
// sanitize html

import Navigation from "@components/navbar";
import { fetchArticleData } from "./fetch-data";
import { Hero } from "./hero";
import { ReactNode } from "react";
import { Body } from "./body";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const fetchedArticle = await fetchArticleData(params.slug);
  let HeroComponent: ReactNode | null = null;
  let ArticleComponent: ReactNode | null = null;

  if (fetchedArticle.article) {
    HeroComponent = (
      <Hero
        authorName={fetchedArticle.article.author.username}
        profilePic={fetchedArticle.article.author.image}
        title={fetchedArticle.article.title}
        updatedAt={fetchedArticle.article.updatedAt}
      />
    );

    ArticleComponent = <Body html={fetchedArticle.article.body} />
  }

  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      {HeroComponent}
      {ArticleComponent}
    </div>
  );
}
