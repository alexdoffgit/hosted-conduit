// fetch title,username,profile pic,updated at,body,comments username,comments updated at,comments body
// convert body markdown to html
// sanitize html

import {Navigation} from "@components/navbar";
import { fetchArticleData } from "./fetch-data";
import { Hero } from "./hero";
import { ReactNode } from "react";
import { Body } from "./body";
import avatar from "../../../assets/default-avatar.jpg";
import Image from "next/image";
import Link from "next/link";
import { CommentForm } from "./comment-form";

export default async function ArticlePage({
  params,
}: {
  params: { slug: string };
}) {
  const fetchedArticle = await fetchArticleData(params.slug);
  let HeroComponent: ReactNode | null = null;
  let ArticleComponent: ReactNode | null = null;
  let CommentProfile: ReactNode | null = null;
  let CommentFormComponent: ReactNode | null = null;

  if (fetchedArticle.article) {
    HeroComponent = (
      <Hero
        authorName={fetchedArticle.article.author.username}
        profilePic={fetchedArticle.article.author.image}
        title={fetchedArticle.article.title}
        updatedAt={fetchedArticle.article.updatedAt}
      />
    );

    ArticleComponent = <Body html={fetchedArticle.article.body} />;

    CommentProfile = (
      <div className="col-start-2 col-span-10 flex items-center justify-center my-4">
        <div className="flex gap-3">
          <Image
            alt="profile pic"
            src={fetchedArticle.article.author.image ?? avatar}
            width={36}
            height={36}
          />
          <div className="flex flex-col">
            <Link href={`/${fetchedArticle.article.author.username}`}>
              <p className="text-md">
                {fetchedArticle.article.author.username}
              </p>
            </Link>
            <p className="text-xs">{fetchedArticle.article.updatedAt}</p>
          </div>
          <button className="border border-slate-500 text-slate-600 rounded-sm p-1">
            follow {fetchedArticle.article.author.username}
          </button>
          <button className="border border-green-500 rounded-sm text-green-500 p-1">
            favorite article
          </button>
        </div>
      </div>
    );

    CommentFormComponent = <CommentForm slug={params.slug} />
  }

  return (
    <div className="grid grid-cols-12">
      {/* @ts-expect-error Server Component */}
      <Navigation />
      {HeroComponent}
      {ArticleComponent}
      <hr className="col-start-2 col-span-10" />
      {CommentProfile}
      {CommentFormComponent}
    </div>
  );
}
